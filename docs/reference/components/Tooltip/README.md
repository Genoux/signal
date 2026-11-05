# Tooltip

A floating detail card with a title, a status meta line and an optional command. It is one of the few things that casts a shadow.

## When to use

- On hover or selection of something on the map or in a list, after `sg-duration-tooltip-delay`.

## What you provide

- A `<div class="sg-tooltip">` holding:
  - `__title`: the task;
  - `__meta`: a status glyph and a middle-dot line, such as `needs you · 18m · claude on macbook`;
  - optionally `__code`: a command.
- Positioning is the app's job.

## Anatomy

- Maximum width `sg-size-tooltip-max-w`. Padding 7px × 9px (`sg-space-6` / `sg-space-8` + hairline).
- `sg-surface-overlay` fill, `sg-border-default` hairline, radius `sg-radius-md`, shadow `sg-shadow-tooltip`, stacked at `sg-z-tooltip`.
- Title type `body-strong` in `sg-text-primary`. Meta type `meta` in `sg-text-secondary`. Code type `control` in `sg-text-primary`.

## Do and don't

- Do repeat the status word in the meta line beside the glyph.
- Don't put actions in a tooltip.
