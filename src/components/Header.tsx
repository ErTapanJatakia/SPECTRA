import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import Icon from "./Icon";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps { onMenuToggle: () => void; }

function getPageLabel(pathname: string): string {
  if (pathname === "/") return "Overview";
  if (pathname.startsWith("/domains/")) return "Knowledge division";
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const labels: Record<string,string> = {
    catalogue:"Equipment catalogue", countries:"Countries & forces",
    "studio-3d":"3D Studio", academy:"Learning Academy",
    peacekeeping:"UN Peacekeeping", research:"Research library",
    settings:"Settings", search:"Search results"
  };
  return labels[segment] ?? "Workspace";
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value) navigate(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <header className="topbar">
      <button className="icon-button mobile-menu-button" type="button" onClick={onMenuToggle} aria-label="Open navigation"><Icon name="menu" /></button>
      <div className="breadcrumb"><span className="breadcrumb-root">SPECTRA</span><Icon name="chevron" size={14} /><span>{getPageLabel(location.pathname)}</span></div>
      <form className="global-search" role="search" onSubmit={handleSubmit}>
        <Icon name="search" size={17} />
        <input type="search" aria-label="Search SPECTRA divisions" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search knowledge divisions..." />
        <kbd>Enter</kbd>
      </form>
      <div className="topbar-actions">
        <ThemeSwitcher />
        <a className="owner-link" href="https://github.com/ErTapanJatakia/SPECTRA" target="_blank" rel="noreferrer" aria-label="Open SPECTRA repository"><Icon name="external" size={17} /></a>
      </div>
    </header>
  );
}
