# Product

Draft from the code — owner to confirm.

## Users

The owner and the apps they build (Overview first, then Hangar) when they need
UI that looks and behaves the same across products.

## Purpose

One token source and a small set of plain-CSS components for a calm instrument
panel: grey chrome, one loud colour for "needs you", every fact visible before
you act. Consumers import the CSS or the tokens JSON.

## Not

No framework, no JavaScript runtime, no dependencies. No per-app styling in the
core: app-specific tokens live in extensions.

## Platform

Browsers. Published as the npm package `@barrymind/signal`; built with Node.
