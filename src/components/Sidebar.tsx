import { NavLink } from "react-router";
import Icon from "./Icon";
import { navigationGroups, navigationItems } from "../data/navigation";

interface SidebarProps {
  open: boolean;
  onNavigate: () => void;
}

export default function Sidebar({ open, onNavigate }: SidebarProps) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`} aria-label="Main navigation">
      <div className="brand-lockup">
        <div className="brand-mark"><Icon name="globe" size={25} /></div>
        <div>
          <div className="brand-name">SPECTRA</div>
          <div className="brand-subtitle">KNOWLEDGE ATLAS</div>
        </div>
      </div>

      <div className="sidebar-project">
        <span className="eyebrow">PROJECT STATUS</span>
        <div className="sidebar-status"><span className="status-dot" />Foundation release</div>
        <p>Independent educational and research initiative.</p>
      </div>

      <nav className="sidebar-nav">
        {navigationGroups.map((group) => (
          <section className="nav-group" key={group.id}>
            <h2>{group.label}</h2>
            {navigationItems.filter((item) => item.group === group.id).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onNavigate}
                className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={18} />
                <span>{item.label}</span>
                {item.path === "/studio-3d" && <span className="nav-mini-tag">3D</span>}
              </NavLink>
            ))}
          </section>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-line"><Icon name="shield" size={15} />Responsible learning</div>
        <p>Supplementary education only. Not official military or UN training.</p>
        <a href="https://github.com/ErTapanJatakia/SPECTRA/blob/main/LICENSE" target="_blank" rel="noreferrer">Proprietary rights notice <Icon name="external" size={12} /></a>
      </div>
    </aside>
  );
}
