# Signal

Signal is the design system shared by the owner's apps: Overview first, then Hangar. It is a calm instrument panel. The chrome is grey, there is one loud colour for "needs you", and every fact is visible before you act.

The package holds one token source (`tokens/signal.tokens.json`, in DTCG format), the CSS generated from it, a small set of plain-CSS components, and one extension per app for tokens only that app uses. It has no framework and no dependencies.

Open `index.html` in a browser to see every token and component live. Press `t` to switch between the two themes.

## Principles

1. **Quiet until needed.** Needs-you yellow is the loudest thing on screen. Nothing else tints, pulses or moves for attention. When something needs the owner, yellow appears everywhere that thing is shown.
2. **Grey first.** Surfaces, borders, labels and text are graphite, one or two tonal steps apart.
3. **Colour only for status and for "you".** Hue means one of four statuses (run, wait, done, err) or the owner's own hand: focus, selection, the primary action, and anything being dragged. If an element is neither, it is grey.
4. **Mono for machines, sans for prose.** Names, paths, numbers, commands, controls and labels use JetBrains Mono. Sentences a person reads use Instrument Sans. Numbers that update use tabular figures.
5. **Hairlines and small radii.** Every border is 1px. Corners are 2 to 6px. Bars, cards, rows and buttons are flat. Only floating overlays (tooltip, toast, popover, dialog) cast a shadow. State is shown with rings and borders, never with lift.
6. **Status is glyph plus colour plus word.** run uses braille dots, wait a diamond, done a check, err a cross, and idle a ring. A glyph is never the only signal. The word appears beside it, in the group head, or in the accessible name.
7. **Motion confirms cause and effect.** Hover is 80ms, switches 140ms, toasts and dialogs 220ms. Only opacity, transform and hover colour animate. Reduced motion removes all of it.

Voice: plain, specific and short. Mono labels are lowercase (`open in orca`); sans prose is sentence case. No exclamation marks, "please", "oops", "successfully" or "simply".

## Files

| Path | What it is |
|---|---|
| `tokens/signal.tokens.json` | Core tokens (DTCG): colour, font, type roles, space, radius, border width, size, duration, easing, shadow, z. Source of truth. |
| `tokens/extensions/overview.tokens.json` | Overview's map tokens: ground, plates, lattice, creatures, slabs, HUD, projection and zoom constants. |
| `css/signal.css` | Generated custom properties (`--sg-*`), with Signal (dark) as the default and Fog under `[data-theme="fog"]`. Also hand-written base styles: selection, scrollbars, focus ring, keycap, tabular numerals, type-role classes and reduced motion. |
| `css/components.css` | The shared components. |
| `css/extensions/overview.css` | Generated `--sg-overview-*` properties. |
| `scripts/build.mjs` | Regenerates the files above from the JSON. |
| `index.html` | Local reference page. |

## Using it in an app

