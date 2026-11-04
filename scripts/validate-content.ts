import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  categorySchema,
  countrySchema,
  domainTaxonomySchema,
  equipmentSchema,
  functionSchema,
  manufacturerSchema,
  organisationSchema,
  sourceSchema
} from "../src/schemas/content.ts";

type UnknownRecord = Record<string, unknown>;

async function readJson<T extends object>(relativePath: string, parser: { parse: (value: unknown) => T }): Promise<T[]> {
  const raw = await readFile(resolve(process.cwd(), relativePath), "utf8");
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error(`${relativePath} must contain a JSON array.`);
  return parsed.map((record, index) => {
    try {
      return parser.parse(record);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(`${relativePath}[${index}]: ${detail}`, { cause: error });
    }
  });
}

function uniqueIds(records: UnknownRecord[], label: string): Set<string> {
  const ids = records.map((record) => String(record.id));
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) throw new Error(`${label} has duplicate identifiers: ${[...new Set(duplicates)].join(", ")}`);
  return new Set(ids);
}

function requireReferences(owner: string, references: string[], validIds: Set<string>, label: string): void {
  for (const reference of references) {
    if (!validIds.has(reference)) throw new Error(`${owner} references unknown ${label} "${reference}".`);
  }
}

async function main(): Promise<void> {
  const [sourceRows, countryRows, organisationRows, manufacturerRows, domainRows, categoryRows, functionRows, equipmentRows] = await Promise.all([
    readJson("content/sources/sources.json", sourceSchema),
    readJson("content/geography/countries.json", countrySchema),
    readJson("content/organisations/organisations.json", organisationSchema),
    readJson("content/manufacturers/manufacturers.json", manufacturerSchema),
    readJson("content/taxonomy/domains.json", domainTaxonomySchema),
    readJson("content/taxonomy/categories.json", categorySchema),
    readJson("content/taxonomy/functions.json", functionSchema),
    readJson("content/equipment/equipment.json", equipmentSchema)
  ]);

  const sources = sourceRows as unknown as UnknownRecord[];
  const countries = countryRows as unknown as UnknownRecord[];
  const organisations = organisationRows as unknown as UnknownRecord[];
  const manufacturers = manufacturerRows as unknown as UnknownRecord[];
  const domains = domainRows as unknown as UnknownRecord[];
  const categories = categoryRows as unknown as UnknownRecord[];
  const functions = functionRows as unknown as UnknownRecord[];
  const equipment = equipmentRows as unknown as UnknownRecord[];

  const sourceIds = uniqueIds(sources, "Sources");
  const countryIds = uniqueIds(countries, "Countries");
  uniqueIds(countries.map((record) => ({ id: record.isoAlpha3 })), "ISO alpha-3 country codes");
  const organisationIds = uniqueIds(organisations, "Organisations");
  const manufacturerIds = uniqueIds(manufacturers, "Manufacturers");
  const domainIds = uniqueIds(domains, "Domains");
  const categoryIds = uniqueIds(categories, "Categories");
  const functionIds = uniqueIds(functions, "Functions");
  const categoryById = new Map(categories.map((record) => [String(record.id), record]));

  uniqueIds(equipment, "Equipment identifiers");
  uniqueIds(equipment.map((record) => ({ id: record.slug })), "Equipment slugs");

  for (const record of countries) requireReferences(String(record.id), record.sourceIds as string[], sourceIds, "source");
  for (const record of organisations) {
    requireReferences(String(record.id), [String(record.countryId)], countryIds, "country");
    requireReferences(String(record.id), record.sourceIds as string[], sourceIds, "source");
  }
  for (const record of manufacturers) {
    requireReferences(String(record.id), record.countryIds as string[], countryIds, "country");
    requireReferences(String(record.id), record.sourceIds as string[], sourceIds, "source");
  }
  for (const record of categories) requireReferences(String(record.id), [String(record.domainId)], domainIds, "domain");

  for (const record of equipment) {
    const owner = String(record.id);
    const classification = record.classification as UnknownRecord;
    const editorial = record.editorial as UnknownRecord;
    const sourceRefs = record.sourceIds as string[];
    requireReferences(owner, record.originCountryIds as string[], countryIds, "origin country");
    requireReferences(owner, record.developmentCountryIds as string[], countryIds, "development country");
    requireReferences(owner, record.operatorOrganisationIds as string[], organisationIds, "operator organisation");
    requireReferences(owner, record.developerOrganisationIds as string[], organisationIds, "developer organisation");
    requireReferences(owner, record.manufacturerIds as string[], manufacturerIds, "manufacturer");
    requireReferences(owner, sourceRefs, sourceIds, "source");
    requireReferences(owner, classification.domainIds as string[], domainIds, "domain");
    requireReferences(owner, [String(classification.categoryId)], categoryIds, "category");
    requireReferences(owner, classification.functionIds as string[], functionIds, "function");

    const category = categoryById.get(String(classification.categoryId));
    if (category && !(classification.domainIds as string[]).includes(String(category.domainId))) {
      throw new Error(`${owner} category domain must also be present in classification.domainIds.`);
    }
    const citedPrimarySource = sources.some((source) => sourceRefs.includes(String(source.id)) && source.reliability === "primary");
    if (editorial.status === "published" && !citedPrimarySource) {
      throw new Error(`${owner} must cite at least one primary source before publication.`);
    }
    if (editorial.status === "published" && editorial.confidence === "disputed") {
      throw new Error(`${owner} cannot be published with disputed record-level confidence.`);
    }
  }

  const published = equipment.filter((record) => (record.editorial as UnknownRecord).status === "published").length;
  console.log("SPECTRA content validation passed.");
  console.log(`Countries: ${countries.length}; Organisations: ${organisations.length}; Manufacturers: ${manufacturers.length}`);
  console.log(`Domains: ${domains.length}; Categories: ${categories.length}; Functions: ${functions.length}`);
  console.log(`Sources: ${sources.length}; Equipment records: ${equipment.length}; Published: ${published}`);
}

main().catch((error: unknown) => {
  console.error("SPECTRA content validation failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
