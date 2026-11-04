import PageHeading from "../components/PageHeading";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";

const directoryDimensions = [
  { title:"Country of origin", detail:"Separate design origin, manufacturing location and ownership.", icon:"globe" as const },
  { title:"Military organisation", detail:"Represent service branches, joint commands and institutions.", icon:"shield" as const },
  { title:"Manufacturer & developer", detail:"Connect equipment records to attributed developer relationships.", icon:"layers" as const },
  { title:"Operator & historical context", detail:"Record publicly documented use with date-aware relationships.", icon:"clock" as const },
];

export default function DirectoryPage() {
  return (
    <div className="page-stack">
      <PageHeading eyebrow="GLOBAL DIRECTORY" title="Countries & armed forces" description="A multidimensional directory for geographic origin, military organisations, manufacturers and publicly documented operators." />
      <div className="info-strip"><Icon name="info" size={18} /><span>The directory framework is part of the foundation release. Country and organisation records will be added after source and editorial validation.</span></div>
      <div className="directory-grid">
        {directoryDimensions.map((item) => <article className="directory-card" key={item.title}><div className="directory-icon"><Icon name={item.icon} size={21} /></div><h3>{item.title}</h3><p>{item.detail}</p></article>)}
      </div>
      <EmptyState title="Country records are not published yet" description="The directory schema and navigation entry point are established. Verified geographic and organisational records will be introduced in the knowledge-base stage." icon="map" />
    </div>
  );
}
