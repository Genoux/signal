# AGENTS.md

Why signal is built the way it is. The shared rules (git, commits, releases,
local-only demos) are in jb-toolkit's `RULES.md` and are not repeated here.

Read `PRODUCT.md` first.

## Stack

- Plain CSS custom properties generated from DTCG JSON tokens by a single Node
  script (`scripts/build.mjs`), no dependencies. Why: the consumers (Overview,
  Hangar) use different frameworks, so the system cannot depend on one.
- Node >= 18 (`engines`); CI uses the latest LTS.

## Layout

- `tokens/signal.tokens.json` — the single token source (DTCG).
- `tokens/extensions/` and `css/extensions/` — per-app extensions, tokens only.
- `css/signal.css`: the block between the `@sg-tokens` markers is generated, the base styles are hand-written. `css/components.css` holds the plain-CSS components.
- `scripts/build.mjs` — generates `css/signal.css` and the extension CSS; `--check` fails when generated files drift from the source.
- `index.html` — live reference of every token and component.
- `docs/reference/` — token reference and known gaps.
- `scripts/check` — runs `npm run check` (`node scripts/build.mjs --check`). CI runs exactly this.

## Decisions

- 2026-11-07: adopted jb-toolkit. `scripts/check` delegates to the existing
  `check` script, which verifies generated files match the tokens; there is no
  formatter, linter or test suite in the project yet.
