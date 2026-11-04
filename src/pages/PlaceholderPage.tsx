import { Link } from "react-router";
import PageHeading from "../components/PageHeading";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import StatusPill from "../components/StatusPill";

type PageKey = "catalogue" | "studio" | "academy" | "peacekeeping" | "research" | "settings";

const pageConfig: Record<PageKey, { eyebrow: string; title: string; description: string; icon: "layers" | "box" | "graduation" | "shield" | "book" | "settings"; note: string }> = {
  catalogue:{ eyebrow:"KNOWLEDGE BASE", title:"Equipment catalogue", description:"A source-attributed catalogue for public, non-operational equipment and technology education.", icon:"layers", note:"Equipment records and filters will be delivered in the knowledge-base development stage." },
  studio:{ eyebrow:"VISUAL LEARNING", title:"3D Studio", description:"An educational model viewer for identification, annotations and non-operational visual exploration.", icon:"box", note:"The reusable 3D rendering subsystem and model pipeline will be delivered in the dedicated 3D Studio stage." },
  academy:{ eyebrow:"STRUCTURED EDUCATION", title:"Learning Academy", description:"Structured courses, lessons, knowledge checks and local learning progress.", icon:"graduation", note:"Course structures, assessments and learner progress will be developed in the Learning Academy stage." },
  peacekeeping:{ eyebrow:"MISSION FAMILIARISATION", title:"UN Peacekeeping education", description:"Independent supplementary learning aligned to relevant public peacekeeping resources.", icon:"shield", note:"Peacekeeping curriculum mapping and source-attributed learning material will be introduced in its dedicated stage. SPECTRA is not a UN programme." },
  research:{ eyebrow:"RESEARCH & REFERENCES", title:"Research library", description:"A traceable research collection with source provenance, verification dates and rights metadata.", icon:"book", note:"Source records, editorial workflow and research discovery are planned for the research framework stage." },
  settings:{ eyebrow:"APPLICATION PREFERENCES", title:"Settings", description:"Control the visual presentation and, in later releases, additional local preferences.", icon:"settings", note:"Theme selection is available in the top bar. Additional preferences will be added as their modules are implemented." }
};

export default function PlaceholderPage({ page }: { page: PageKey }) {
  const config = pageConfig[page];
  return (
    <div className="page-stack">
      <PageHeading eyebrow={config.eyebrow} title={config.title} description={config.description} actions={<StatusPill />} />
      <div className="module-intro">
        <div className="module-intro-icon"><Icon name={config.icon} size={28} /></div>
        <div><span className="eyebrow">FOUNDATION RELEASE</span><h2>Module entry point established</h2><p>{config.note}</p></div>
      </div>
      <EmptyState title="This module is not yet implemented" description="The navigation and application foundation are working. This capability will appear only after its approved implementation stage has been completed and tested." icon={config.icon} />
      <Link className="back-link" to="/"><span>←</span> Return to overview</Link>
    </div>
  );
}
