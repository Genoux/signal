# Gaps and open decisions

Read this before relying on Fog or on anything marked pending.

## Gaps

- **Fog is not approved yet.** Fog is not in Hangar's `tokens.json`. Its values come from Hangar's `ROADMAP.md` token table and the `[data-theme="fog"]` block in `ui/mockups.html`. They include two proposed fixes still pending the owner (roadmap open question 7): green **#016D52** (`sg-base-green`, so `sg-status-done-fg` and `sg-diff-add-fg`) and yellow **#944D01** (`sg-base-yellow`, so `sg-status-wait-fg` and the count badge). In Fog, `sg-text-subtle` equals `sg-text-secondary` (#5B5E62), as Hangar specifies.
- **Fog alphas were derived, not reviewed.** Overview's alphas (accent hover 20%, accent border 60%, status tint 6%, label scrim 86%) were applied to Fog's colours. No one has checked their contrast in Fog.
- **Fog has no tooltip or toast shadow.** Both use Fog's popover shadow.
- **The Overview extension is dark only.** Overview has no Fog map, so every `sg-overview-*` colour shows its Signal value in Fog. The map-label and callout specimens sit on `sg-surface-sunken` in Fog.
- **The callout border is a recipe, not a token.** It is the status colour at 70%, via `color-mix()` in the component CSS. Overview also uses 45% for the edge marker and 60% for the leader line. These alphas are in `sg-overview-opacity-*`, not core colours.
- **The focus-ring radius is not applied globally.** DESIGN.md records a 3px focus-ring radius, which the prototype applied to every focused element. That would reshape the components, so the focus ring follows each element's own radius.
- **The segmented group has no selected-cell state.** Overview's zoom group only shows a value. A selected state was not invented.
- **Components that are not in core:**
  - Overview-only, not requested: edge marker, minimap, readout, brief item, live-demo switch. Their tokens are in the Overview extension where they exist.
  - Hangar specifies inputs, menus, dialogs, the command palette and others in `ui/UI.md`. There is no built reference for them yet, so none were added. The size, shadow and z tokens for palette and dialogs exist ahead of the components.
- **The running spinner is static.** Hangar specifies a braille spinner (⠋…⠏ at `sg-duration-spinner-frame`, 80ms) that falls back to a static ⠿. Overview's build draws the static six-dot glyph, which is what ships.
- **Fonts are not bundled.** Apps load JetBrains Mono and Instrument Sans themselves. Hangar's "Hangar Symbols" fallback font belongs in its extension.

## Contrast (0.1.1)

Fixed on 2026-11-05:
- **Diff tints** went down from 10% and 24% to 6% (`-bg`) and 12% (`-emph`). Diff text and the gutter now reach at least 4.5:1 on every diff tint in both themes.
- **`sg-border-control`** is new. It is an alias of `sg-border-strong` at 3.4 to 3.9:1 and outlines inputs (`.sg-input`) and any control identified only by its edge. `sg-border-default` stays on buttons, whose label identifies them.

Still under the floor, by design:

| Pair | Signal | Fog | Why it stays |
|---|---|---|---|
| `sg-text-disabled` on any surface | 2.9 to 3.6:1 | 2.5 to 3.1:1 | WCAG exempts disabled controls. Never use it for text people need to read. |

## Where Overview and Hangar disagree

The values come from Overview (`DESIGN.md` and `.impeccable/design.json`, recorded from the approved map) and Hangar (`inputs/tokens.json`, plus `ROADMAP.md` and `ui/mockups.html` for Fog). The palettes are the same. Where they disagree on a shared token, Overview's recorded value wins.

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

Hangar's type names map as follows: `label` → `section`, `monoXs` → `meta`, `monoSm` → `control`, `monoMd` → `terminal`, `sansSm` → `body`, `sansMd` → `headline`, `sansLg` → `display`. Overview adds `title`, `bodyStrong`, `bodySmall`, `code`, `status`, `mapLabel` and `badge`.
