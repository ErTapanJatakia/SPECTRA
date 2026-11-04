import { Link } from "react-router";
import PageHeading from "../components/PageHeading";
import Icon from "../components/Icon";
import { countries, getEquipmentForCountry } from "../data/knowledgeBase";

export default function DirectoryPage() {
  return (
    <div className="page-stack">
      <PageHeading eyebrow="GLOBAL DIRECTORY / ISO 3166" title="Countries & armed forces" description="Country identity uses ISO 3166-1 alpha-2 and alpha-3 identifiers. Origin, development, manufacturer and operator relationships are stored separately." />
      <div className="info-strip"><Icon name="info" size={18} /><span>This is an initial five-country sample directory, not a comprehensive list of national armed forces or equipment inventories. Country records link to individually sourced equipment profiles.</span></div>
      <div className="country-grid">
        {countries.map((country) => {
          const count = getEquipmentForCountry(country.id).length;
          return (
            <Link className="country-card" key={country.id} to={`/countries/${country.id}`}>
              <div className="country-card-top"><span className="country-code">{country.isoAlpha2}</span><span className="country-alpha3">{country.isoAlpha3}</span></div>
              <h2>{country.name}</h2>
              <p>{country.region}</p>
              <div className="country-card-footer"><span>{count} sample records</span><Icon name="arrow" size={17} /></div>
            </Link>
          );
        })}
      </div>
      <div className="catalogue-governance"><strong>Classification principle</strong><span>ISO codes identify the country. They do not independently establish sovereignty, military ownership, current equipment operators or territorial claims. Such relationships require separate, dated sources.</span></div>
    </div>
  );
}
