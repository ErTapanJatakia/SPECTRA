import { Link } from "react-router";
import DomainCard from "../components/DomainCard";
import Icon from "../components/Icon";
import { domains } from "../data/domains";
import { countries, equipmentRecords } from "../data/knowledgeBase";

const highlights = [
  { label:"Knowledge divisions", value:String(domains.length), detail:"Connected subject areas", icon:"layers" as const },
  { label:"Country profiles", value:String(countries.length), detail:"ISO-coded sample directory", icon:"globe" as const },
  { label:"Equipment records", value:String(equipmentRecords.length), detail:"Curated and source-attributed", icon:"box" as const }
];

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="welcome-banner">
        <img src="/assets/branding/spectra-hero.jpg" alt="" className="welcome-image" />
        <div className="welcome-overlay" />
        <div className="welcome-content">
          <div className="welcome-kicker"><span className="live-dot" /> INDEPENDENT EDUCATIONAL INITIATIVE</div>
          <h1>GLOBAL DEFENCE SYSTEMS<br /><span>&amp; PEACE OPERATIONS</span></h1>
          <p>Explore a structured learning atlas for military systems, defence technology and responsible peace operations familiarisation.</p>
          <div className="welcome-actions">
            <Link className="button button-primary" to="/catalogue">Explore knowledge base <Icon name="arrow" size={16} /></Link>
            <Link className="button button-ghost" to="/academy">Learning pathways</Link>
          </div>
        </div>
        <div className="welcome-index"><span>PROJECT INDEX</span><strong>SPX / 001</strong><small>KNOWLEDGE BASE RELEASE</small></div>
      </section>

      <section className="stat-grid" aria-label="Knowledge base counts">
        {highlights.map((item) => (
          <div className="stat-card" key={item.label}>
            <div className="stat-icon"><Icon name={item.icon} size={19} /></div>
            <div className="stat-copy"><span>{item.label}</span><strong>{item.value}</strong><small>{item.detail}</small></div>
          </div>
        ))}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><div className="eyebrow">GLOBAL KNOWLEDGE ARCHITECTURE</div><h2>Explore the divisions</h2><p>Ten connected areas form the SPECTRA knowledge architecture.</p></div>
          <Link to="/catalogue" className="text-link">View catalogue <Icon name="arrow" size={15} /></Link>
        </div>
        <div className="domain-grid">{domains.map((domain) => <DomainCard key={domain.id} domain={domain} />)}</div>
      </section>

      <section className="feature-grid">
        <article className="feature-panel feature-panel-3d">
          <div className="feature-panel-icon"><Icon name="box" size={22} /></div>
          <div className="eyebrow">VISUAL LEARNING</div><h2>3D Studio</h2>
          <p>Planned interactive educational models, annotations and non-operational visual exploration.</p>
          <Link to="/studio-3d" className="text-link">Explore the concept <Icon name="arrow" size={15} /></Link>
        </article>
        <article className="feature-panel feature-panel-learning">
          <div className="feature-panel-icon"><Icon name="graduation" size={22} /></div>
          <div className="eyebrow">STRUCTURED EDUCATION</div><h2>Learning Academy</h2>
          <p>Planned courses, knowledge checks and supplementary peacekeeping familiarisation.</p>
          <Link to="/academy" className="text-link">View learning framework <Icon name="arrow" size={15} /></Link>
        </article>
      </section>

      <section className="notice-panel">
        <div className="notice-icon"><Icon name="shield" size={21} /></div>
        <div><strong>Responsible learning. Clear boundaries.</strong><p>SPECTRA is supplementary education, not operational training, weapons proficiency instruction or an official UN or government programme.</p></div>
        <span className="status-pill">Governance baseline</span>
      </section>
    </div>
  );
}
