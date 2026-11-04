import type { KnowledgeDomain } from "../types";

export function normaliseSearchText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function searchDomains(query: string, records: KnowledgeDomain[]): KnowledgeDomain[] {
  const normalisedQuery = normaliseSearchText(query);
  if (!normalisedQuery) return [];
  const terms = normalisedQuery.split(/\s+/).filter(Boolean);

  return records
    .map((record) => {
      const searchable = normaliseSearchText([
        record.title,
        record.shortTitle,
        record.description,
        record.slug.replace(/-/g, " "),
        ...record.scope
      ].join(" "));
      const score = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0), 0);
      return { record, score };
    })
    .filter((entry) => entry.score === terms.length)
    .sort((a, b) => b.score - a.score || a.record.number.localeCompare(b.record.number))
    .map((entry) => entry.record);
}
