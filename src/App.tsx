import { BrowserRouter, Route, Routes } from "react-router";
import AppShell from "./components/AppShell";
import DashboardPage from "./pages/DashboardPage";
import DirectoryPage from "./pages/DirectoryPage";
import DomainPage from "./pages/DomainPage";
import SearchPage from "./pages/SearchPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="catalogue" element={<PlaceholderPage page="catalogue" />} />
          <Route path="countries" element={<DirectoryPage />} />
          <Route path="domains/:slug" element={<DomainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="studio-3d" element={<PlaceholderPage page="studio" />} />
          <Route path="academy" element={<PlaceholderPage page="academy" />} />
          <Route path="peacekeeping" element={<PlaceholderPage page="peacekeeping" />} />
          <Route path="research" element={<PlaceholderPage page="research" />} />
          <Route path="settings" element={<PlaceholderPage page="settings" />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
