import { z } from "zod";

const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a stable lowercase kebab-case identifier.");
const countryIdSchema = z.string().regex(/^[A-Z]{2}$/, "Country identifiers must use ISO 3166-1 alpha-2 format.");
const sourceIdSchema = idSchema;
const isoDateSchema = z.iso.date();

export const sourceSchema = z.object({
  id: idSchema,
  title: z.string().min(5).max(240),
  publisher: z.string().min(2).max(180),
  sourceType: z.enum(["government", "manufacturer", "standards_body", "academic", "research_institution", "un_institution"]),
  reliability: z.enum(["primary", "secondary", "supporting"]),
  url: z.url().refine((value) => value.startsWith("https://"), "Source links must use HTTPS."),
  publicationDate: isoDateSchema.optional(),
  accessDate: isoDateSchema,
  licensing: z.object({
    status: z.enum(["link_only", "permission_granted", "public_domain", "licensed", "undetermined"]),
    licenceName: z.string().max(160).optional(),
    attribution: z.string().max(500).optional(),
    note: z.string().max(600).optional()
  })
});

export const countrySchema = z.object({
  id: countryIdSchema,
  isoAlpha2: countryIdSchema,
  isoAlpha3: z.string().regex(/^[A-Z]{3}$/),
  name: z.string().min(2).max(120),
  aliases: z.array(z.string().min(1).max(100)),
  region: z.string().min(2).max(80),
  sourceIds: z.array(sourceIdSchema).min(1)
}).refine((record) => record.id === record.isoAlpha2, {
  message: "Country id must equal its ISO alpha-2 code.",
  path: ["id"]
});

export const organisationSchema = z.object({
  id: idSchema,
  name: z.string().min(2).max(180),
  countryId: countryIdSchema,
  branch: z.enum(["land", "air", "naval", "space", "joint", "research"]),
  organisationType: z.enum(["armed_force", "joint_command", "research_agency", "government_body", "peacekeeping_institution"]),
  sourceIds: z.array(sourceIdSchema).min(1)
});

export const manufacturerSchema = z.object({
  id: idSchema,
  name: z.string().min(2).max(180),
  countryIds: z.array(countryIdSchema).min(1),
  roles: z.array(z.enum(["manufacturer", "integrator", "shipbuilder", "historical_builder", "component_supplier", "developer"])).min(1),
  sourceIds: z.array(sourceIdSchema).min(1)
});

export const domainTaxonomySchema = z.object({
  id: idSchema,
  slug: idSchema,
  title: z.string().min(2).max(180)
});

export const categorySchema = z.object({
  id: idSchema,
  label: z.string().min(2).max(120),
  domainId: idSchema
});

export const functionSchema = z.object({
  id: idSchema,
  label: z.string().min(2).max(120)
});

export const equipmentSchema = z.object({
  id: idSchema,
  slug: idSchema,
  name: z.string().min(3).max(180),
  aliases: z.array(z.string().min(1).max(120)),
  designation: z.string().min(2).max(120),
  classification: z.object({
    domainIds: z.array(idSchema).min(1),
    categoryId: idSchema,
    functionIds: z.array(idSchema).min(1),
    platformTypes: z.array(z.enum(["tracked-land-vehicle", "wheeled-land-vehicle", "wheeled-artillery-vehicle", "fixed-wing-aircraft", "rotary-wing-aircraft", "unmanned-aircraft", "surface-combatant", "submarine", "sensor-system", "communications-system", "individual-small-arm"])).min(1)
  }),
  originCountryIds: z.array(countryIdSchema).min(1),
  developmentCountryIds: z.array(countryIdSchema),
  operatorOrganisationIds: z.array(idSchema),
  manufacturerIds: z.array(idSchema),
  developerOrganisationIds: z.array(idSchema),
  historical: z.object({
    developmentPeriod: z.string().max(180).optional(),
    operationalStatus: z.enum(["active", "retired", "developmental", "prototype", "unknown"])
  }),
  overview: z.string().min(40).max(1200),
  historicalBackground: z.string().min(30).max(1200),
  designPhilosophy: z.string().min(30).max(1200),
  generalCharacteristics: z.array(z.string().min(10).max(300)).min(2).max(8),
  sourceIds: z.array(sourceIdSchema).min(1),
  editorial: z.object({
    status: z.enum(["draft", "research-review", "safety-review", "rights-review", "approved", "published", "stale", "withdrawn", "rejected"]),
    confidence: z.enum(["verified", "corroborated", "estimated", "disputed"]),
    lastVerified: isoDateSchema,
    reviewer: z.string().max(120).optional(),
    reviewNote: z.string().min(20).max(600)
  })
});

export type SourceRecord = z.infer<typeof sourceSchema>;
export type CountryRecord = z.infer<typeof countrySchema>;
export type OrganisationRecord = z.infer<typeof organisationSchema>;
export type ManufacturerRecord = z.infer<typeof manufacturerSchema>;
export type DomainTaxonomyRecord = z.infer<typeof domainTaxonomySchema>;
export type CategoryRecord = z.infer<typeof categorySchema>;
export type FunctionRecord = z.infer<typeof functionSchema>;
export type EquipmentRecord = z.infer<typeof equipmentSchema>;
