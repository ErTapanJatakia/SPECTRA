import { Link } from "react-router";
import type { EquipmentRecord } from "../schemas/content";
import { categoryById, countryById, manufacturerById } from "../data/knowledgeBase";

function statusLabel(status: EquipmentRecord["historical"]["operationalStatus"]): string {
  const labels: Record<EquipmentRecord["historical"]["operationalStatus"], string> = {
    active:"Publicly listed active",
    retired:"Retired",
    developmental:"In development",
    prototype:"Prototype",
    unknown:"Status not confirmed"
  };
  return labels[status];
}

export default function EquipmentCard({
  record,
  selected = false,
  onCompare
}: {
  record: EquipmentRecord;
  selected?: boolean;
  onCompare?: (id: string, checked: boolean) => void;
}) {
  const countryNames = record.originCountryIds.map((id) => countryById.get(id)?.name ?? id);
  const category = categoryById.get(record.classification.categoryId);
  const makers = record.manufacturerIds.map((id) => manufacturerById.get(id)?.name).filter((name): name is string => Boolean(name));

  return (
    <article className="equipment-card">
      <div className="equipment-card-top">
        <span className="record-kicker">{category?.label ?? "Equipment record"}</span>
        <span className={`editorial-badge editorial-${record.editorial.confidence}`}>{record.editorial.confidence}</span>
      </div>
      <Link to={`/equipment/${record.slug}`} className="equipment-card-link">
        <h3>{record.name}</h3>
      </Link>
      <p className="equipment-designation">{record.designation}</p>
      <p className="equipment-overview">{record.overview}</p>
      <div className="equipment-meta">
        <span>{countryNames.join(" · ")}</span>
        <span>{makers.length ? makers.join(", ") : "Manufacturer not confirmed in this record"}</span>
      </div>
      <div className="equipment-card-bottom">
        <span className="status-pill"><span className="status-dot" />{statusLabel(record.historical.operationalStatus)}</span>
        {onCompare && (
          <label className="compare-check">
            <input
              type="checkbox"
              checked={selected}
              onChange={(event) => onCompare(record.id, event.target.checked)}
              aria-label={`Add ${record.name} to comparison`}
            />
            Compare
          </label>
        )}
      </div>
      <Link to={`/equipment/${record.slug}`} className="equipment-detail-link">View profile <span aria-hidden="true">→</span></Link>
    </article>
  );
}
