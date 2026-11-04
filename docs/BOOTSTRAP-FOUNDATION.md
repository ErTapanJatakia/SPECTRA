# SPECTRA Application Foundation

## Scope

This document records the Prompt 02 foundation release. It establishes the application shell, responsive navigation, design tokens, theme preferences, module entry points, a navigation-domain search, PWA application-shell caching, and quality tooling.

## Current functionality

- React + TypeScript + Vite application shell.
- Responsive sidebar and top navigation.
- Working system, light, dark, and high-contrast theme modes.
- Ten knowledge-division entry points.
- Search across the ten navigation divisions only.
- Countries & Forces directory framework placeholder.
- Explicit placeholder pages for Catalogue, 3D Studio, Academy, Peacekeeping, Research and Settings.
- Static application manifest and a same-origin service worker.
- Initial unit and browser test suites.
- GitHub Actions quality and lockfile workflows.

## Explicitly not implemented

The foundation release does not include an equipment database, country records, live external datasets, 3D rendering, model ingestion, course content, account authentication, remote learner synchronisation, or official UN training material. Their entry points are labelled as not yet implemented.

## Tooling compatibility decision

TypeScript 6.0.3 is pinned for this bootstrap. The current typescript-eslint support matrix documents TypeScript support below 6.1. TypeScript 7.0.2 is available, but adopting it before the lint/parser ecosystem declares support would weaken reproducibility. Reassess this decision when typescript-eslint officially supports TypeScript 7.

## Operational model

The application is static-first. Learner progress and preferences are not synchronised to a server. The service worker caches the application shell and same-origin static assets; it does not cache third-party material. Deployment and browser testing must verify offline behaviour before any release claim is made.

## Security notes

- No API keys, secrets, or credentials are required.
- No third-party analytics or remote script dependency is introduced.
- The CSP is same-origin-oriented; review it when adding new assets, workers, embeds, or external resources.
- The public repository's proprietary licence does not override GitHub's platform terms or third-party asset licences.
