import { BrowserRouter, Route, Routes } from "react-router-dom";
import PatientMedMatchView, {
  url as patientMedMatchUrl,
} from "./components/views/PatientMedMatchView";
import HomeView from "./components/views/HomeView";
import NotFoundView from "./components/views/NotFoundView";
import LasaScanView, {
  url as lasaScanUrl,
} from "./components/views/LasaScanView";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path={lasaScanUrl} element={<LasaScanView />} />
        <Route path={patientMedMatchUrl} element={<PatientMedMatchView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
