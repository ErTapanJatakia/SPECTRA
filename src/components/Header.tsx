import { useState } from "react";
import type { FormEvent, RefObject } from "react";
import { useLocation, useNavigate } from "react-router";
import Icon from "./Icon";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}

function getPageLabel(pathname: string): string {
  if (pathname === "/") return "Overview";
  if (pathname.startsWith("/domains/")) return "Knowledge division";
  if (pathname.startsWith("/equipment/")) return "Equipment profile";
  if (pathname.startsWith("/countries/")) return "Country profile";
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const labels: Record<string,string> = {
    catalogue:"Equipment catalogue", countries:"Countries & forces",
    "studio-3d":"3D Studio", academy:"Learning Academy",
    peacekeeping:"UN Peacekeeping", research:"Research library",
    settings:"Settings", search:"Search results"
  };
  return labels[segment] ?? "Workspace";
}

export default function Header({ onMenuToggle, menuOpen, menuButtonRef }: HeaderProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const pageLabel = getPageLabel(location.pathname);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value) navigate(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <header className="topbar">
      <button
        ref={menuButtonRef}
        className="icon-button mobile-menu-button"
        type="button"
        onClick={onMenuToggle}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      ><Icon name="menu" /></button>
      <div className="breadcrumb" aria-label="Current page">
        <span className="breadcrumb-root">SPECTRA</span><Icon name="chevron" size={14} /><span>{pageLabel}</span>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">{pageLabel} page loaded</span>
      <form className="global-search" role="search" onSubmit={handleSubmit}>
        <Icon name="search" size={17} />
        <input type="search" aria-label="Search SPECTRA divisions and equipment" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search countries, systems, equipment..." />
        <kbd>Enter</kbd>
      </form>
      <div className="topbar-actions">
        <ThemeSwitcher />
        <a className="owner-link" href="https://github.com/ErTapanJatakia/SPECTRA" target="_blank" rel="noreferrer" aria-label="Open SPECTRA repository"><Icon name="external" size={17} /></a>
      </div>
    </header>
  );
}
