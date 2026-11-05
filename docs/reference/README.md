Signal is the design system shared by the owner's apps: Overview first, then Hangar. It is a calm instrument panel. The chrome is grey, one loud colour means "needs you", and every fact is visible before you act. It ships as one npm package, `@barrymind/signal`. The package holds DTCG tokens, generated CSS custom properties (`--sg-*`) and plain-CSS components, with no framework and no dependencies.

Every token here keeps its CSS name without the leading `--`: `sg-status-wait-fg` is `var(--sg-status-wait-fg)`. There are two themes. **Signal** (dark) is the default and **Fog** (light) is the second. Fog is not approved yet (see *Gaps and open decisions*).

## Principles

1. **Quiet until needed.** Needs-you yellow (`sg-status-wait-fg`) is the loudest thing on screen. Nothing else tints, pulses or moves for attention. When something needs the owner, yellow appears everywhere that thing is shown: on the map, at the stage edge, in the rail and in the status bar.
2. **Grey first.** Surfaces, borders, labels and text are graphite, one or two tonal steps apart: `sg-surface-base`, `sg-surface-raised`, `sg-surface-sunken`, divided by `sg-border-subtle` hairlines.
3. **Colour only for status and for "you".** Hue means one of four statuses (run, wait, done, err) or the owner's own hand: focus, selection, the primary action, and anything being dragged (`sg-accent-*`, `sg-border-focus`). If an element is neither, it is grey.
4. **Mono for machines, sans for prose.** Names, paths, numbers, commands, controls and labels use JetBrains Mono (`mono`). Sentences a person reads use Instrument Sans (`sans`). Numbers that update use tabular figures.
5. **Hairlines and small radii.** Every border is `sg-border-width-hairline` (1px). Corners run from `sg-radius-hair` (2px) to `sg-radius-lg` (6px). Bars, cards, rows and buttons are flat. Only floating overlays (tooltip, toast, popover, dialog) cast a shadow. State is shown with rings and borders, never with lift.
6. **Status is glyph plus colour plus word.** run uses braille dots, wait a diamond, done a check, err a cross, and idle a ring. A glyph is never the only signal: the word appears beside it, in the group head, or in the accessible name.
7. **Motion confirms cause and effect.** Hover is `sg-duration-fast` (80ms), switches `sg-duration-base` (140ms), toasts and dialogs `sg-duration-slow` (220ms). Only opacity, transform and hover colour animate. Reduced motion removes all of it.

## Voice

Plain, specific and short. Say what happened and what is wanted.

- **Mono labels are lowercase.** `open in orca`, `locate`, `fit`, `retry`, `live demo`.
- **Sans prose is sentence case.** "Fix sync conflict on reconnect". "Electron or Tauri for P0? Comparison is in the session."
- **Never** use exclamation marks, "please", "oops", "successfully" or "simply". No emoji.
- **Separate facts with a middle dot.** `claude · macbook:gramly`, `flow · pnpm test · exit 1 · 3 failing in Timeline.spec`.
- **Section heads always carry a count.** `needs you · 2`, `failed · 1`, `asleep · 1`.
- **Status lines name the ask.** "wants to run a command", "is asking a question", then the age (`waiting 18m`).
- **A callout says why the hand is raised in 20 characters or fewer.** `run pnpm db:migrate?`, `exit 1 · 3 failing`.
- **A toast confirms what you just did.** `flow · codex finished keyboard map`.
- **Ages and counts are short and tabular.** `9m`, `41m`, `2d`, `2×`. Coordinates are zero-padded with a true minus: `02·08`, `v −16`.
- **Prototypes carry a `sample data` tag.**

## Colour

- **Use the semantic layer.** Components read `sg-surface-*`, `sg-state-*`, `sg-text-*`, `sg-border-*`, `sg-accent-*`, `sg-selection-*`, `sg-status-{run,wait,done,err,idle}-*`, `sg-diff-*`, `sg-overlay-*` and `sg-scrollbar-*`. The raw palette `sg-base-*` is for canvas work or for deriving a value.
- **Name by role, not by look.** Status tokens are named by state (`sg-status-wait-fg`), never by hue.
- **Text.** Set body text in `sg-text-primary`. Use `sg-text-secondary` for metadata and control labels, and `sg-text-subtle` for section heads, ages, paths, tags and tab labels. `sg-text-disabled` is only for disabled labels, the "$" before a command and ambient marks. It is under 4.5:1 in both themes, so never set information in it.
- **Yellow is reserved.** Only a waiting session gets `sg-status-wait-fg`: the diamond, the attention card (`sg-status-wait-bg` fill, `sg-status-wait-border` edge), the count badge and the default callout edge. No other state may borrow those devices.
- **The accent is the owner's hand.** The primary button is `sg-accent-bg` with `sg-accent-border`, going to `sg-accent-bg-hover` and `sg-accent-bg-pressed`. A selected row is `sg-surface-selected` with a 1px `sg-accent-border` inset ring. Text selection is `sg-selection-bg`. A dragged label takes a `sg-border-focus` edge.
- **Running is the faintest status.** `sg-status-run-fg` is a blue-grey near-white in Signal, so activity never competes with yellow.
- **Text on a solid fill** uses `sg-text-on-accent`, never literal white or black.
- **Diffs.** Added lines use `sg-diff-add-bg`, with changed words on `sg-diff-add-emph`. Removed lines use `sg-diff-del-bg` and `sg-diff-del-emph`. Set the words on an `-emph` tint in `sg-text-primary`. The diff foregrounds fail 4.5:1 there: `sg-diff-add-fg` in Fog, `sg-diff-del-fg` in Signal.
- **Overview's map tokens** (`sg-overview-*`) are dark only. The lattice is always ink at a stated alpha over `sg-overview-ground`, so the plane has one line colour.

