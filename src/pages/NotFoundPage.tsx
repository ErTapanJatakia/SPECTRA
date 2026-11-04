import { Link } from "react-router";
import Icon from "../components/Icon";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-mark"><Icon name="compass" size={38} /></div>
      <span className="eyebrow">404 / ROUTE NOT FOUND</span>
      <h1>This path is outside the atlas.</h1>
      <p>The requested page may have moved or may not be part of the current foundation release.</p>
      <Link to="/" className="button button-primary">Return to SPECTRA <Icon name="arrow" size={16} /></Link>
    </main>
  );
}
