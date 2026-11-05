# SPECTRA Application Foundation

## Scope

Prompt 02 established the application shell, responsive navigation, design tokens, theme preferences, module entry points, a division-only search, PWA application-shell caching, browser security headers and CI quality tooling.

Prompt 03 adds the canonical content model, typed Zod schemas, an initial curated equipment dataset, country directory, equipment profile pages, multidimensional filtering, comparison and publication validation. See `docs/data-dictionary/CONTENT-MODEL.md` and `docs/editorial/RECORD-GOVERNANCE.md`.

## Current functionality

- React + TypeScript + Vite application shell.
- Responsive sidebar and top navigation.
- System, light, dark and high-contrast theme modes.
- Ten knowledge-division entry points.
- Search across knowledge divisions and the curated equipment sample.
- Five ISO-coded country profiles.
- Ten source-attributed equipment records across five countries.
- Country, domain, category, operator-branch and public-status filters.
- Equipment detail pages with source links and editorial confidence.
- Side-by-side comparison of up to three records.
- Zod schema validation and cross-reference checks for content records.
- Static application manifest and same-origin service worker.
- Unit and browser test suites.\n- Initial Learning Academy pathways, lessons, knowledge checks and browser-local progress (Prompt 05 foundation).
- GitHub Actions quality and lockfile workflows.

## Explicitly not implemented

The current knowledge base is a curated sample, not an exhaustive world inventory. It does not include a global operator database, complete armed-forces directory, live external data feeds, 3D rendering, model ingestion, course content, account authentication, remote learner synchronisation, or official UN training material.

## Tooling compatibility decision

TypeScript 6.0.3 is pinned for this bootstrap. The selected typescript-eslint support line is not declared compatible with TypeScript 7. Reassess after the lint/parser ecosystem officially supports TypeScript 7.

## Operational model

The application is static-first. Learner preferences are local; progress is not synchronised to a server. Content is version-controlled. The service worker caches the application shell and same-origin static assets; it does not cache third-party source material.

## Security and editorial notes

- No API keys, secrets or credentials are required.
- No third-party analytics or remote script dependency is introduced.
- Public sources are linked; their text, diagrams and images are not assumed to be reusable.
- Equipment profiles are limited to non-operational educational content.
- The SPECTRA proprietary licence does not override GitHub platform terms or third-party asset licences.