Every text token's usage note names the grounds it reads on and its contrast in both themes. `sg-border-default` (1.4 to 1.7:1) is under the 3:1 a control border needs. It is kept as the source has it; buttons also read by their sunken fill and keycap.

## Type

Two families, fourteen roles. The `--sg-type-<role>` custom properties are `font` shorthands: write `font: var(--sg-type-body)`, or use the class `.sg-type-body`.

- **Sans** (Instrument Sans): `display` 20/600 (rare onboarding headline), `headline` 15/500 (the largest type in an app view), `title` 14/500 (card titles), `body` 13/400 (rows, questions, toasts; the page default), `body-strong` 13/500, `body-small` 12.5/400 (explanations in `sg-text-secondary`).
- **Mono** (JetBrains Mono): `terminal` 13/1.5385, `code` 12.5 (a command for approval, wrapping anywhere), `control` 12 (buttons, tabs, segmented cells), `status` 11.5 (status bar), `map-label` 11.5/500, `meta` 11 (ages, agent lines, tags, keycaps), `section` 11 uppercase +0.06em (list heads), `badge` 10.5/500.
- Line height is 1.45 everywhere except `terminal` (1.5385) and `badge` (1).
- `status`, `meta` and `badge` use tabular figures, as does `.sg-num`, `output` and `time`.
- Headline and title wrap balanced.

## Space, shape and borders

- **Space** is a 4px base with two Overview steps: `sg-space-2` to `sg-space-48`. Use `sg-space-4` for inner padding, `sg-space-6` between related items, `sg-space-8` between siblings, `sg-space-10` × `sg-space-12` for card padding and bar insets, and `sg-space-16` between list sections.
- **Off-scale optical values** from Overview's build (7, 9 and 14px) are sums of tokens. For example, 7px is `calc(var(--sg-space-6) + var(--sg-border-width-hairline))`. Never add a new step for them.
- **Radii.** `sg-radius-hair` for the count badge; `sg-radius-sm` for tags, keycaps and map labels; `sg-radius-md` for controls, rows, tooltips and callouts; `sg-radius-lg` for cards and toasts; `sg-radius-window` for window corners only; `sg-radius-full` for pills and the host dot.
- **Borders** are `sg-border-width-hairline`. `sg-border-width-thick` (2px) is only for the focus ring, the keycap's bottom edge, the selected tab's underline and the selected attention card's ring.
- **Fixed sizes.** The bordered button is `sg-size-button` (26px). The ghost button is `sg-size-control-sm` (24px). A segmented cell is `sg-size-control-md` (28px). The title bar is `sg-size-title-bar` (40px), the status bar `sg-size-status-bar` (24px), the tab bar `sg-size-tab-bar` (32px) and the rail `sg-size-rail` (340px).

## Elevation, focus and motion

- **Flat chrome.** Only floating overlays carry a shadow: `sg-shadow-tooltip`, `sg-shadow-toast`, `sg-shadow-popover` and `sg-shadow-dialog`, stacked by `sg-z-*`.
- **Focus.** Keyboard focus is a 2px solid `sg-border-focus` outline at `sg-size-focus-offset` (1px), shown only for `:focus-visible`. It follows each element's own radius. A selected or focused attention card swaps its border for a 2px `sg-border-focus` ring.
- **Motion.** Use `sg-duration-fast` for hover and press colour, `sg-duration-base` for switches and the tab underline, and `sg-duration-slow` with `sg-easing-standard` (in) and `sg-easing-exit` (out) for toasts and dialogs. A toast stays for `sg-duration-toast-min` (3200ms).
- **Reduced motion.** `prefers-reduced-motion: reduce` turns transitions off. Force it with `data-motion="reduce"` on `<html>`, or keep transitions with `data-motion="full"`.

## Iconography

Signal's icons are five 12px status glyphs, drawn as inline SVG on a 12 × 12 viewBox in `currentColor`. They are not an icon font and not image files. Put the glyph in `.sg-icon` (12px, `sg-size-icon-sm`) and set its colour with a tone class, or let it inherit from a coloured parent such as `.sg-status-item--wait`.

