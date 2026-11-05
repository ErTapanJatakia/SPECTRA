import { Link } from "react-router";
import PageHeading from "../components/PageHeading";
import Icon from "../components/Icon";
import "./peacekeeping.css";

const curriculumAreas = [
  {
    number: "01",
    title: "Principles and mandate awareness",
    summary: "Understand the purpose, foundational principles, legal basis and mandate-led nature of United Nations peacekeeping.",
    outcomes: ["Explain consent, impartiality and the limits on the use of force at a conceptual level", "Distinguish a Security Council mandate from national instructions and mission-specific direction", "Recognise that mandates and mission contexts change over time"],
    boundary: "Conceptual and legal literacy only; no rules-of-engagement interpretation or operational decision guidance."
  },
  {
    number: "02",
    title: "Protection of civilians",
    summary: "Explore protection of civilians as a whole-of-mission responsibility involving civilian, police and military components.",
    outcomes: ["Identify the respective responsibilities of host States, missions and protection partners", "Recognise the importance of community engagement and humanitarian principles", "Understand that mandates, capabilities and areas of deployment define mission responsibilities"],
    boundary: "No tactical protection plans, patrol procedures, threat-response drills or operational deployment guidance."
  },
  {
    number: "03",
    title: "Human rights and legal frameworks",
    summary: "Build awareness of human rights, international humanitarian law and the legal frameworks relevant to peace operations.",
    outcomes: ["Recognise human rights as a cross-cutting responsibility", "Distinguish human rights law from international humanitarian law at an introductory level", "Understand why accountability, documentation and competent legal advice matter"],
    boundary: "General education, not legal advice, case-specific legal interpretation or instruction for conducting investigations."
  },
  {
    number: "04",
    title: "Conduct, discipline and accountability",
    summary: "Understand professional standards, integrity, respect for local communities, reporting responsibilities and accountability.",
    outcomes: ["Recognise the importance of professional conduct and respect for local laws and customs", "Identify sexual exploitation and abuse as prohibited misconduct under UN standards", "Understand that prevention, reporting and accountability mechanisms are essential"],
    boundary: "Awareness only; official reporting channels, employer policies and national procedures take precedence."
  },
  {
    number: "05",
    title: "Cross-cutting protection responsibilities",
    summary: "Explore how child protection, women, peace and security, gender perspectives and conflict-related sexual violence inform mission-wide responsibilities.",
    outcomes: ["Recognise that protection concerns affect multiple mission components", "Understand the value of inclusive, context-aware engagement", "Identify why specialist mandates and referral pathways must be respected"],
    boundary: "No survivor-identifying case material, sensitive operational indicators or substitute safeguarding procedures."
  },
  {
    number: "06",
    title: "Mission coordination and support",
    summary: "Become familiar with the integrated roles of civilian, police and military personnel and the enabling contribution of logistics, communications and other support functions.",
    outcomes: ["Describe why mission components and partners coordinate toward shared mandates", "Recognise the contribution of civilian specialists and support services", "Understand equipment stewardship and interoperability as broad professional responsibilities"],
    boundary: "No tactical communications procedures, force protection instructions, weapons handling or operational equipment employment."
  }
];

const resources = [
  {
    title: "Core Pre-Deployment Training Materials (CPTM)",
    publisher: "UN Department of Peace Operations · Integrated Training Service",
    scope: "Official foundational training materials for military, police and civilian personnel; SPECTRA links to the source and does not reproduce its course files.",
    url: "https://peacekeepingresourcehub.un.org/en/training/pre-deployment/cptm/intro"
  },
  {
    title: "Principles of peacekeeping",
    publisher: "United Nations Peacekeeping",
    scope: "The three basic principles and their interpretation.",
    url: "https://peacekeeping.un.org/en/node/132275"
  },
  {
    title: "Mandates and the legal basis for peacekeeping",
    publisher: "United Nations Peacekeeping",
    scope: "Security Council mandates and the legal basis for mission tasks.",
    url: "https://peacekeeping.un.org/en/mandates-and-the-legal-basis-for-peacekeeping"
  },
  {
    title: "Protection of civilians mandate",
    publisher: "United Nations Peacekeeping",
    scope: "Whole-of-mission protection responsibilities and guiding principles.",
    url: "https://peacekeeping.un.org/en/protection-of-civilians-mandate"
  },
  {
    title: "Promoting human rights",
    publisher: "United Nations Peacekeeping",
    scope: "Human rights responsibilities and the role of human rights components.",
    url: "https://peacekeeping.un.org/en/promoting-human-rights"
  },
  {
    title: "Conduct training",
    publisher: "United Nations Conduct and Discipline Service",
    scope: "Induction, pre-deployment and specialised conduct and discipline training.",
    url: "https://www.unmissions.org/en/conduct-and-discipline-service/conduct-training"
  },
  {
    title: "Standards of conduct",
    publisher: "United Nations Peacekeeping",
    scope: "Professional behaviour, discipline and the UN approach to misconduct.",
    url: "https://peacekeeping.un.org/en/standards-of-conduct"
  },
  {
    title: "Policy and guidance",
    publisher: "United Nations Peacekeeping",
    scope: "Publicly available policy, doctrine, handbooks and guidance; check each document's intended audience and status.",
    url: "https://peacekeeping.un.org/en/policy-and-guidance"
  },
  {
    title: "Our integrated teams",
    publisher: "United Nations Peacekeeping",
    scope: "The complementary roles of civilian, police and military personnel.",
    url: "https://peacekeeping.un.org/en/our-integrated-teams"
  }
];

