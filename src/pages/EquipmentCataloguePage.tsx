import { useMemo, useState } from "react";
import PageHeading from "../components/PageHeading";
import EquipmentCard from "../components/EquipmentCard";
import EquipmentComparison from "../components/EquipmentComparison";
import EmptyState from "../components/EmptyState";
import { categories, countries, equipmentRecords, organisations } from "../data/knowledgeBase";
import { domains } from "../data/domains";
import { filterEquipment } from "../lib/search";

export default function EquipmentCataloguePage() {
  const [query, setQuery] = useState("");
  const [countryId, setCountryId] = useState("");
  const [domainId, setDomainId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const filtered = useMemo(() => filterEquipment(equipmentRecords, {
    query, countryId, domainId, categoryId, branch, status
  }, organisations), [query, countryId, domainId, categoryId, branch, status]);

  const compareRecords = compareIds
    .map((id) => equipmentRecords.find((record) => record.id === id))
    .filter((record): record is NonNullable<typeof record> => Boolean(record));

  function handleCompare(id: string, checked: boolean) {
    setCompareIds((current) => {
      if (checked) return current.length >= 3 ? current : [...current, id];
      return current.filter((entry) => entry !== id);
    });
  }

  function clearFilters() {
    setQuery("");
    setCountryId("");
    setDomainId("");
    setCategoryId("");
    setBranch("");
    setStatus("");
  }

  const hasFilters = Boolean(query || countryId || domainId || categoryId || branch || status);

  return (
    <div className="page-stack">
      <PageHeading
        eyebrow="GLOBAL KNOWLEDGE BASE / EQUIPMENT"
        title="Equipment catalogue"
        description="Explore a curated, source-attributed starter collection. Use multiple dimensions to discover publicly documented equipment records."
        actions={<span className="catalogue-count">{equipmentRecords.length} curated records</span>}
      />

      <div className="catalogue-intro">
        <div className="catalogue-intro-mark">S / KB</div>
        <div><strong>Curated sample collection</strong><p>Five country profiles and ten initial equipment records. Each record identifies its sources, editorial confidence and last verification date. Coverage is intentionally selective, not exhaustive.</p></div>
      </div>

      <section className="catalogue-filters" aria-label="Equipment filters">
        <div className="filter-search">
          <label htmlFor="equipment-query">Search catalogue</label>
          <input id="equipment-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, designation, alias or summary..." />
        </div>
        <div className="filter-grid">
          <label>Country
            <select value={countryId} onChange={(event) => setCountryId(event.target.value)}>
              <option value="">All countries</option>
              {countries.map((country) => <option key={country.id} value={country.id}>{country.name}</option>)}
            </select>
          </label>
          <label>Domain
            <select value={domainId} onChange={(event) => setDomainId(event.target.value)}>
              <option value="">All domains</option>
              {domains.map((domain) => <option key={domain.id} value={domain.id}>{domain.title}</option>)}
            </select>
          </label>
          <label>Equipment category
            <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
              <option value="">All categories</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
            </select>
          </label>
          <label>Operator branch
            <select value={branch} onChange={(event) => setBranch(event.target.value)}>
              <option value="">All branches</option>
              <option value="land">Land forces</option>
              <option value="air">Air force</option>
              <option value="naval">Naval forces</option>
              <option value="joint">Joint command</option>
            </select>
          </label>
          <label>Public service status
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="retired">Retired</option>
              <option value="developmental">Developmental</option>
              <option value="prototype">Prototype</option>
              <option value="unknown">Not confirmed</option>
            </select>
          </label>
        </div>
        <div className="filter-footer">
          <span>{filtered.length} of {equipmentRecords.length} records match the selected filters</span>
          <button type="button" className="text-button" onClick={clearFilters} disabled={!hasFilters}>Reset filters</button>
        </div>
      </section>

      <div className="catalogue-section-heading">
        <div><div className="eyebrow">SOURCE-ATTRIBUTED RECORDS</div><h2>Browse equipment</h2></div>
        <span className="compare-counter">{compareIds.length}/3 selected for comparison</span>
      </div>

      {filtered.length
        ? <div className="equipment-grid">
            {filtered.map((record) => (
              <EquipmentCard
                key={record.id}
                record={record}
                selected={compareIds.includes(record.id)}
                onCompare={handleCompare}
              />
            ))}
          </div>
        : <EmptyState title="No matching equipment records" description="Try removing one or more filters, or search by a different designation or category." icon="search" />}

      {compareIds.length >= 3 && <p className="inline-note">The comparison is limited to three records so that the attributes remain readable.</p>}
      <EquipmentComparison records={compareRecords} onClear={() => setCompareIds([])} />
      <div className="catalogue-governance"><strong>Editorial note</strong><span>“Active” reflects the status shown or supported by the cited public source at verification time. “Not confirmed” means this sample record does not make a service-status claim. Do not infer a missing operator or manufacturer.</span></div>
    </div>
  );
}
