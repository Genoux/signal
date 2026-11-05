# MapLabel

An 18px label drawn over content on the label scrim, with the name in ink and the sub-text in subtle. Machine labels add a border and a count badge; a dragged plate label gets an accent border.

## When to use

- For names drawn over the map: machines (`--machine`) and project plates (`--plot`).
- Labels are placed in priority order: callouts first, machine labels second, plot labels last. A plot label degrades from "name · n agents · coord" to "name coord" to "name", and hides rather than overlap.

## What you provide

- A `<span class="sg-map-label">` with the name in `<b>` (or `.sg-map-label__name`), then the sub-text.
- `--machine` for a machine label. Add a `.sg-badge` when sessions wait.
- `--plot` for a plate label, with the plate's coordinate (`02·08`). It is also the plate's drag handle; add `.is-dragging` while it is dragged.
- Positioning is the app's job.

## Anatomy

- Height `sg-size-map-label`. Side padding 5px (`sg-space-4` + hairline). Gap `sg-space-6`. Radius `sg-radius-sm`.
- Type `map-label` at `sg-font-weight-regular`, in `sg-text-subtle`. The name is `sg-font-weight-medium` in `sg-text-primary`.
- Backing `sg-overlay-label`. `sg-text-subtle` on it measures 6.3:1 over the Signal map ground and 5.1:1 over `sg-surface-sunken` in Fog.
- **Machine:** a `sg-border-default` edge. **Plot:** `meta` size, with a `sg-border-default` edge on hover. **Dragging:** a `sg-border-focus` edge.

## Do and don't

- Do zero-pad coordinates.
- Overview has no Fog map, so in Fog this preview sits on `sg-surface-sunken` instead of `sg-overview-ground`.
