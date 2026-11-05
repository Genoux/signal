# SectionHead

An uppercase 11px mono list head that always carries the list's count ("needs you · 2").

## When to use

- At the head of every list group in the rail, in attention order: needs you, failed, running, done, then asleep.

## What you provide

- A `<div class="sg-section-head">` holding a `<span>` with the group's word and its count, joined by a middle dot.
- Optionally a second child, which sits on the right and keeps its own case.

## Anatomy

- Type `section` (11px mono, uppercase, +0.06em via `--sg-type-section-tracking`). Colour `sg-text-subtle`.
- Margin `sg-space-16` `sg-space-4` `sg-space-8`. A last child that is not also the first drops the uppercase and tracking.

## Do and don't

- Do always show the count, even when it is 1.
- Don't colour a section head by its status; the rows' glyphs carry the colour.
