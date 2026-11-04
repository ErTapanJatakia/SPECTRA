import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <div className="app-frame">
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      {menuOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <div className="main-column">
        <Header onMenuToggle={() => setMenuOpen((value) => !value)} />
        <main id="main-content" className="main-content">
          <Outlet />
        </main>
        <footer className="app-footer">
          <span>© 2026 SPECTRA · Independent educational initiative</span>
          <span>Not affiliated with or endorsed by the United Nations or any government.</span>
        </footer>
      </div>
    </div>
  );
}
