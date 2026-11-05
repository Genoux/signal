# Kbd

A keycap that shows a shortcut: 11px mono in `sg-text-secondary` on a sunken well, with a 2px bottom edge.

## When to use

- Inside a button, before its label, to show the button's shortcut.
- Inline in prose and status lines, to name a key: "Press `t` to switch theme".

## What you provide

- A `<kbd>` element, or `.sg-kbd` on another element. Both are styled by the base stylesheet; no class is needed on `<kbd>`.
- The key's name as the app shows it: `Enter`, `Tab`, `l`, `f`.

## Anatomy

- Minimum width `sg-size-kbd` (18px). Line height `sg-size-kbd-line`. Side padding `sg-space-4`. Type `meta`.
- Fill `sg-surface-sunken`. Border `sg-border-default`, with a `sg-border-width-thick` bottom edge. Radius `sg-radius-sm`.

## Do and don't

- Do show a keycap only for a shortcut that works.
- Don't use a keycap as a tag or a badge.
