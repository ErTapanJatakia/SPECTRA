import countryData from "../../content/geography/countries.json";
import organisationData from "../../content/organisations/organisations.json";
import manufacturerData from "../../content/manufacturers/manufacturers.json";
import sourceData from "../../content/sources/sources.json";
import categoryData from "../../content/taxonomy/categories.json";
import functionData from "../../content/taxonomy/functions.json";
import equipmentData from "../../content/equipment/equipment.json";
import {
  categorySchema,
  countrySchema,
  equipmentSchema,
  functionSchema,
  manufacturerSchema,
  organisationSchema,
  sourceSchema
} from "../schemas/content";
import type {
  CategoryRecord,
  CountryRecord,
  EquipmentRecord,
  FunctionRecord,
  ManufacturerRecord,
  OrganisationRecord,
  SourceRecord
} from "../schemas/content";

export const countries: CountryRecord[] = countryData.map((record) => countrySchema.parse(record));
export const organisations: OrganisationRecord[] = organisationData.map((record) => organisationSchema.parse(record));
export const manufacturers: ManufacturerRecord[] = manufacturerData.map((record) => manufacturerSchema.parse(record));
export const sources: SourceRecord[] = sourceData.map((record) => sourceSchema.parse(record));
export const categories: CategoryRecord[] = categoryData.map((record) => categorySchema.parse(record));
export const functions: FunctionRecord[] = functionData.map((record) => functionSchema.parse(record));
export const equipmentRecords: EquipmentRecord[] = equipmentData.map((record) => equipmentSchema.parse(record));

export const countryById = new Map(countries.map((record) => [record.id, record]));
export const organisationById = new Map(organisations.map((record) => [record.id, record]));
export const manufacturerById = new Map(manufacturers.map((record) => [record.id, record]));
export const sourceById = new Map(sources.map((record) => [record.id, record]));
export const categoryById = new Map(categories.map((record) => [record.id, record]));

export function getEquipmentBySlug(slug: string | undefined): EquipmentRecord | undefined {
  return equipmentRecords.find((record) => record.slug === slug);
}

export function getCountryById(id: string | undefined): CountryRecord | undefined {
  return countries.find((record) => record.id === id);
}

export function getEquipmentForCountry(countryId: string): EquipmentRecord[] {
  return equipmentRecords.filter((record) =>
    record.originCountryIds.includes(countryId) ||
    record.developmentCountryIds.includes(countryId)
  );
}

export function getEquipmentDomainLabels(record: EquipmentRecord): string[] {
  const labels = record.classification.domainIds.map((id) => {
    const item = categories.find((category) => category.domainId === id);
    return item?.domainId === id ? id.replace("domain-", "").replace(/-/g, " ") : id;
  });
  return [...new Set(labels)];
}
