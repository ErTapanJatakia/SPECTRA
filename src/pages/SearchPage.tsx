import { Link, useSearchParams } from "react-router";
import PageHeading from "../components/PageHeading";
import EmptyState from "../components/EmptyState";
import DomainCard from "../components/DomainCard";
import EquipmentCard from "../components/EquipmentCard";
import { domains } from "../data/domains";
import { equipmentRecords, organisations } from "../data/knowledgeBase";
import { searchDomains, filterEquipment } from "../lib/search";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const domainResults = searchDomains(query, domains);
  const equipmentResults = filterEquipment(equipmentRecords, { query }, organisations);

  return (
    <div className="page-stack">
      <PageHeading eyebrow="KNOWLEDGE DISCOVERY" title="Search SPECTRA" description={query ? `Search results for “${query}” across the current division index and curated equipment records.` : "Search the current knowledge architecture and equipment sample."} />
      {!query ? (
        <EmptyState title="Enter a search term" description="Try a country, system name, designation or subject such as land systems, Tejas, destroyer or peacekeeping." icon="search" />
      ) : (
        <>
          <section className="section-block">
            <div className="section-heading"><div><div className="eyebrow">EQUIPMENT RECORDS</div><h2>{equipmentResults.length} equipment matches</h2></div><Link to="/catalogue" className="text-link">Open filters <span>→</span></Link></div>
            {equipmentResults.length ? <div className="equipment-grid">{equipmentResults.map((record) => <EquipmentCard key={record.id} record={record} />)}</div> : <EmptyState title="No equipment matches" description="Try another name, designation, country or category." icon="search" />}
          </section>
          <section className="section-block">
            <div className="section-heading"><div><div className="eyebrow">KNOWLEDGE ARCHITECTURE</div><h2>{domainResults.length} division matches</h2></div></div>
            {domainResults.length ? <div className="domain-grid">{domainResults.map((domain) => <DomainCard domain={domain} key={domain.id} />)}</div> : <EmptyState title="No division matches" description="The search found no matching division title or description." icon="layers" />}
          </section>
        </>
      )}
      <Link className="back-link" to="/">← Return to overview</Link>
    </div>
  );
}
