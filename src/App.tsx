import { BrowserRouter, Route, Routes } from "react-router";
import AppShell from "./components/AppShell";
import DashboardPage from "./pages/DashboardPage";
import DirectoryPage from "./pages/DirectoryPage";
import CountryProfilePage from "./pages/CountryProfilePage";
import DomainPage from "./pages/DomainPage";
import EquipmentCataloguePage from "./pages/EquipmentCataloguePage";
import EquipmentProfilePage from "./pages/EquipmentProfilePage";
import SearchPage from "./pages/SearchPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import Studio3DPage from "./pages/Studio3DPage";
import AcademyPage from "./pages/AcademyPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="catalogue" element={<EquipmentCataloguePage />} />
          <Route path="countries" element={<DirectoryPage />} />
          <Route path="countries/:countryId" element={<CountryProfilePage />} />
          <Route path="equipment/:slug" element={<EquipmentProfilePage />} />
          <Route path="domains/:slug" element={<DomainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="studio-3d" element={<Studio3DPage />} />
          <Route path="academy" element={<AcademyPage />} />
          <Route path="peacekeeping" element={<PlaceholderPage page="peacekeeping" />} />
          <Route path="research" element={<PlaceholderPage page="research" />} />
          <Route path="settings" element={<PlaceholderPage page="settings" />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
