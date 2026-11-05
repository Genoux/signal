# Callout

A 20px status callout over content: panel fill, a 1px border in the status colour at 70%, and at most 20 characters saying why the hand is raised.

## When to use

- Above or beside something on the map that has a status worth reading without hovering. Callouts are placed before every other label and always show, clamped into view if needed.

## What you provide

- A `<span class="sg-callout">` holding at most 20 characters of meta text.
- A tone modifier: none for needs you (the default), `--err`, `--run` or `--done`.
- `--pointer` when it sits above its subject. Beside its subject, the app draws a leader line at `sg-overview-opacity-leader-line`.

## Anatomy

- Height `sg-size-callout`. Side padding 7px (`sg-space-6` + hairline). Radius `sg-radius-md`.
- Type `meta` in `sg-text-primary` on `sg-surface-overlay`.
- The border is the tone's `sg-status-*-fg` at 70%, mixed with `color-mix()` in the CSS. It is a recipe, not a token; the 70% is `sg-overview-opacity-callout-border`.
- The pointer is a `sg-space-4` triangle in the border colour, over one in the fill.

## Do and don't

- Do say why: `run pnpm db:migrate?`, `exit 1 · 3 failing`.
- Don't exceed 20 characters or wrap.