export default function PeacekeepingPage() {
  return (
    <div className="page-stack peacekeeping-page">
      <PageHeading
        eyebrow="MISSION FAMILIARISATION"
        title="Peacekeeping Education"
        description="An independent learning and reference hub for understanding peace operations, professional responsibilities and publicly documented UN guidance."
        actions={<span className="peacekeeping-status"><Icon name="shield" size={13} /> SUPPLEMENTARY EDUCATION</span>}
      />

      <section className="peacekeeping-intro" aria-labelledby="peacekeeping-intro-heading">
        <div className="peacekeeping-intro-mark"><Icon name="globe" size={27} /></div>
        <div>
          <span className="eyebrow">STAGE 06 · LEARNING FRAMEWORK</span>
          <h2 id="peacekeeping-intro-heading">Understand the mandate. Respect the people. Support responsible peace.</h2>
          <p>Peace operations bring together civilian, police and military personnel under mandates that vary by mission and evolve over time. This hub organises introductory topics and points learners toward authoritative public resources. It is not an official UN course or a substitute for authorised training.</p>
          <Link className="button button-primary peacekeeping-academy-link" to="/academy">Continue to Learning Academy <Icon name="arrow" size={15} /></Link>
        </div>
      </section>

      <section className="peacekeeping-section" aria-labelledby="curriculum-heading">
        <div className="peacekeeping-section-heading">
          <div><span className="eyebrow">CURRICULUM MAP</span><h2 id="curriculum-heading">Six learning areas</h2></div>
          <span className="peacekeeping-count">06 AREAS · FOUNDATION SCOPE</span>
        </div>
        <div className="peacekeeping-curriculum-grid">
          {curriculumAreas.map((area) => (
            <article className="peacekeeping-area-card" key={area.number}>
              <div className="peacekeeping-area-top"><span>{area.number}</span><Icon name="book" size={16} /></div>
              <h3>{area.title}</h3>
              <p>{area.summary}</p>
              <div className="peacekeeping-outcomes">
                <strong>Learning outcomes</strong>
                <ul>{area.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
              </div>
              <p className="peacekeeping-boundary"><strong>Scope boundary:</strong> {area.boundary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="peacekeeping-section" aria-labelledby="resources-heading">
        <div className="peacekeeping-section-heading">
          <div><span className="eyebrow">PRIMARY REFERENCE COLLECTION</span><h2 id="resources-heading">Official resources and further reading</h2></div>
          <span className="peacekeeping-count">UN SOURCES · LINK-ONLY</span>
        </div>
        <p className="peacekeeping-resource-note">These links point to official United Nations sources. Their inclusion does not imply UN endorsement of SPECTRA. Accessed 5 November 2026; source pages and policies may change. Review the original publication and its intended audience before relying on it.</p>
        <ul className="peacekeeping-resource-list">
          {resources.map((resource) => (
            <li key={resource.url}>
              <div><a href={resource.url} target="_blank" rel="noreferrer">{resource.title}</a><span>{resource.publisher}</span><p>{resource.scope}</p></div>
              <a className="peacekeeping-resource-open" href={resource.url} target="_blank" rel="noreferrer" aria-label={`Open resource: ${resource.title}`}><Icon name="external-link" size={15} /></a>
            </li>
          ))}
        </ul>
      </section>

      <section className="peacekeeping-governance" aria-labelledby="scope-heading">
        <Icon name="shield" size={20} />
        <div>
          <h2 id="scope-heading">Independence, safety and training limitations</h2>
          <p>SPECTRA is an independent educational initiative. It is not affiliated with, endorsed by, certified by or operated by the United Nations, any government, armed force or peacekeeping mission. This material is introductory and non-certifying; it cannot replace the UN Core Pre-Deployment Training Materials, national pre-deployment requirements, mission-specific directives, rules of engagement, employer policies or authorised qualifications.</p>
          <p>The hub excludes tactical procedures, operational deployment instructions, weapon handling or employment, targeting, force-planning guidance and sensitive mission information. Official documents are linked rather than copied; third-party copyright and licensing terms remain applicable.</p>
        </div>
      </section>
    </div>
  );
}
