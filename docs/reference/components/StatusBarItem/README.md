# StatusBarItem

The 24px status bar and its items: a count per status in its status colour with its glyph, key hints centred, and connected hosts at the right.

## When to use

- Across the bottom of an app window, as the always-visible summary.

## What you provide

- A `<footer class="sg-statusbar">` holding, in order:
  - the app name;
  - one `.sg-status-item` per status. `--wait`, `--done`, `--err` and `--idle` colour the item. A running item has no modifier: its text stays `sg-text-secondary` and its glyph carries `.sg-tone-run`;
  - `.sg-statusbar__keys` with the key hints;
  - one `.sg-status-host` per connected host.

## Anatomy

- Height `sg-size-status-bar`. Side padding `sg-space-12`. Item gap 14px (`sg-space-12` + `sg-space-2`).
- Type `status` (11.5px mono, tabular). Text `sg-text-secondary` on `sg-surface-base`, with a `sg-border-subtle` top hairline.
- Glyph-to-count gap is 5px (`sg-space-4` + `sg-border-width-hairline`).
- Key hints are `sg-text-subtle`, centred, and cut off with an ellipsis.
- Each host is led by a `sg-size-dot` dot in `sg-status-done-fg`.

## Do and don't

- Do write each count with its word: `2 waiting`, `1 failed`.
- Don't drop the glyphs; status is glyph, colour and word.
- At narrow widths, apps drop the key hints and hosts first.
