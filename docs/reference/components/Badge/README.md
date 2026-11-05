# Badge

The yellow count badge: how many sessions are waiting, on a solid needs-you fill.

## When to use

- Beside a machine label, or anywhere that counts sessions that need the owner.
- Only for waiting counts. It borrows needs-you yellow, which nothing else may use.

## What you provide

- A `<span class="sg-badge">` holding the number. Give the surrounding label an accessible word ("waiting"); the badge alone is not enough.

## Anatomy

- Minimum width `sg-size-badge-w` (15px). Height `sg-size-badge-h` (12px). Side padding `sg-space-2`.
- Type `badge` (10.5px mono, 500, tabular). Text `sg-text-on-accent` on a `sg-status-wait-fg` fill: 10.6:1 in Signal, 5.7:1 in Fog.
- Radius `sg-radius-hair`.

## Do and don't

- Do hide it when the count is zero.
- Don't use it for unread counts or totals that are not waiting sessions.
