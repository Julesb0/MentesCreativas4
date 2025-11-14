import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import HomePage from "../pages/HomePage";
// EnergyLab eliminado según requerimiento
import Shapes3D from "../views/Shapes3D";
import SolarSystem from "../views/SolarSystem";
import ButterfliesView from "../domains/butterflies/pages/ButterfliesView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/sistema-solar" element={<SolarSystem />} />
        <Route path="/formas-3d" element={<Shapes3D />} />
        <Route path="/simetria-mariposas" element={<ButterfliesView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
