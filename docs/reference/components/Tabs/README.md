# Tabs

Underline tabs in 12px mono: subtle until hovered or selected, with a 2px ink underline on the divider.

## When to use

- To switch between views of the same pane, such as the rail's "now" and "morning brief".

## What you provide

- A container `.sg-tabs` with `role="tablist"`.
- `<button class="sg-tab" role="tab" type="button">` children. Set `aria-selected="true"` on one and `"false"` on the rest. Switching tabs is the app's job.

## Anatomy

- Bar height `sg-size-tab-bar` (32px). Tab gap and side inset `sg-space-16`. The bar has a `sg-border-subtle` bottom hairline.
- Tab type `control`, colour `sg-text-subtle`. Hovered and selected tabs go to `sg-text-primary` over `sg-duration-fast`.
- The selected tab's underline is `sg-border-width-thick`, in `sg-text-primary`, sitting on the divider.

## Do and don't

- Do keep labels lowercase and short.
- Don't colour the selected tab; selection here is ink, not accent.
