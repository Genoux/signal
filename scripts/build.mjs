#!/usr/bin/env node
// Signal token build. No dependencies.
//
//   node scripts/build.mjs           regenerate the generated parts
//   node scripts/build.mjs --check   exit 1 if anything is out of date (writes nothing)
//
// Reads  tokens/signal.tokens.json and tokens/extensions/*.tokens.json
// Writes css/signal.css         the block between the @sg-tokens markers (base styles are hand-written)
//        css/extensions/<name>.css   one file per extension, fully generated
//        index.html             the token manifest between the @sg-manifest markers
//
// Naming: a token path becomes --sg-<path in kebab case>, with the "color" group and the
// "family" segment dropped:  color.status.wait.fg -> --sg-status-wait-fg,
// font.family.mono -> --sg-font-mono, size.iconSm -> --sg-size-icon-sm.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const MODES = 'dev.signal.modes';
const THEMES = ['signal', 'fog'];
const THEMED_TYPES = new Set(['color', 'shadow']);

const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const readJSON = (p) => JSON.parse(read(p));

// ---------------------------------------------------------------- flatten
function flatten(tree) {
  const out = new Map();
  (function walk(node, path, inherited) {
    const type = node.$type ?? inherited;
    if (Object.prototype.hasOwnProperty.call(node, '$value')) {
      out.set(path.join('.'), { path, type, token: node });
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$') || v === null || typeof v !== 'object' || Array.isArray(v)) continue;
      walk(v, [...path, k], type);
    }
  })(tree, [], undefined);
  return out;
}

// ---------------------------------------------------------------- resolve
const isRef = (v) => typeof v === 'string' && /^\{[^}]+\}$/.test(v);
function rawValue(entry, mode) {
  const m = entry.token.$extensions?.[MODES];
  return mode !== 'signal' && m && m[mode] !== undefined ? m[mode] : entry.token.$value;
}
function resolve(tokens, value, mode, seen = []) {
  if (isRef(value)) {
    const ref = value.slice(1, -1);
    if (seen.includes(ref)) throw new Error(`alias cycle: ${[...seen, ref].join(' -> ')}`);
    const target = tokens.get(ref);
    if (!target) throw new Error(`unknown alias {${ref}}`);
    return resolve(tokens, rawValue(target, mode), mode, [...seen, ref]);
  }
  if (Array.isArray(value)) return value.map((v) => resolve(tokens, v, mode, seen));
  if (value && typeof value === 'object' && !('colorSpace' in value)) {
    const o = {};
    for (const [k, v] of Object.entries(value)) o[k] = resolve(tokens, v, mode, seen);
    return o;
  }
  return value;
}

// ---------------------------------------------------------------- format
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const varName = (path) =>
  '--sg-' + path.filter((seg, i) => !(seg === 'color' && i < 2) && seg !== 'family').map(kebab).join('-');
