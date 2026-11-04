import type { EquipmentRecord, OrganisationRecord } from "../schemas/content";
import type { KnowledgeDomain } from "../types";

export function normaliseSearchText(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/\s+/g, " ").trim();
}

export function searchDomains(query: string, records: KnowledgeDomain[]): KnowledgeDomain[] {
  const normalisedQuery = normaliseSearchText(query);
  if (!normalisedQuery) return [];
  const terms = normalisedQuery.split(/\s+/).filter(Boolean);

  return records
    .map((record) => {
      const searchable = normaliseSearchText([
        record.title, record.shortTitle, record.description,
        record.slug.replace(/-/g, " "), ...record.scope
      ].join(" "));
      const score = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0), 0);
      return { record, score };
    })
    .filter((entry) => entry.score === terms.length)
    .sort((a, b) => b.score - a.score || a.record.number.localeCompare(b.record.number))
    .map((entry) => entry.record);
}

export interface EquipmentFilters {
  query?: string;
  countryId?: string;
  domainId?: string;
  categoryId?: string;
  branch?: string;
  status?: string;
}

export function filterEquipment(
  records: EquipmentRecord[],
  filters: EquipmentFilters,
  organisations: OrganisationRecord[]
): EquipmentRecord[] {
  const query = normaliseSearchText(filters.query ?? "");
  const terms = query ? query.split(/\s+/).filter(Boolean) : [];
  const organisationById = new Map(organisations.map((item) => [item.id, item]));

  return records.filter((record) => {
    if (filters.countryId && !record.originCountryIds.includes(filters.countryId) && !record.developmentCountryIds.includes(filters.countryId)) return false;
    if (filters.domainId && !record.classification.domainIds.includes(filters.domainId)) return false;
    if (filters.categoryId && record.classification.categoryId !== filters.categoryId) return false;
    if (filters.status && record.historical.operationalStatus !== filters.status) return false;
    if (filters.branch) {
      const branches = record.operatorOrganisationIds.flatMap((id) => {
        const operatorBranch = organisationById.get(id)?.branch;
        return operatorBranch ? [operatorBranch] : [];
      });
      if (!branches.includes(filters.branch as OrganisationRecord["branch"])) return false;
    }
    if (terms.length) {
      const searchable = normaliseSearchText([
        record.name, record.designation, ...record.aliases,
        record.overview, record.historicalBackground, record.designPhilosophy,
        ...record.generalCharacteristics
      ].join(" "));
      if (!terms.every((term) => searchable.includes(term))) return false;
    }
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));
}
