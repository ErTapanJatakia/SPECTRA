# SPECTRA Editorial Standards & Research Review

## 1. Purpose and relationship to existing governance

This document defines the practical research and review method for preparing factual, educational SPECTRA content. It supplements [Record Publication & Editorial Governance](RECORD-GOVERNANCE.md) and the [Content Model](../data-dictionary/CONTENT-MODEL.md); it does not replace their publication states, confidence vocabulary, data contracts, validation rules or safety boundaries.

These standards apply to equipment and organisation profiles, country and institutional summaries, learning material, research notes, captions, comparison tables and other factual editorial content. Apply the parts relevant to the content type and record any material exception for review.

This is an editorial policy, not a claim that every control is automated or that the current application already supports claim-level citations.

## 2. Claim-first research

Research and review should be performed at the level of material factual claims, not merely by attaching a list of sources to an entire page.

A material claim is a statement that could affect a reader's understanding of identity, origin, development, ownership, operator relationship, chronology, status, capability, legal context or a comparison. Descriptive transitions and clearly signposted editorial framing may not need separate evidence, but must not introduce new factual assertions.

For each material claim, the editorial working record should capture:

- **Claim:** the exact proposition being made, in plain language.
- **Location:** the record, section, field or lesson where it appears.
- **Evidence:** one or more source IDs and the precise page, section, paragraph, table or other locator where practical.
- **Support assessment:** supports, partly supports, contextual only, contradicts, or does not address the claim.
- **Temporal scope:** the date or period to which the claim applies, especially for current status and organisational relationships.
- **Qualification:** limitations, uncertainty, disputed interpretation or relevant scope conditions.
- **Reviewer note:** any unresolved issue and the disposition taken.

A source list at page level does not by itself demonstrate that each material claim is supported. Do not imply that a source supports a statement when it only discusses the same subject generally.

## 3. Selecting and evaluating sources

Use the source hierarchy in Record Governance as a starting point, not as an automatic ranking for every claim. Assess each source for:

1. **Authority:** whether the publisher is competent and accountable for this particular subject.
2. **Proximity:** whether the source is an original record, direct statement, technical publication, independent analysis or secondary retelling.
3. **Specificity:** whether it directly supports the exact claim and level of detail used.
4. **Currency:** whether its publication or update date is suitable for a time-sensitive statement.
5. **Transparency:** whether authorship, methodology, evidence and limitations can be assessed.
6. **Independence:** whether apparently separate sources rely on the same underlying announcement or dataset.
7. **Integrity:** whether the source is accessible and sufficiently complete to verify the relevant passage.

A source can be authoritative for one claim and unsuitable for another. For example, a manufacturer may be a primary source for its product name or its own published brochure, but its promotional comparison is not independent proof of superiority over competitors. An official operator page may establish that an organisation publicly lists a platform; it does not necessarily establish fleet-wide availability, readiness or present operational use.

Prefer original publications over summaries that merely repeat them. Use independent corroboration when the claim is consequential, contested, comparative or not adequately established by a single source. Do not count syndicated copies or derivative reporting as independent corroboration.

If a source is inaccessible, incomplete, undated or available only through an unverified quotation, do not silently treat it as checked. Seek an accessible authoritative alternative or qualify, omit, or defer the claim.

## 4. Evidence, attribution and citations

- Assign and reuse stable source IDs in accordance with the Content Model.
- Link the claim to the source that actually supports it; avoid attaching a broad source list without explaining relevance.
- Record publisher, title, source type, URL, access date, known publication/update date and reuse status accurately.
- Include a page, section, paragraph, table or timestamp locator in editorial notes where this materially helps another reviewer reproduce the check.
- Distinguish a source's own statement from SPECTRA's interpretation or synthesis.
- Attribute quotations, paraphrases, figures, tables, maps, photographs, diagrams and model assets in accordance with their applicable terms.
- Do not fabricate publication dates, page numbers, source authors, archive captures, identifiers or access details.
- If a source URL redirects, changes, becomes unavailable or no longer supports the claim, re-evaluate the evidence rather than assuming the new destination is equivalent.
- A citation is evidence of provenance, not a guarantee that a claim is correct, current or independently verified.

For material claims derived from multiple sources, retain the evidence-to-claim relationship in the editorial review record. Where the current content schema cannot represent claim-level evidence directly, maintain it in the review notes or a controlled editorial working record. Do not introduce unapproved schema fields or imply that the runtime validator enforces this policy.

## 5. Confidence, uncertainty and conflicting evidence

Use the confidence terms defined in Record Governance consistently. Apply them to the strength of the evidence for the proposition actually stated; do not use them as a measure of editorial polish or source prestige.

- **Verified:** a suitable primary source directly supports the specific claim, within the stated scope and date. This label does not mean independently confirmed or permanently true.
- **Corroborated:** multiple credible and sufficiently independent sources support the claim.
- **Estimated:** the information is approximate, inferred or incomplete; state the basis and limitation plainly.
- **Disputed:** credible evidence materially conflicts or a significant interpretation remains unresolved.

When sources conflict:

