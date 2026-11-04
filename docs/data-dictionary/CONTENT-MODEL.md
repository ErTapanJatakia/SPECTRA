# SPECTRA Content Model — v1.0

## Purpose

The SPECTRA knowledge base is a version-controlled, source-attributed reference dataset. It is designed for educational identification, historical context and broad technical literacy. It is not an operational inventory, targeting database, maintenance manual or weapons-use guide.

## Canonical identifiers

- Country records use ISO 3166-1 alpha-2 as their primary identifier and retain alpha-3 as a secondary code.
- Domain, category, function, organisation, manufacturer, source and equipment identifiers are stable lowercase kebab-case strings.
- Equipment identifiers and slugs are unique. Names and aliases are mutable display/search attributes, not identifiers.

ISO country codes are identifiers only. They do not independently establish sovereignty, current military ownership, operator status or territorial claims.

## Entities

| Entity | Canonical file | Key relationships |
|---|---|---|
| Country | `content/geography/countries.json` | ISO alpha-2/alpha-3; sources |
| Domain | `content/taxonomy/domains.json` | Parent knowledge division |
| Category | `content/taxonomy/categories.json` | One primary domain |
| Function | `content/taxonomy/functions.json` | High-level educational function |
| Organisation | `content/organisations/organisations.json` | Country; branch; sources |
| Manufacturer | `content/manufacturers/manufacturers.json` | Country/countries; role; sources |
| Source | `content/sources/sources.json` | Publisher; date; source type; reuse status |
| Equipment | `content/equipment/equipment.json` | Countries; domains; category; functions; organisations; manufacturers; sources |

## Equipment record contract

Every equipment record contains:

- Stable ID, slug, primary name, aliases and designation.
- One or more taxonomy domains, one primary category, general function tags and platform type.
- Separate origin-country and development-country relationships.
- Separate operator-organisation, manufacturer and developer-organisation relationships.
- A broad development-period statement and carefully qualified public status.
- Independently authored overview, historical context and design context.
- General, non-operational educational characteristics.
- One or more source references.
- Editorial status, confidence, last-verification date and review note.

An absent relationship is not inferred. An unknown manufacturer or operator is left unassigned rather than guessed.

## Relationship semantics

- **Origin country:** country associated with the system's origin/design programme as documented by the cited record.
- **Development country:** countries associated with the documented development programme.
- **Operator organisation:** organisation explicitly supported by the sources as an operator or service context.
- **Manufacturer:** documented production/build organisation.
- **Developer organisation:** research or programme organisation responsible for development.
- **Historical builder:** preserved where a source documents an earlier industrial attribution; it must not be silently presented as the current corporate structure.

Relationships can become date-sensitive as platforms change hands, programmes are reorganised or equipment is retired. Add effective dates and additional evidence when such a history is introduced.

## Source contract

Every source record stores title, publisher, source type, reliability classification, HTTPS URL, access date, optional publication date and reuse/licensing status.

Source content is linked rather than copied by default. A public web page or downloadable document is not automatically reusable media or text.

## Validation

The `npm run validate:content` script checks:

- Zod schema validity for every record.
- Unique identifiers and country alpha-3 codes.
- Country, organisation, manufacturer, domain, category, function and source references.
- Equipment category/domain consistency.
- At least one primary source for every published equipment record.
- No record-level `disputed` confidence marked as `published`.

The validator is part of the production build and `check:all` pipeline. Do not publish a record by bypassing the validator.

## Sample dataset boundary

The first curated sample contains five countries and ten equipment records. It demonstrates the data architecture; it is not exhaustive, a complete national inventory or a comparative ranking of armed forces.
