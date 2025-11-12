import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/Home";
import Ciencias from "../views/Ciencias";
import Matematicas from "../views/Matematicas";
import Tecnologia from "../views/Tecnologia";
import Acerca from "../views/Acerca";
import Layout from "../components/layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ciencias" element={<Ciencias />} />
        <Route path="/matematicas" element={<Matematicas />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
