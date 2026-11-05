# Button

The 26px keycapped button: quiet by default, one primary per container, and a borderless ghost for the title bar.

## When to use

- `.sg-btn` for any action. When the action has a shortcut, lead with a `<kbd>` that shows it.
- `.sg-btn--primary` for the one action the container is for ("open in orca"). Use at most one per card or view.
- `.sg-btn--ghost` for the borderless title-bar button.

## What you provide

- A `<button type="button" class="sg-btn">`, with an optional leading `<kbd>` and a lowercase mono label.
- `disabled`, or `aria-disabled="true"`, for the disabled state.
- No icons in place of words.

## Anatomy

- Height `sg-size-button` (26px). Radius `sg-radius-md`. Type `control`. Label `sg-text-primary`.
- Fill `sg-surface-sunken` with a `sg-border-default` hairline.
- Padding is 0 `sg-space-8` 0 `sg-space-4` with a keycap, and `sg-space-8` on both sides without one. The keycap-to-label gap is 7px (`sg-space-6` + `sg-border-width-hairline`).
- **Hover:** the border goes to `sg-border-strong` over `sg-duration-fast`.
- **Primary:** `sg-accent-bg` fill and `sg-accent-border`. Hover goes to `sg-accent-bg-hover`, pressed to `sg-accent-bg-pressed`.
- **Ghost:** `sg-size-control-sm` (24px) tall, `sg-space-6` gap, `sg-text-secondary`, no fill or border. On hover it goes to `sg-text-primary` on `sg-state-hover-control`.
- **Disabled:** `sg-text-disabled` label and `sg-border-subtle` border.
- **Focus:** the global 2px `sg-border-focus` outline at a 1px offset.

## Do and don't

- Do use a verb first and keep it lowercase: `retry`, `locate`, `open in orca`.
- Don't put two primaries in one container, and don't add a shadow or lift.
- `sg-border-default` is under 3:1 against the surfaces. The sunken fill and the keycap carry the button's shape, so keep them.