const num = (n) => String(Math.round(n * 10000) / 10000);
const dim = (d) => (typeof d === 'number' ? `${num(d)}px` : `${num(d.value)}${d.unit}`);
function color(c) {
  if (typeof c === 'string') return c;
  const hex = c.hex ?? '#' + c.components.map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
  if (c.alpha === undefined || c.alpha === 1) return hex.toLowerCase();
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${r} ${g} ${b} / ${num(c.alpha)})`;
}
const shadowOne = (s) => `${dim(s.offsetX)} ${dim(s.offsetY)} ${dim(s.blur)} ${dim(s.spread)} ${color(s.color)}`;
const family = (list) => list.map((f) => (/^[\w-]+$/.test(f) ? f : `"${f}"`)).join(', ');

// Returns [[name, value], ...] for one token in one mode.
function emit(tokens, entry, mode) {
  const name = varName(entry.path);
  const v = resolve(tokens, rawValue(entry, mode), mode);
  switch (entry.type) {
    case 'color': return [[name, color(v)]];
    case 'dimension': return [[name, dim(v)]];
    case 'duration': return [[name, dim(v)]];
    case 'number': case 'fontWeight': return [[name, num(v)]];
    case 'fontFamily': return [[name, family(v)]];
    case 'cubicBezier': return [[name, `cubic-bezier(${v.map(num).join(', ')})`]];
    case 'shadow': return [[name, (Array.isArray(v) ? v : [v]).map(shadowOne).join(', ')]];
    case 'typography': {
      // Family stays a var() so a role follows its stack; the other parts are literal.
      const raw = entry.token.$value;
      const fam = isRef(raw.fontFamily) ? `var(${varName(raw.fontFamily.slice(1, -1).split('.'))})` : family(v.fontFamily);
      const ext = entry.token.$extensions ?? {};
      const out = [
        [name, `${num(v.fontWeight)} ${dim(v.fontSize)}/${num(v.lineHeight)} ${fam}`],
        [`${name}-size`, dim(v.fontSize)],
        [`${name}-weight`, num(v.fontWeight)],
        [`${name}-line-height`, num(v.lineHeight)],
      ];
      if (ext['dev.signal.letterSpacingEm']) out.push([`${name}-tracking`, `${num(ext['dev.signal.letterSpacingEm'])}em`]);
      else if (v.letterSpacing && v.letterSpacing.value) out.push([`${name}-tracking`, dim(v.letterSpacing)]);
      return out;
    }
    default: throw new Error(`${entry.path.join('.')}: unsupported $type ${entry.type}`);
  }
}

function block(selector, lines, lead = []) {
  return `${selector} {\n${[...lead, ...lines.map(([n, v]) => `${n}: ${v};`)].map((l) => '  ' + l).join('\n')}\n}`;
}
function checkNames(lines, where) {
  const seen = new Set();
  for (const [n] of lines) {
    if (seen.has(n)) throw new Error(`${where}: two tokens map to ${n}`);
    seen.add(n);
  }
}

// ---------------------------------------------------------------- core
const core = readJSON('tokens/signal.tokens.json');
const coreTokens = flatten(core);
const themed = [...coreTokens.values()].filter((e) => THEMED_TYPES.has(e.type));
const plain = [...coreTokens.values()].filter((e) => !THEMED_TYPES.has(e.type));

const themeLines = Object.fromEntries(THEMES.map((m) => [m, themed.flatMap((e) => emit(coreTokens, e, m))]));
const plainLines = plain.flatMap((e) => emit(coreTokens, e, 'signal'));
checkNames([...themeLines.signal, ...plainLines], 'core');

const generated = [
  '/* Generated by scripts/build.mjs from tokens/signal.tokens.json. Do not edit by hand. */',
  block(':root,\n[data-theme="signal"]', themeLines.signal, ['color-scheme: dark;']),
  block('[data-theme="fog"]', themeLines.fog, ['color-scheme: light;']),
  block(':root', plainLines),
].join('\n\n');

// ---------------------------------------------------------------- extensions
const extDir = 'tokens/extensions';
const extOutputs = [];
for (const file of existsSync(join(ROOT, extDir)) ? readdirSync(join(ROOT, extDir)).sort() : []) {
  if (!file.endsWith('.tokens.json')) continue;
  const name = basename(file, '.tokens.json');
  const ext = readJSON(`${extDir}/${file}`);
  const own = flatten(ext);
  const all = new Map([...coreTokens, ...own]); // extensions may alias core tokens
  const lines = [...own.values()].flatMap((e) => emit(all, e, 'signal'));
  checkNames([...lines, ...themeLines.signal, ...plainLines], file);
  extOutputs.push({
    path: `css/extensions/${name}.css`,
    css: [
      `/* Signal extension "${name}". Generated by scripts/build.mjs from tokens/extensions/${file}. Do not edit by hand.`,
      `   Load after signal.css. */`,
      '',
      block(':root', lines),
      '',
    ].join('\n'),
    count: own.size,
  });
}

// ---------------------------------------------------------------- manifest for index.html
const manifest = { colors: [], type: [], space: [], radius: [], shadow: [], duration: [] };
for (const e of coreTokens.values()) {
  const item = { name: varName(e.path), path: e.path.join('.'), desc: e.token.$description ?? '' };
  const raw = e.token.$value;
  if (e.type === 'color') manifest.colors.push({ ...item, group: e.path[1], alias: isRef(raw) ? raw.slice(1, -1) : null });
  else if (e.type === 'typography') {
    const v = resolve(coreTokens, raw, 'signal');
    const fam = raw.fontFamily.includes('mono') ? 'mono' : 'sans';
    const ext = e.token.$extensions ?? {};
    const extra = [ext['dev.signal.textTransform'], ext['dev.signal.letterSpacingEm'] && `+${ext['dev.signal.letterSpacingEm']}em`, ext['dev.signal.fontVariantNumeric'] && 'tnum'].filter(Boolean);
    manifest.type.push({ ...item, spec: [`${fam} ${v.fontWeight}`, `${num(v.fontSize.value)}/${num(v.lineHeight)}`, ...extra].join(' · '), upper: ext['dev.signal.textTransform'] === 'uppercase', tnum: !!ext['dev.signal.fontVariantNumeric'] });
  } else if (e.path[0] === 'space') manifest.space.push(item);
  else if (e.path[0] === 'radius') manifest.radius.push(item);
  else if (e.type === 'shadow') manifest.shadow.push(item);
  else if (e.path[0] === 'duration' || e.path[0] === 'easing') manifest.duration.push(item);
}
const manifestTag = `<script type="application/json" id="sg-manifest">\n${JSON.stringify(manifest)}\n</script>`;

// ---------------------------------------------------------------- write / check
function splice(text, start, end, body, file) {
  const a = text.indexOf(start);
  const b = text.indexOf(end);
  if (a < 0 || b < a) throw new Error(`${file}: markers ${start} ... ${end} not found`);
  return text.slice(0, a + start.length) + '\n' + body + '\n' + text.slice(b);
}
const targets = [];
{
  const file = 'css/signal.css';
  const before = read(file);
  targets.push({ file, before, after: splice(before, '/* @sg-tokens:start */', '/* @sg-tokens:end */', generated, file) });
}
if (existsSync(join(ROOT, 'index.html'))) {
  const file = 'index.html';
  const before = read(file);
  targets.push({ file, before, after: splice(before, '<!-- @sg-manifest:start -->', '<!-- @sg-manifest:end -->', manifestTag, file) });
}
for (const o of extOutputs) {
  const p = join(ROOT, o.path);
  targets.push({ file: o.path, before: existsSync(p) ? readFileSync(p, 'utf8') : '', after: o.css });
}

let stale = 0;
for (const t of targets) {
  const same = t.before === t.after;
  if (CHECK) {
    if (!same) { stale++; console.error(`out of date: ${t.file}`); }
  } else if (!same) {
    writeFileSync(join(ROOT, t.file), t.after);
  }
  if (!CHECK) console.log(`${same ? 'unchanged' : 'wrote    '} ${t.file}`);
}
const count = (lines) => lines.length;
console.log(
  `core: ${coreTokens.size} tokens (${themed.length} themed x ${THEMES.length} themes) -> ` +
    `${count(themeLines.signal) + count(plainLines)} custom properties` +
    extOutputs.map((o) => `; ${basename(o.path, '.css')}: ${o.count} tokens`).join(''),
);
if (CHECK) {
  if (stale) { console.error(`${stale} file(s) out of date. Run: node scripts/build.mjs`); process.exit(1); }
  console.log('all generated files match the tokens');
}
