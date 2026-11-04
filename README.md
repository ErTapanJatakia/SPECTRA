
<div align="center">

# S P E C T R A

### SYSTEMS, PLATFORMS, EQUIPMENT, CAPABILITIES, TECHNOLOGY & READINESS ATLAS

**GLOBAL DEFENCE SYSTEMS & PEACE OPERATIONS LEARNING ATLAS**

*Understand the systems. Explore the technology. Prepare responsibly.*

[Repository](https://github.com/ErTapanJatakia/SPECTRA) ·
[Project Owner](https://github.com/ErTapanJatakia) ·
[Proprietary Licence](LICENSE)

</div>

<img width="1672" height="941" alt="SPECTRA Defence Training Briefing" src="https://github.com/user-attachments/assets/4c89a4be-625b-41c4-8f60-8585b9a86d3f" />


---

## About SPECTRA

SPECTRA is an independent international educational and research initiative envisioned as a structured, visual knowledge platform for military systems, defence technologies, protective equipment, surveillance, communications, unmanned platforms, and peace operations.

The project is intended to help security professionals, defence-sector personnel, researchers, universities, and prospective peacekeeping personnel build foundational understanding through well-sourced reference material, clear technical explanations, visual learning, and structured knowledge assessments.

SPECTRA is being designed as a **supplementary learning and familiarisation resource**. It is not an operational military system, a weapons proficiency programme, or a replacement for authorised professional, national, or United Nations training.

> **Project stage:** Project Charter (Prompt 00), Architecture & Product Blueprint (Prompt 01), Repository Bootstrap & Design System (Prompt 02), the initial Military Systems Knowledge Base (Prompt 03), and the Interactive 3D Studio (Prompt 04) are implemented. The current catalogue remains a curated starter sample; the Learning Academy and peacekeeping curriculum remain planned for their dedicated stages.

## Mission

Make complex defence technology and military systems easier to understand through responsible, accessible, source-attributed education—while reinforcing safety, legal awareness, professional judgement, and respect for international humanitarian principles.

## Intended audiences

- Private security professionals and organisations.
- Defence and military contractors and companies.
- Military, police, and other authorised personnel seeking supplementary knowledge.
- Prospective United Nations peacekeeping personnel.
- Universities, academic departments, and independent researchers.
- Defence technology, intelligence, and cybersecurity professionals.

## Knowledge domains

SPECTRA's proposed information architecture is organised into ten connected divisions:

| Division | Coverage |
|---|---|
| **01 — Infantry & Small Arms Systems** | Equipment identification, historical context, general characteristics, protective equipment, and safety awareness. |
| **02 — Land Systems** | Armoured vehicles, artillery classifications, military engineering, mobility, and logistics systems. |
| **03 — Aerospace & Unmanned Systems** | Aircraft, helicopters, UAVs, drones, and other unmanned platforms. |
| **04 — Surveillance & Intelligence Systems** | Radar, sensors, reconnaissance technologies, imaging, and satellite observation. |
| **05 — Naval & Maritime Systems** | Naval platforms, maritime security, naval aviation, and maritime awareness technologies. |
| **06 — C4ISR & Electronic Systems** | Command systems, communications, navigation, interoperability, and high-level electronic-warfare concepts. |
| **07 — Cyber & Digital Defence** | Defensive cybersecurity, military network protection, digital resilience, and cyber threat intelligence. |
| **08 — UN Peacekeeping Education** | Mission familiarisation, protection of civilians, safety, legal and ethical awareness, and weapons-and-ammunition-management awareness. |
| **09 — Learning Academy** | Structured learning paths, lessons, knowledge checks, and educational progress. |
| **10 — Research & Emerging Technology** | Historical developments, robotics, autonomy, artificial intelligence, and defence technology research. |

The taxonomy is intended to support multiple discovery paths, including country, military branch, equipment category, manufacturer, platform, function, historical era, and publicly documented operational status.

## Curated knowledge-base sample

The first knowledge-base release contains **five country profiles and eleven source-attributed equipment records** spanning India, the United States, the United Kingdom, France and Japan. The sample demonstrates multidimensional classification across land, aerospace and naval systems; it is not an exhaustive national inventory or a ranking of military capability.

Country records use ISO 3166-1 alpha-2 and alpha-3 identifiers. Equipment records keep origin, development, operator, manufacturer and developer relationships separate. A missing relationship is not inferred.

The starter collection includes examples such as the Arjun MBT Mk IA, LCA Tejas, M4A1 Carbine, M1 Abrams, DDG 51 Arleigh Burke class, Challenger 2, Type 45 Daring class, Leclerc, CAESAR, Mogami class and Type 10. The M4A1 entry notes the U.S. Army's 2026 XM8 transition context and does not imply universal current service status. Their profiles are limited to identification, historical context, broad platform classification and general educational characteristics.

### Catalogue functionality

- Search by name, alias, designation and summary.
- Filter by country, domain, equipment category, operator branch and public status.
- Open detailed profiles with source links and verification metadata.
- Compare up to three records using high-level educational attributes.
- Browse country profiles and equipment associated with their documented origin or development.

### Research and editorial integrity

Every published equipment record cites at least one primary source. Source records include publisher, type, access date and reuse status. All initial external material is linked rather than republished. Where a manufacturer, operator or service status is not supported by the cited record, the field is left unassigned or marked unconfirmed.

The canonical data model, schemas and publication checks are documented in [Content Model](docs/data-dictionary/CONTENT-MODEL.md) and [Record Governance](docs/editorial/RECORD-GOVERNANCE.md). Content is validated with Zod and a cross-reference validator during the production build.



## Planned learning experience

The product blueprint anticipates:

- Searchable, source-attributed equipment and technology profiles.
- Country-wise and service-wise discovery.
- Historical context and publicly documented general technical characteristics.
- Cross-domain comparison and classification.
- Interactive 3D educational visualisations, where suitable and properly licensed assets are available.
- Annotated external-feature identification and non-operational visual learning.
- Structured lessons, knowledge checks, and scenario-based legal and ethical assessments.
- Local-first learner preferences and selected offline learning material.
- A responsive interface for desktop, tablet, and mobile devices.
- Internationalisation readiness, with English as the initial interface language.

All such capabilities remain planned until implemented, tested, and documented in the repository.

## Interactive 3D learning

The SPECTRA 3D Studio now provides browser-based educational viewing of original demonstration geometry and user-selected GLB/glTF 2.0 models. Interactions include model orbit, zoom, pan, camera reset, lighting controls, and labelled educational annotations. Imported assets are limited to 25 MB, checked for basic glTF structure and scene-size limits, and blocked from loading external buffer or image resources. Model files are handled locally in the browser and are not uploaded to SPECTRA. Provenance and licence notes are session metadata only; they do not independently verify rights. Only use assets you are authorised to view and process.

The 3D experience is intended for identification and visual literacy. It will not provide procedural firearm assembly or disassembly, operational weapon-use instructions, firing solutions, targeting calculations, or weapon modification guidance.

Textual and illustrated alternatives will remain available so that essential learning does not depend on 3D hardware or interaction.

## Peacekeeping and professional education

SPECTRA intends to map relevant learning areas to publicly available, authoritative peacekeeping resources where appropriate. Potential reference areas include:

- Peacekeeping principles and mandate awareness.
- Protection of civilians and human rights.
- Conduct, discipline, and professional responsibility.
- Personal safety and mission-environment familiarisation.
- Weapons and Ammunition Management (WAM) awareness.
- International Humanitarian Law and relevant legal frameworks.
- Communications, equipment awareness, and interoperability.

Official resources will be attributed and linked in accordance with their applicable terms. Public availability does not automatically grant permission to republish a document or reproduce its content.

**SPECTRA is independent and is not affiliated with, endorsed by, or certified by the United Nations, any national armed force, government, defence organisation, or equipment manufacturer.** It cannot replace official training, national pre-deployment requirements, mission-specific instruction, or authorised qualifications.

## Responsible-content boundaries

SPECTRA is designed for education, research, and professional familiarisation. Its editorial boundaries exclude:

- Step-by-step operational weapon-use instruction.
- Procedural firearm assembly or disassembly guidance.
- Firing, targeting, ballistic, or attack-planning calculations.
- Weapon construction, modification, or ammunition-manufacturing guidance.
- Tactical attack instructions or operational targeting support.
- Offensive cyber operations or instructions to compromise systems.

Content will be selected for legitimate educational value, reviewed for safety and legal considerations, and attributed to traceable sources. Public availability alone is not sufficient grounds for inclusion.

## Research quality and provenance

The planned knowledge base will distinguish primary documentation, manufacturer publications, standards, academic research, independent analysis, and supporting sources.

Published records are intended to include, where applicable:

- Source references and source type.
- Verification and revision dates.
- Country, manufacturer, and designation provenance.
- Confidence or uncertainty indicators.
- Editorial review status.
- Copyright, attribution, and asset-licensing notes.
- A record of substantive content changes.

Estimated, disputed, or incompletely documented information should be identified as such rather than presented as established fact.

## Proposed technical direction

The architecture is expected to be free-first and static-first, subject to the formal architecture specification and approval.

| Layer | Proposed direction |
|---|---|
| Application | React + TypeScript |
| Build tooling | Vite |
| Styling | Tailwind CSS |
| 3D visualisation | Three.js |
| 3D asset format | glTF 2.0 / GLB |
| Structured content | Version-controlled JSON and typed schemas |
| Content validation | Zod schemas and cross-reference validator |
| Local persistence | IndexedDB |
| Offline support | Progressive Web App and Service Worker |
| Testing | Vitest and Playwright |
| Security baseline | OWASP ASVS |
| Accessibility target | WCAG 2.2 AA |
| Hosting | Free-tier static hosting, subject to provider limits and terms |

These are proposed architectural choices, not a statement that the application stack has already been implemented. The project aims to avoid mandatory paid APIs, subscriptions, and infrastructure. Hosting quotas, bandwidth, domain registration, and third-party asset licences may still impose constraints.

## Visual identity

The repository includes original concept illustrations prepared for SPECTRA:

![SPECTRA training and technology briefing concept](assets/branding/spectra-training.jpg)

*Concept imagery: illustrative, AI-generated visualisations created for project identity. They are not documentary photographs, verified depictions of actual exercises, or authoritative technical references.*

## Development roadmap

| Stage | Milestone | Current state |
|---|---|---|
| 00 | Project charter and governance | Charter established |
| 01 | Architecture and product blueprint | Completed |
| 02 | Repository foundation and design system | Implemented; CI passed |
| 03 | Military systems knowledge base | Implemented; five-country, eleven-record sample and validator committed |
| 04 | Interactive 3D Studio | Not started |
| 05 | Learning Academy | Not started |
| 06 | Peacekeeping education | Not started |
| 07 | Editorial and research framework | Not started |
| 08 | Advanced features and offline learning | Not started |
| 09 | Security, quality assurance, and release readiness | Not started |

The project will proceed through individually reviewed and approved development stages. No milestone should be treated as complete until its acceptance criteria have been met and the relevant work is committed.

## Security and accessibility principles

The planned engineering process will address secure development, dependency provenance, licensing, input validation, privacy minimisation, accessible navigation, keyboard operation, readable contrast, reduced motion, and alternatives to interactive 3D content.

Security and accessibility requirements will be refined in the architecture specification and verified during implementation and release testing.

## Intellectual property and licence

**SPECTRA is proprietary. All rights are reserved by the Owner, subject to rights that arise independently under the hosting platform's terms and applicable law.**

This repository is public for project visibility and development transparency; it is **not an open-source licence grant**. The custom SPECTRA Proprietary Rights-Reserved Licence in [LICENSE](LICENSE) applies only to materials the Owner owns or is authorised to license. It does not grant general permission to copy, modify, redistribute, commercialise, or create derivative works.

### Important public-repository notice

GitHub's Terms of Service independently govern public-repository access, including the platform's permissions for hosting and processing content and other users' ability to view and fork public repositories through GitHub functionality. A custom repository licence cannot override those platform terms. Review the [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) and [GitHub's repository licensing guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).

Third-party code, publications, datasets, images, models, fonts, trademarks, and other externally sourced materials remain subject to their own terms. Their presence in this repository must not be interpreted as a grant of rights.

Permission requests for materials owned by the project may be directed to the Owner through the [GitHub profile](https://github.com/ErTapanJatakia).

## Disclaimer

SPECTRA is an independent educational and research initiative. It is not a government publication, military directive, operational manual, legal opinion, weapons qualification, or accredited training course. Information may be incomplete, change over time, or vary by jurisdiction and service. Users remain responsible for complying with applicable laws, regulations, safety requirements, and authorised institutional procedures.

The project does not claim affiliation with or endorsement by the United Nations, NATO, any government, armed force, police service, manufacturer, or international organisation. Names and marks belonging to others remain the property of their respective owners.

---

<div align="center">

**SPECTRA**

*Building knowledge · Enhancing readiness · Supporting responsible learning*

[View the repository](https://github.com/ErTapanJatakia/SPECTRA)

</div>
<img width="2172" height="724" alt="Cinematic Military Technology Briefing at Dusk-1" src="https://github.com/user-attachments/assets/caa4e788-41dc-4c10-b5a9-2cf5946775d2" />
