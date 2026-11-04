import { Link, useParams } from "react-router";
import PageHeading from "../components/PageHeading";
import EmptyState from "../components/EmptyState";
import StatusPill from "../components/StatusPill";
import Icon from "../components/Icon";
import EquipmentCard from "../components/EquipmentCard";
import { getDomainBySlug } from "../data/domains";
import { equipmentRecords } from "../data/knowledgeBase";

export default function DomainPage() {
  const { slug } = useParams();
  const domain = getDomainBySlug(slug);

  if (!domain) {
    return <div className="page-stack"><PageHeading eyebrow="KNOWLEDGE DIVISION" title="Division not found" description="The requested knowledge division does not exist in the current navigation taxonomy." /><Link className="text-link" to="/">Return to overview <Icon name="arrow" size={15} /></Link></div>;
  }

  const records = equipmentRecords.filter((record) => record.classification.domainIds.includes(domain.id));

  return (
    <div className="page-stack">
      <PageHeading eyebrow={`KNOWLEDGE DIVISION / ${domain.number}`} title={domain.title} description={domain.description} actions={<StatusPill label={records.length ? "Sample records available" : "Further content planned"} />} />
      <div className="domain-detail-banner">
        <div className="domain-detail-icon"><Icon name={domain.icon as Parameters<typeof Icon>[0]["name"]} size={32} /></div>
        <div><span className="eyebrow">EDITORIAL SCOPE</span><h2>What this division covers</h2><p>Published records are drawn from traceable public sources and reviewed for educational scope, accuracy and reuse rights.</p></div>
      </div>
      <div className="scope-grid">
        {domain.scope.map((item, index) => <div className="scope-item" key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
      </div>
      {records.length ? (
        <section className="section-block">
          <div className="section-heading"><div><div className="eyebrow">CURATED KNOWLEDGE BASE</div><h2>Published sample records</h2><p>{records.length} records currently associated with this domain.</p></div><Link to="/catalogue" className="text-link">All equipment <Icon name="arrow" size={15} /></Link></div>
          <div className="equipment-grid">{records.map((record) => <EquipmentCard key={record.id} record={record} />)}</div>
        </section>
      ) : <EmptyState title="Further content is planned" description="This division is registered in the application taxonomy. Additional records will be added after source verification and editorial review." icon="file" />}
      <Link className="back-link" to="/"><Icon name="arrow" size={15} /> Back to all divisions</Link>
    </div>
  );
}
