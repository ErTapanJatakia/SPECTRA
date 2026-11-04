import { Link, useSearchParams } from "react-router";
import PageHeading from "../components/PageHeading";
import EmptyState from "../components/EmptyState";
import DomainCard from "../components/DomainCard";
import { domains } from "../data/domains";
import { searchDomains } from "../lib/search";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const results = searchDomains(query, domains);

  return (
    <div className="page-stack">
      <PageHeading eyebrow="KNOWLEDGE DISCOVERY" title="Search SPECTRA" description={query ? `Navigation and subject-area matches for “${query}”.` : "Search the current knowledge architecture."} />
      <div className="search-summary"><strong>{results.length}</strong> division matches <span>·</span> <span>Foundation search covers navigation divisions only, not an equipment database.</span></div>
      {results.length > 0 ? <div className="domain-grid">{results.map((domain) => <DomainCard domain={domain} key={domain.id} />)}</div> : <EmptyState title={query ? "No division matches found" : "Enter a search term"} description="Try a subject such as land systems, aerospace, radar, cyber defence or peacekeeping. Equipment-level search will be added with the knowledge base." icon="search" />}
      <Link className="back-link" to="/"><span>←</span> Return to overview</Link>
    </div>
  );
}
