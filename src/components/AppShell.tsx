import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpen = useRef(false);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.querySelector<HTMLElement>("#main-navigation a[href]")?.focus();
    } else if (wasMenuOpen.current) {
      menuButtonRef.current?.focus();
    }
    wasMenuOpen.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const sidebar = document.getElementById("main-navigation");
      const focusable = sidebar?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <div className="app-frame">
      <a className="skip-link" href="#main-content" tabIndex={0}>Skip to main content</a>
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      {menuOpen && <button className="mobile-scrim" type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <div className="main-column">
        <Header
          onMenuToggle={() => setMenuOpen((value) => !value)}
          menuOpen={menuOpen}
          menuButtonRef={menuButtonRef}
        />
        <main id="main-content" className="main-content" tabIndex={-1}>
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
