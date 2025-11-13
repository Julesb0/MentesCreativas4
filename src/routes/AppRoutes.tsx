import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import EnergyLab from "../views/EnergyLab";
import Shapes3D from "../views/Shapes3D";
import SolarSystem from "../views/SolarSystem";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/sistema-solar" element={<SolarSystem />} />
        <Route path="/formas-3d" element={<Shapes3D />} />
        <Route path="/energia" element={<EnergyLab />} />
        <Route path="/" element={<Navigate to="/sistema-solar" replace />} />
        <Route path="*" element={<Navigate to="/sistema-solar" replace />} />
      </Route>
    </Routes>
  );
}
