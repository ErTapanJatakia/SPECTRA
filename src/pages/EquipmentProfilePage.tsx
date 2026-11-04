import { Link, useParams } from "react-router";
import PageHeading from "../components/PageHeading";
import Icon from "../components/Icon";
import { categoryById, countryById, getEquipmentBySlug, manufacturerById, organisationById, sourceById } from "../data/knowledgeBase";

function statusLabel(value: string): string {
  return ({active:"Active",retired:"Retired",developmental:"Developmental",prototype:"Prototype",unknown:"Not confirmed"} as Record<string,string>)[value] ?? value;
}

export default function EquipmentProfilePage() {
  const { slug } = useParams();
  const record = getEquipmentBySlug(slug);

  if (!record) {
    return <div className="page-stack"><PageHeading eyebrow="KNOWLEDGE BASE" title="Equipment record not found" description="The requested equipment record is not present in the current curated dataset." /><Link className="text-link" to="/catalogue">Return to catalogue <Icon name="arrow" size={15} /></Link></div>;
  }

  const category = categoryById.get(record.classification.categoryId);
  const manufacturers = record.manufacturerIds.map((id) => manufacturerById.get(id)).filter((item) => item !== undefined);
  const developers = record.developerOrganisationIds.map((id) => organisationById.get(id)).filter((item) => item !== undefined);
  const operators = record.operatorOrganisationIds.map((id) => organisationById.get(id)).filter((item) => item !== undefined);
  const sourceRecords = record.sourceIds.map((id) => sourceById.get(id)).filter((item) => item !== undefined);

  return (
    <div className="page-stack">
      <Link className="back-link" to="/catalogue">← Back to equipment catalogue</Link>
      <PageHeading
        eyebrow={`EQUIPMENT RECORD / ${record.id.toUpperCase()}`}
        title={record.name}
        description={record.overview}
        actions={<span className={`editorial-badge editorial-${record.editorial.confidence}`}>{record.editorial.confidence} source confidence</span>}
      />
      <section className="profile-summary-grid">
        <div className="profile-summary-item"><span>Designation</span><strong>{record.designation}</strong></div>
        <div className="profile-summary-item"><span>Category</span><strong>{category?.label ?? "Not classified"}</strong></div>
        <div className="profile-summary-item"><span>Public status</span><strong>{statusLabel(record.historical.operationalStatus)}</strong></div>
        <div className="profile-summary-item"><span>Last verified</span><strong>{record.editorial.lastVerified}</strong></div>
      </section>

      <section className="profile-section">
        <div className="profile-section-heading"><span className="eyebrow">01 / ORIGIN & ATTRIBUTION</span><h2>Record identity</h2></div>
        <dl className="profile-definition-grid">
          <div><dt>Country of origin</dt><dd>{record.originCountryIds.map((id) => countryById.get(id)?.name ?? id).join(", ")}</dd></div>
          <div><dt>Development country</dt><dd>{record.developmentCountryIds.map((id) => countryById.get(id)?.name ?? id).join(", ")}</dd></div>
          <div><dt>Operator organisations</dt><dd>{operators.map((item) => item.name).join(", ") || "Not confirmed in this record"}</dd></div>
          <div><dt>Manufacturers / builders</dt><dd>{manufacturers.map((item) => item.name).join(", ") || "Not confirmed in cited record"}</dd></div>
          <div><dt>Developer organisations</dt><dd>{developers.map((item) => item.name).join(", ") || "Not separately attributed"}</dd></div>
          <div><dt>Development context</dt><dd>{record.historical.developmentPeriod ?? "Not documented"}</dd></div>
        </dl>
      </section>

      <section className="profile-section">
        <div className="profile-section-heading"><span className="eyebrow">02 / HISTORICAL CONTEXT</span><h2>Development background</h2></div>
        <p className="profile-body-copy">{record.historicalBackground}</p>
        <h3>Design context</h3>
        <p className="profile-body-copy">{record.designPhilosophy}</p>
      </section>

      <section className="profile-section">
        <div className="profile-section-heading"><span className="eyebrow">03 / HIGH-LEVEL CHARACTERISTICS</span><h2>Educational overview</h2></div>
        <ul className="characteristic-list">{record.generalCharacteristics.map((item) => <li key={item}><Icon name="check" size={16} />{item}</li>)}</ul>
      </section>

      <section className="profile-section source-section">
        <div className="profile-section-heading"><span className="eyebrow">04 / RESEARCH PROVENANCE</span><h2>References & verification</h2></div>
        <div className="source-list">
          {sourceRecords.map((source) => (
            <article className="source-card" key={source.id}>
              <div><span className="source-type">{source.sourceType.replace(/_/g," ")}</span><h3>{source.title}</h3><p>{source.publisher} · Accessed {source.accessDate}</p></div>
              <a href={source.url} target="_blank" rel="noreferrer">Open source <Icon name="external" size={13} /></a>
            </article>
          ))}
        </div>
        <div className="editorial-note-panel">
          <div><strong>Editorial confidence: {record.editorial.confidence}</strong><p>{record.editorial.reviewNote}</p></div>
          <span>Verified {record.editorial.lastVerified}</span>
        </div>
      </section>

      <div className="content-safety-note"><Icon name="shield" size={19} /><p>This is an independent, supplementary educational profile. It does not provide operational weapon-use guidance, procedures, tactical employment instructions, targeting information or performance calculations.</p></div>
      <Link className="back-link" to="/catalogue">← Return to catalogue</Link>
    </div>
  );
}
