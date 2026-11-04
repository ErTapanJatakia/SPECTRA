import type { EquipmentRecord } from "../schemas/content";
import { categoryById, countryById, manufacturerById } from "../data/knowledgeBase";

export default function EquipmentComparison({ records, onClear }: { records: EquipmentRecord[]; onClear: () => void }) {
  if (!records.length) return null;

  const rows: { label: string; value: (record: EquipmentRecord) => string }[] = [
    { label:"Country of origin", value:(record) => record.originCountryIds.map((id) => countryById.get(id)?.name ?? id).join(", ") },
    { label:"Category", value:(record) => categoryById.get(record.classification.categoryId)?.label ?? "Not classified" },
    { label:"Platform type", value:(record) => record.classification.platformTypes.join(", ").replace(/-/g, " ") },
    { label:"Development context", value:(record) => record.historical.developmentPeriod ?? "Not documented" },
    { label:"Public status", value:(record) => record.historical.operationalStatus.replace(/-/g, " ") },
    { label:"Manufacturer attribution", value:(record) => record.manufacturerIds.map((id) => manufacturerById.get(id)?.name ?? id).join(", ") || "Not confirmed in cited record" },
    { label:"General characteristics", value:(record) => record.generalCharacteristics.join(" ") },
    { label:"Editorial confidence", value:(record) => record.editorial.confidence }
  ];

  return (
    <section className="comparison-panel" aria-labelledby="comparison-heading">
      <div className="comparison-heading">
        <div><div className="eyebrow">SIDE-BY-SIDE REFERENCE</div><h2 id="comparison-heading">Compare selected records</h2><p>Compare only the high-level, source-attributed attributes stored in SPECTRA.</p></div>
        <button type="button" className="text-button" onClick={onClear}>Clear comparison</button>
      </div>
      <div className="comparison-scroll" role="region" aria-label="Equipment comparison table" tabIndex={0}>
        <table className="comparison-table">
          <thead><tr><th scope="col">Attribute</th>{records.map((record) => <th scope="col" key={record.id}>{record.name}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th>{records.map((record) => <td key={record.id}>{row.value(record)}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="comparison-note">This educational comparison is not a ranking of military effectiveness, suitability, tactical performance or operational capability.</p>
    </section>
  );
}
