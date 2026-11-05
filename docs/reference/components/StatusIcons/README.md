# StatusIcons

The five 12px status glyphs: braille dots for running, a diamond for needs you, a check for done, a cross for failed, and a ring for asleep. They are drawn in `currentColor` and coloured by a tone class.

## When to use

- Wherever a status is shown: list rows, the status bar, tooltips, attention cards.
- Always with the status word, visibly, in the group head, or in the accessible name.

## What you provide

- The inline SVG below, on a 12 × 12 viewBox, with `class="sg-icon"`, a tone class, and `aria-hidden="true"`. They are inline snippets, not files, so they can take `currentColor`.

```html
<svg class="sg-icon sg-tone-run" viewBox="0 0 12 12" aria-hidden="true"><g fill="currentColor"><circle cx="4" cy="2.5" r="1"/><circle cx="8" cy="2.5" r="1"/><circle cx="4" cy="6" r="1"/><circle cx="8" cy="6" r="1"/><circle cx="4" cy="9.5" r="1"/><circle cx="8" cy="9.5" r="1"/></g></svg>
<svg class="sg-icon sg-tone-wait" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1 11 6 6 11 1 6Z" fill="currentColor"/></svg>
<svg class="sg-icon sg-tone-done" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.2 6.4 4.8 9 9.8 3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
<svg class="sg-icon sg-tone-err" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 3l6 6M9 3 3 9" stroke="currentColor" stroke-width="1.5"/></svg>
<svg class="sg-icon sg-tone-idle" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="3.6" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
```

## Anatomy

- `.sg-icon` is `sg-size-icon-sm` square, set 1px below the baseline.
- `.sg-tone-run` uses `sg-status-run-fg`, `-wait` uses `sg-status-wait-fg`, `-done` uses `sg-status-done-fg`, `-err` uses `sg-status-err-fg`, and `-idle` uses `sg-status-idle-fg`. `.sg-tone-you` uses `sg-accent-fg` for the owner's own marks.
- Every tone clears 3:1 on every surface in both themes.

## Do and don't

- Do let a coloured parent set the colour instead of a tone class (`.sg-status-item--wait`).
- The running glyph is static (⠿). Hangar's animated braille spinner is not built.
- Don't draw new decorative icons.
