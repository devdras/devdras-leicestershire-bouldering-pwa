import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Areas from "./pages/Areas.tsx";
import Area from "./pages/Area.tsx";
import Sector from "./pages/Sector.tsx";
import Block from "./pages/Block.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<Areas />} />
        <Route path="/:area" element={<Area />} />
        <Route path="/:area/:sector" element={<Sector />} />
        <Route path="/:area/:sector/:block" element={<Block />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