1. Check whether they refer to different dates, variants, organisations, definitions or geographic scopes.
2. Compare the sources' authority, proximity, specificity, methods and publication dates.
3. Determine whether the apparent disagreement can be resolved by narrowing or dating the claim.
4. If it cannot, qualify the disagreement or omit the claim; do not select the preferred answer without recording why.
5. Do not publish a record-level disputed confidence where the validator prohibits it. Individual unresolved claims must be omitted or clearly qualified as required by Record Governance.

When evidence is absent, preserve the distinction between **unknown**, **not stated by the source**, **not independently verified**, and **not applicable**. Do not convert missing data into a negative fact or infer a relationship from geography, naming, common ownership, visual similarity or association alone.

## 6. Time-sensitive claims and change control

Treat service status, operator relationships, organisational structure, procurement, delivery, production, programme milestones, specifications and current policy as time-sensitive unless the statement is explicitly historical.

- State the relevant date or period when it changes the meaning of the claim.
- Distinguish announcement, contract, order, delivery, acceptance, initial operating capability and full deployment; they are not interchangeable.
- Distinguish a platform's historical operator from a current operator, and a manufacturer from a developer, programme office or historical builder.
- Do not generalise a change affecting one unit, service branch or force element to an entire country or fleet.
- Preserve historical claims as historical claims; do not rewrite them as current status.
- Recheck affected claims when a cited source is updated, a material event occurs, a relationship changes or a source becomes unavailable.

A review date records when SPECTRA last checked the relevant evidence. It does not certify that the source itself is current or that every claim on a page was revalidated unless the review scope says so.

For substantive corrections, update the source/evidence notes and review date, and preserve a concise explanation of what changed and why in the project's available change history. If evidence no longer supports a published claim, correct it promptly or mark the affected content stale, withdraw it or remove it from publication pending review.

## 7. Editorial review and separation of checks

The publication workflow remains the one defined in Record Governance. Reviewers should consider the following distinct questions:

- **Research review:** Are identity, chronology, relationships and material factual claims traceable to appropriate evidence? Are uncertainty and conflicting sources handled honestly?
- **Safety review:** Is the content within SPECTRA's non-operational educational boundaries? Does its combination, level of detail or presentation create an unsafe instructional use?
- **Rights review:** Are all included and reused materials owned, authorised or used under a documented applicable permission? Are attribution and licence obligations met?
- **Final editorial review:** Is the language precise, neutral, understandable, appropriately qualified and consistent with SPECTRA's independent educational purpose?

Where practical, the person who authored a material claim should not be its only reviewer. If staffing requires the same person to perform multiple checks, record that limitation and perform a deliberate second-pass review. A review label must reflect work actually completed; it is not a ceremonial approval.

## 8. Copyright, licensing and third-party material

Apply the rights principles in Record Governance and the repository licence:

- Public accessibility, government publication, search indexing, linking or possession of a copy does not automatically grant republication rights.
- Prefer original SPECTRA-authored summaries and links to source material.
- Assess text, photographs, diagrams, maps, datasets, software, fonts, logos, video and 3D models separately; permission for one component does not establish rights in another.
- Record the rights holder where known, licence or permission basis, required attribution, restrictions, version/source and any relevant expiry or territory conditions.
- Verify that a licence permits the intended use, modification, display, distribution and hosting context; do not assume that attribution alone is sufficient.
- If rights are unclear or incompatible with the intended use, link rather than reproduce where appropriate, replace the asset, seek permission, or omit it.
- Do not present third-party material as original SPECTRA work or imply endorsement by a source publisher, government, military, manufacturer or institution.

The SPECTRA proprietary repository licence governs only materials the Owner owns or is authorised to license. It does not relicense third-party materials or override their terms.

## 9. Pre-publication editorial checklist

Before a factual record or learning item is approved for publication, the reviewer should be able to answer:

- [ ] Is the subject correctly identified, and are names, designations and aliases supported?
- [ ] Is every material factual claim linked to evidence that directly supports it?
- [ ] Are source authority, specificity, independence and currency suitable for each claim?
- [ ] Are dates, status, operators, developers and manufacturers correctly distinguished and qualified?
- [ ] Are uncertainty, missing information and material source conflicts disclosed or excluded?
- [ ] Are quotations, paraphrases, figures and visual assets attributed and within documented rights?
- [ ] Has the content passed the applicable safety review and remained within SPECTRA's educational boundaries?
- [ ] Are wording, comparisons and conclusions neutral, proportionate and free from unsupported superlatives?
- [ ] Are source IDs, access dates, confidence, review status and last-verification metadata accurate?
- [ ] Is there a clear correction or follow-up action for any unresolved material issue?

A failed or unanswered material check is a reason to revise, qualify, defer or reject the item—not to waive the check merely to meet a release date.

## 10. Implementation boundary and future work

This document establishes editorial expectations only. It does not add a claim-level citation interface, editorial workflow engine, reviewer identity system, audit database, content schema fields or automated rights verification. Those capabilities require separate architecture, privacy, security and acceptance decisions.

Any future implementation should begin with a documented data-model proposal and migration/compatibility plan. Editorial policy must not be represented as automated enforcement until corresponding controls and tests exist.

---

*Editorial policy version: 1.0 — introduced as Stage 07A documentation.*
