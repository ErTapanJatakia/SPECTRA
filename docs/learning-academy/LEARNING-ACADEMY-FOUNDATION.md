# Learning Academy — Foundation Release

## Status
Prompt 05 is in progress. This document describes the first vertical slice and the guardrails for subsequent work.

## Initial pathways
1. Responsible Defence Technology Literacy — non-operational scope, source provenance and confidence.
2. Equipment Records & Classification — identity, origin, development, manufacture, operation and status semantics.
3. Peacekeeping Foundations — introductory principles, mandate awareness and professional conduct.

## Lesson and assessment model
- Pathways contain lessons; lessons contain objectives, reading sections and multiple-choice questions.
- Questions have stable IDs, options, a correct option ID and an explanatory rationale.
- A lesson attempt is scored as a percentage.
- A score of 70% or higher marks the lesson complete.
- The best score and attempt count are retained; a later lower score does not revoke completion.
- Assessment results are formative learning feedback, not credentials or qualifications.

## Privacy and persistence
- Progress is stored in the browser under `spectra.learning-progress.v1`.
- Storage is versioned and parsed defensively; malformed or unsupported state falls back to an empty progress record.
- No account, backend, network request, analytics, telemetry or cross-device sync is introduced.
- Browser local storage is not encrypted; anyone with access to the same browser profile may be able to inspect or clear the progress record. Do not store sensitive personal information in this feature.
- Learners can reset local progress.
- Browser storage may be cleared by the user, browser policy or private-session lifecycle; persistence is best-effort.

## Accessibility and usability
- Use semantic headings, fieldsets, legends, labelled radio controls and status announcements.
- All pathway, lesson and assessment interactions must be keyboard-operable.
- Progress must be communicated in text as well as a visual bar.
- Avoid time limits and do not penalise learners for revisiting lessons.
- Keep the layout responsive and respect the existing reduced-motion and theme system.

## Editorial and safety guardrails
- Educational material must be attributed and periodically reviewed.
- Distinguish source types and source authority by claim.
- Mark uncertain or disputed claims rather than inventing certainty.
- No procedural weapon-use instruction, targeting or firing calculations, tactical attack guidance, weapon modification, ammunition construction or offensive cyber instructions.
- Peacekeeping content is introductory and must not be represented as official UN training or as a substitute for mission-specific authorised instruction.
- External text and media are linked by default; third-party rights remain separate from the SPECTRA repository licence.

## Deferred work
- Larger, reviewed curriculum and lesson authoring workflow.
- Additional assessment formats and question-bank governance.
- Claim-level source references across all pathways. The peacekeeping principles lesson links to official UN Peacekeeping material for principles, mandate context and standards of conduct; source scope and access date are recorded in lesson metadata.
- Offline course packages, broader asset coverage and cache lifecycle/version-transition validation. The current production application-shell cache and an offline Academy assessment flow are covered by Playwright CI.
- Learner export/import with explicit user control, if justified.
- Further accessibility review, including real screen-reader testing and measured colour-contrast checks.
- No certification, identity management, remote learner tracking or paid services are planned for this foundation stage.