| Status | Glyph | Tone class | Colour | Word |
|---|---|---|---|---|
| run | six braille dots | `.sg-tone-run` | `sg-status-run-fg` | running |
| wait | filled diamond | `.sg-tone-wait` | `sg-status-wait-fg` | needs you, waiting |
| done | check, 1.5 stroke | `.sg-tone-done` | `sg-status-done-fg` | done |
| err | cross, 1.5 stroke | `.sg-tone-err` | `sg-status-err-fg` | failed |
| idle | ring, 1.2 stroke | `.sg-tone-idle` | `sg-status-idle-fg` | asleep, idle, offline |
| you | (any mark) | `.sg-tone-you` | `sg-accent-fg` | (selection, the owner's action) |

```html
<svg class="sg-icon sg-tone-wait" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1 11 6 6 11 1 6Z" fill="currentColor"/></svg>
```

- **Always pair a glyph with its word,** visibly, in the group head, or in the accessible name. Glyphs are `aria-hidden`.
- **The running glyph is static** (⠿, six dots). Hangar specifies an animated braille spinner; it is not built.
- **List rows** put the glyph in a 14px column (`sg-size-icon-md`).
- **The segmented control's** minus and plus are 12px strokes at 1.3.
- **No emoji, and no decorative icons.** A new icon is a status or it is not drawn.
- **Signal has no logo.** Set the name in plain type, lowercase in mono (`signal`).

## Components

Plain classes, no framework. Every value is a `--sg-*` custom property. Classes are `.sg-<component>`, with `__part` for parts, `--variant` for variants, and `.is-<state>` or ARIA attributes for state.

| Component | Class | Use it for |
|---|---|---|
| Button | `.sg-btn`, `--primary`, `--ghost` | 26px keycapped action; one primary per container; ghost in the title bar |
| Kbd | `kbd`, `.sg-kbd` | Keycap showing a shortcut |
| Tag | `.sg-tag` | Quiet hairline mono chip (`sample data`) |
| Badge | `.sg-badge` | Yellow waiting count |
| Tabs | `.sg-tabs`, `.sg-tab[aria-selected]` | Underline tabs |
| SectionHead | `.sg-section-head` | Uppercase list head with its count |
| AttentionCard | `.sg-attn`, `.sg-prompt` | The yellow needs-you card |
| ListRow | `.sg-row` | Glyph, title, age, meta line |
| StatusBarItem | `.sg-statusbar`, `.sg-status-item--*`, `.sg-status-host` | The status bar and its counts |
| Tooltip | `.sg-tooltip` | Floating detail; the app positions it |
| Toast | `.sg-toast`, `.is-hidden` | Confirms what you just did |
| SegmentedControl | `.sg-segmented` | Zoom group of buttons and an output |
| MapLabel | `.sg-map-label`, `--machine`, `--plot`, `.is-dragging` | Label drawn over content |
| Callout | `.sg-callout`, `--err/--run/--done`, `--pointer` | Status callout over content |
| StatusIcons | `.sg-icon`, `.sg-tone-*` | The five status glyphs |

## Naming

1. **Token paths** follow DTCG groups. Colours come in two layers: the raw `color.base.*` palette and the semantic layer, whose names come from Hangar.
2. **CSS names** are `--sg-` plus the path in kebab case, with the `color` group and the `family` segment dropped. `color.status.wait.fg` becomes `--sg-status-wait-fg`, `font.family.mono` becomes `--sg-font-mono`, `size.iconSm` becomes `--sg-size-icon-sm`, and `type.body` becomes `--sg-type-body`, plus `-size`, `-weight`, `-line-height` and `-tracking` where set.
3. **Themes** live inside each token, in `$extensions["dev.signal.modes"].fog`. An alias such as `{color.base.bg}` resolves within the active theme, so only base colours and literal values need a Fog entry.
4. **Extensions** use the prefix `--sg-<app>-*` and must not redefine core names. Overview's is `--sg-overview-*`.

## Using Signal in an app

Overview and Hangar consume the same npm package, `@barrymind/signal`. Install it from a local path, for example `"@barrymind/signal": "file:../signal"`. Then link the CSS, fonts first:

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
import tokens from '@barrymind/signal/tokens.json' with { type: 'json' };
tokens.color.status.wait.fg.$value.hex;                       // "#fec04a"
tokens.color.base.yellow.$extensions['dev.signal.modes'].fog; // Fog value
```

- **Fonts.** The package does not ship them. Load JetBrains Mono and Instrument Sans yourself, from Google Fonts as above or bundled.
- **Themes.** Signal (dark) applies with no attribute. For Fog, set `data-theme="fog"` on `<html>` (or any subtree) before first paint. `data-theme="signal"` forces dark inside a Fog subtree. To follow the OS, set the attribute from `prefers-color-scheme` in your own boot script.
- **Canvas code** that cannot read CSS takes colours from the JSON, or reads `--sg-*` once with `getComputedStyle` and caches them.
- **Edit the JSON, never the generated CSS.** `node scripts/build.mjs` regenerates the CSS; `--check` exits 1 if anything is out of date.
- **An app extension** goes in `tokens/extensions/<app>.tokens.json`, under one top-level group named after the app. It holds only tokens no other app uses, references core with aliases (`"{color.base.side}"`), and loads after `signal.css`. Hangar's planned extension holds `term.*` (the 16 ANSI colours), `floor.*`, the "Hangar Symbols" font, composer, floor and window sizes, `duration.floorTick` and `z.floorOverlay`.
