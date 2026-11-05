# Tag

A quiet hairline mono chip for a fixed fact about something, such as the `sample data` tag every prototype carries.

## When to use

- To mark something with a fixed property: `sample data`, `local`.
- Never for status. Status uses a glyph, its colour and a word.

## What you provide

- A `<span class="sg-tag">` holding a lowercase mono label.

## Anatomy

- Padding 1px `sg-space-6`. Type `meta`. Text `sg-text-subtle`.
- A `sg-border-subtle` hairline and radius `sg-radius-sm`. No fill.

## Do and don't

- Do keep it to one or two lowercase words.
- Don't tint it; a coloured tag would read as a status.
