import { Link, useParams } from "react-router";
import PageHeading from "../components/PageHeading";
import EmptyState from "../components/EmptyState";
import StatusPill from "../components/StatusPill";
import Icon from "../components/Icon";
import { getDomainBySlug } from "../data/domains";

export default function DomainPage() {
  const { slug } = useParams();
  const domain = getDomainBySlug(slug);

  if (!domain) {
    return <div className="page-stack"><PageHeading eyebrow="KNOWLEDGE DIVISION" title="Division not found" description="The requested knowledge division does not exist in the current navigation taxonomy." /><Link className="text-link" to="/">Return to overview <Icon name="arrow" size={15} /></Link></div>;
  }

  return (
    <div className="page-stack">
      <PageHeading eyebrow={`KNOWLEDGE DIVISION / ${domain.number}`} title={domain.title} description={domain.description} actions={<StatusPill />} />
      <div className="domain-detail-banner">
        <div className="domain-detail-icon"><Icon name={domain.icon as Parameters<typeof Icon>[0]["name"]} size={32} /></div>
        <div><span className="eyebrow">EDITORIAL SCOPE</span><h2>What this division will cover</h2><p>Educational material will be published only after source, safety and rights review.</p></div>
      </div>
      <div className="scope-grid">
        {domain.scope.map((item, index) => <div className="scope-item" key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
      </div>
      <EmptyState title="Content rollout is pending" description="This division is registered in the application taxonomy. Its equipment records, lessons and references will be introduced in later approved development stages." icon="file" />
      <Link className="back-link" to="/"><Icon name="arrow" size={15} /> Back to all divisions</Link>
    </div>
  );
}
