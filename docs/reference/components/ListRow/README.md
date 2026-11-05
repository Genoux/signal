# ListRow

A list row: a 14px status glyph, the title, a right-aligned age, and a meta line beneath.

## When to use

- For every session that is not waiting: failed, running, done and asleep, each group under its section head.

## What you provide

- `.sg-row` on a focusable element, holding these children in order:
  - the status glyph, an `svg.sg-icon` with its tone class;
  - `<span class="sg-row__title">`, the task in sans;
  - `<span class="sg-row__age">`, such as `9m`;
  - `<span class="sg-row__meta">`, a middle-dot summary such as `flow · pnpm test · exit 1`.
- `.sg-row--err` for a failed row, whose meta line turns `sg-status-err-fg`.
- `.is-selected`, or `aria-selected="true"`, for the selected row.

## Anatomy

- Grid columns: `sg-size-icon-md`, then the title, then auto. Column gap `sg-space-8`.
- Padding `sg-space-6` × `sg-space-4`. Radius `sg-radius-md`.
- Title type `body` in `sg-text-primary`, cut off with an ellipsis. Age and meta type `meta` in `sg-text-subtle`.
- **Hover:** a `sg-state-hover` wash.
- **Selected or focused:** `sg-surface-selected` with a 1px `sg-accent-border` inset ring. Hover never stacks on it.

## Do and don't

- Do keep the word for the status in the section head above the rows.
- Don't put waiting sessions in rows; they get an AttentionCard.
