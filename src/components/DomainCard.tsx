import { Link } from "react-router";
import type { KnowledgeDomain } from "../types";
import Icon from "./Icon";
import StatusPill from "./StatusPill";

export default function DomainCard({ domain }: { domain: KnowledgeDomain }) {
  return (
    <Link className="domain-card" to={`/domains/${domain.slug}`}>
      <div className="domain-card-top">
        <span className="domain-number">{domain.number}</span>
        <span className="domain-icon"><Icon name={domain.icon as Parameters<typeof Icon>[0]["name"]} size={22} /></span>
      </div>
      <h3>{domain.title}</h3>
      <p>{domain.description}</p>
      <div className="domain-card-bottom">
        <StatusPill />
        <span className="card-arrow"><Icon name="arrow" size={17} /></span>
      </div>
    </Link>
  );
}
