# AttentionCard

The yellow "needs you" card: the one tinted container in Signal. It shows a waiting session's title, agent line, status, its command or question, and actions.

## When to use

- Only for a session that needs the owner. It sits at the top of the rail under the `needs you · n` section head.
- Every waiting session gets one, alongside its other signals on the map and in the status bar.

## What you provide

- `.sg-attn` on a focusable element (`tabindex="0"`, or an `a` or `button`), holding these parts in order:
  - `__title`: the task, in sans sentence case.
  - `__meta`: agent and host, such as `claude · macbook:gramly`.
  - `__status`: the wait glyph, the ask in a `<span>`, then `<em class="sg-attn__age">`.
  - Either `__cmd` (the command, led by `<i class="sg-prompt">$</i>`) or `__question` (the question, in sans).
  - `__actions`: one `.sg-btn--primary` and any plain buttons.
- `.is-selected`, or `aria-selected="true"`, for the selected card.

## Anatomy

- Padding `sg-space-10` × `sg-space-12`, gap `sg-space-6`, radius `sg-radius-lg`.
- Fill `sg-status-wait-bg` and border `sg-status-wait-border`, over `sg-surface-raised`.
- Title type `title`. Meta type `meta` in `sg-text-subtle`. The status line is `control` in `sg-status-wait-fg` (8.0:1 Signal, 5.3:1 Fog on the tint). The age is `meta` in `sg-text-subtle`.
- The command is `code` in `sg-text-primary`, wrapping anywhere. The "$" is `sg-text-disabled`, the one place faint text is allowed.
- **Selected or focused:** the border is replaced by a 2px `sg-border-focus` ring (box-shadow).

## Do and don't

- Do name the ask in the status line: "wants to run a command", "is asking a question".
- Don't use the card, or its tint, for any other status.