### Link the CSS

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="node_modules/@barrymind/signal/css/signal.css">
<link rel="stylesheet" href="node_modules/@barrymind/signal/css/components.css">
<!-- only in Overview -->
<link rel="stylesheet" href="node_modules/@barrymind/signal/css/extensions/overview.css">
```

With a bundler:

```js
import '@barrymind/signal/signal.css';
import '@barrymind/signal/components.css';
```

Install from a local path, for example `"@barrymind/signal": "file:../signal"`. The package does not ship fonts. Load JetBrains Mono and Instrument Sans yourself, either from Google Fonts as above or bundled.

**Themes.** Signal (dark) applies with no attribute. To use Fog, set `data-theme="fog"` on `<html>` (or on any subtree) before first paint. `data-theme="signal"` forces dark inside a Fog subtree. Every theme block holds resolved values, so nested themes work. To follow the OS, set the attribute from `prefers-color-scheme` in your own boot script.

**Motion.** `prefers-reduced-motion: reduce` turns transitions off. You can also force it with `data-motion="reduce"` on `<html>`, or keep transitions with `data-motion="full"`.

### Import the tokens

```js
import tokens from '@barrymind/signal/tokens.json' with { type: 'json' };
tokens.color.status.wait.fg.$value.hex;                       // "#fec04a"
tokens.color.base.yellow.$extensions['dev.signal.modes'].fog; // Fog value
```

Canvas code that cannot read CSS should take colours from the JSON, or read `--sg-*` once with `getComputedStyle` and cache them.

### Components

| Class | What it is |
|---|---|
| `.sg-btn`, `--primary`, `--ghost` | 26px keycapped button. Use one primary per container. Ghost is the borderless title-bar button. |
| `kbd`, `.sg-kbd` | Keycap (in `signal.css`). |
| `.sg-tag` | Hairline mono chip (`sample data`). |
| `.sg-badge` | Yellow count badge. |
| `.sg-tabs` / `.sg-tab[aria-selected]` | Underline tabs. |
| `.sg-section-head` | Uppercase mono list head, always with a count (`needs you · 2`). |
| `.sg-attn` and `__title`, `__meta`, `__status`, `__age`, `__cmd`, `__question`, `__actions`; `.sg-prompt` | Attention card: the yellow "needs you" card. Add `.is-selected` for the 2px accent ring. |
| `.sg-row` and `__title`, `__age`, `__meta`; `--err`, `.is-selected` | List row: glyph, title, age, meta line. |
| `.sg-statusbar`, `__keys`, `.sg-status-item--{wait,done,err,idle}`, `.sg-status-host` | Status bar and its items. |
| `.sg-tooltip` and `__title`, `__meta`, `__code` | Tooltip (the app positions it). |
| `.sg-toast`, `.is-hidden` | Toast. The app removes it after `--sg-duration-toast-min`. |
| `.sg-segmented` | Zoom/segmented group: `<button>` and `<output>` cells. |
| `.sg-map-label`, `--machine`, `--plot`, `.is-dragging` | Label drawn over content. |
| `.sg-callout`, `--err/--run/--done`, `--pointer` | Status callout with a border in the status colour at 70%. |
| `.sg-icon` with `.sg-tone-{run,wait,done,err,idle,you}` | Status glyphs. The inline SVG snippets are at the end of `components.css`. |

Components use only `--sg-*` properties. Overview's build used some optical values that fall off the scale (7, 9 and 14px). These are written as sums of tokens, for example `calc(var(--sg-space-6) + var(--sg-border-width-hairline))`.

## Naming rules

1. **Token paths** follow DTCG groups. Colours are in two layers:
   - `color.base.*` holds the raw palette (bg, panel, side, line, line2, sel, fg, dim, faint, accent, green, yellow, red, blue). Read it only for canvas work or when deriving a value.
   - The semantic layer is what components use: `color.surface.*`, `color.state.*`, `color.text.*`, `color.border.*`, `color.accent.*`, `color.selection.*`, `color.status.{run,wait,done,err,idle}.*`, `color.diff.*`, `color.overlay.*` and `color.scrollbar.*`. These names come from Hangar.
2. **Name by role, not by look.** Use `text.subtle`, not `grey-9b`. Status tokens are named by state (`status.wait.fg`), never by hue.
3. **CSS names** are `--sg-` plus the path in kebab case, with the `color` group and the `family` segment dropped:
   - `color.status.wait.fg` becomes `--sg-status-wait-fg`
   - `font.family.mono` becomes `--sg-font-mono`
   - `size.iconSm` becomes `--sg-size-icon-sm`
   - `type.body` becomes `--sg-type-body` (the `font` shorthand), plus `-size`, `-weight`, `-line-height`, and `-tracking` where set.
4. **Themes** live inside the token, in `$extensions["dev.signal.modes"].fog`. An alias such as `{color.base.bg}` resolves within the active theme, so only base colours and literal values need a Fog entry. Derived alphas record their recipe in `dev.signal.derive`.
5. **Classes** are `.sg-<component>`, with `__part` for parts, `--variant` for variants, and `.is-<state>` or ARIA attributes for state.
6. **Extensions** use the prefix `--sg-<app>-*` and must not redefine core names. The build fails if two tokens map to the same property.

## Adding an app extension

1. Create `tokens/extensions/<app>.tokens.json` with a single top-level group named after the app, for example `{ "hangar": { "color": { ... } } }`. Add only tokens that no other app uses. Anything shared belongs in core.
2. Reference core tokens with aliases (`"{color.base.side}"`) rather than copying hex values.
3. Run `node scripts/build.mjs`. It writes `css/extensions/<app>.css` with `--sg-<app>-*` properties.
4. Add the CSS and JSON to `exports` in `package.json`, and load the CSS after `signal.css`.

Hangar's next extension would hold `term.*` (the 16 ANSI colours), `floor.*`, the "Hangar Symbols" font, the composer, floor and window sizes, `duration.floorTick` and `z.floorOverlay`. These were left out of core on purpose.

## Build

```sh
node scripts/build.mjs          # regenerate
node scripts/build.mjs --check  # exit 1 if anything is out of date
```

Edit the JSON and never the generated CSS. The variable block in `signal.css` sits between the `@sg-tokens` markers; the base styles below it are hand-written. The build also refreshes the token manifest that `index.html` reads.

## Where the values come from

The two sources are Overview (`DESIGN.md` and `.impeccable/design.json`, recorded from the approved map) and Hangar (`inputs/tokens.json`, plus `ROADMAP.md` and `ui/mockups.html` for Fog). The palettes are the same. Where they disagree on a shared token, Overview's recorded value wins:

| Token | Hangar | Signal (Overview) |
|---|---|---|
| `accent.bgHover` | accent at 18% | 20% |
| `accent.border` | accent at 55% | 60% |
| `status.*.bg` | status at 8% | 6% (attention card fill) |
| `state.hoverControl` (new) | ghost buttons used `state.hover` at 4% | ink at 6% on borderless controls |
| `overlay.label` (was `floor.labelBg`) | side at 80% | side at 86% |
| `type.body` line height | 13/20 (1.5385) | 1.45 |
| `type.headline` (was `sansMd`) | 15px, weight 600 | 15px, weight 500 |
| `type.section` (was `label`) | weight 500 | 400 (same 0.06em tracking, uppercase) |
| `type.control` (was `monoSm`) | 12/18 | 12px/1.45 |
| Font stacks | include "Hangar Symbols" and Noto Sans | Overview's stacks (SF Mono, Menlo, Segoe UI) |
| `size.rail` | 280px | 340px |
| `duration.toastMin` | 5000ms | 3200ms; the toast also exits at `slow` (220ms), not `base` |
| Shadows | popover, dialog | adds `tooltip` (0 6 18) and `toast` (0 8 24, no spread); keeps popover and dialog |
| Spacing | 0, 2, 4, 8, 12, 16, 24, 32, 48 | adds 6 and 10 |
| Radius | sm, md, lg, window, full | adds `hair` (2px) |
| Size | control 24 and 28 | adds `button` (26px), `kbd`, `mapLabel`, `callout`, `badgeW/H`, `dot`, `focusOffset` |

Hangar type names map as follows: `label` → `section`, `monoXs` → `meta`, `monoSm` → `control`, `monoMd` → `terminal`, `sansSm` → `body`, `sansMd` → `headline`, `sansLg` → `display`. Overview adds `title`, `bodyStrong`, `bodySmall`, `code`, `status`, `mapLabel` and `badge`.

## Contrast (0.1.1)

Checked in both themes on 2026-11-05:
- **Diff tints** are 6% (`diff.*.bg`) and 12% (`diff.*.emph`). With those tints, diff text and the gutter reach at least 4.5:1 on every diff ground. The tints were 10% and 24%, and three pairs failed.
- **`border.control`** (an alias of `border.strong`, about 3.4–3.9:1) outlines inputs and any control that is identified only by its edge, such as `.sg-input`. Buttons keep `border.default`, because their label identifies them.
- **`text.disabled`** stays below 4.5:1 on purpose. WCAG exempts disabled controls, so never use it for text people need to read.

## Gaps

- **Fog is not in Hangar's `tokens.json`.** Its values come from Hangar's `ROADMAP.md` token table and the `[data-theme="fog"]` block in `ui/mockups.html`. They include two proposed fixes (green #016D52, yellow #944D01) that are still pending the owner (roadmap open question 7). In Fog, `text.subtle` equals `text.secondary` (#5B5E62), as Hangar specifies.
- **Fog alphas were derived, not reviewed.** Overview's alphas (accent hover 20%, accent border 60%, status tint 6%, label scrim 86%) were applied to Fog's colours. No one has checked their contrast in Fog.
- **Fog has no tooltip or toast shadow.** Both use Fog's popover shadow.
- **The Overview extension is dark only.** Overview has no Fog map, so the reference page shows the map-label specimen on `surface.sunken` in Fog.
- **The callout border is a recipe, not a token.** It is the status colour at 70%, via `color-mix()`. Overview also uses 45% for the edge marker and 60% for the leader line. These alphas are recorded in `overview.opacity`, not as core colours.
- **The focus-ring radius is not applied globally.** DESIGN.md records a 3px focus-ring radius, which the prototype applied to every focused element. That would reshape the components, so the focus ring follows each element's own radius instead.
- **The segmented group has no selected-cell state.** Overview's zoom group only shows a value. A selected state was not invented.
- **Components that are not in core:**
  - Overview-only, not requested: edge marker, minimap, readout, brief item, live-demo switch. Their tokens are in the Overview extension where they exist.
  - Hangar specifies inputs, menus, dialogs, the command palette and others in `ui/UI.md`, but there is no built reference for them yet, so none were added.
- **The running spinner is static here.** Hangar specifies a braille spinner (⠋…⠏ at 80ms) that falls back to a static ⠿. Overview's build draws the static six-dot glyph, which is what ships.
- **Fonts are not bundled.** Apps load JetBrains Mono and Instrument Sans themselves. Hangar's "Hangar Symbols" fallback font belongs in its extension.
