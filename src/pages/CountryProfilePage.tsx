import { Link, useParams } from "react-router";
import PageHeading from "../components/PageHeading";
import EmptyState from "../components/EmptyState";
import EquipmentCard from "../components/EquipmentCard";
import { getCountryById, getEquipmentForCountry } from "../data/knowledgeBase";

export default function CountryProfilePage() {
  const { countryId } = useParams();
  const country = getCountryById(countryId?.toUpperCase());
  if (!country) {
    return <div className="page-stack"><PageHeading eyebrow="GLOBAL DIRECTORY" title="Country not found" description="The requested ISO country identifier is not in the current sample directory." /><Link className="text-link" to="/countries">Return to countries <span>→</span></Link></div>;
  }

  const equipment = getEquipmentForCountry(country.id);
  return (
    <div className="page-stack">
      <Link className="back-link" to="/countries">← Back to countries & forces</Link>
      <PageHeading eyebrow={`COUNTRY PROFILE / ISO ${country.isoAlpha2}`} title={country.name} description={`A curated starter collection of publicly documented equipment records associated with ${country.name}. This is not an exhaustive inventory of national defence capability.`} />
      <div className="country-profile-stats">
        <div><span>ISO alpha-2</span><strong>{country.isoAlpha2}</strong></div>
        <div><span>ISO alpha-3</span><strong>{country.isoAlpha3}</strong></div>
        <div><span>Region</span><strong>{country.region}</strong></div>
        <div><span>Sample equipment records</span><strong>{equipment.length}</strong></div>
      </div>
      <section className="section-block">
        <div className="section-heading"><div><div className="eyebrow">CURATED SAMPLE</div><h2>Associated equipment records</h2></div></div>
        {equipment.length ? <div className="equipment-grid">{equipment.map((record) => <EquipmentCard key={record.id} record={record} />)}</div> : <EmptyState title="No equipment records yet" description="Additional records will be added after source verification and editorial review." icon="layers" />}
      </section>
      <div className="catalogue-governance"><strong>Country attribution</strong><span>Origin, development, manufacturer and operator are separate relationships. A record appearing here does not imply that the equipment is currently operated by the country.</span></div>
    </div>
  );
}
