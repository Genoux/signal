# Toast

A short confirmation of what you just did. It slides in and out in 220ms and leaves after 3200ms.

## When to use

- After an action whose result isn't otherwise visible, or when a session finishes something.

## What you provide

- A `<div class="sg-toast" role="status" aria-live="polite">` holding one line of sans text.
- Add `.is-hidden` to hide it. The app removes it after `sg-duration-toast-min`.

## Anatomy

- Maximum width `sg-size-toast-w`, and never closer than `sg-space-12` to either side of its container. Padding 9px × `sg-space-12`. Gap `sg-space-8`.
- Type `body` in `sg-text-primary` on `sg-surface-overlay`, with a `sg-border-default` hairline, radius `sg-radius-lg`, shadow `sg-shadow-toast` and `sg-z-toast`.
- It enters with opacity and an `sg-space-8` rise over `sg-duration-slow` with `sg-easing-standard`, and leaves with `sg-easing-exit`. Reduced motion removes the transition.

## Do and don't

- Do say what happened: `flow · codex finished keyboard map`.
- Don't write "successfully" or use an exclamation mark, and don't use a toast for something that needs the owner. That gets an AttentionCard.
