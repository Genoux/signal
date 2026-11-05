# SegmentedControl

One panel of 28px cells divided by hairlines, holding buttons and an `<output>` for the current value. It is Overview's zoom group.

## When to use

- For a small set of related steps around one value: zoom out, the level, zoom in, fit.

## What you provide

- A `<div class="sg-segmented" role="group" aria-label="…">` holding `<button type="button">` cells and one `<output aria-live="polite">`.
- Icon-only buttons get an `aria-label`. Their 12px SVGs use a 1.3 stroke in `currentColor`.

## Anatomy

- `sg-surface-raised` fill, `sg-border-default` hairline, radius `sg-radius-md`. Cells are divided by `sg-border-subtle`.
- Cells are `sg-size-control-md` tall and at least as wide, with `sg-space-8` side padding. Type `control` in `sg-text-secondary`.
- The output is at least 46px wide (`sg-space-48` − `sg-space-2`), in `sg-text-primary` with tabular figures.
- **Hover:** `sg-text-primary` on `sg-state-hover-control`.
- **Focus:** the ring is inset by `sg-border-width-thick`.

## Do and don't

- Do show the value as it is: `2×`.
- There is no selected-cell state. Overview's group only shows a value, and none was invented.
