import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Areas from "./pages/Areas.tsx";
import Area from "./pages/Area.tsx";
import Sectors from "./pages/Sectors.tsx";
import Blocks from "./pages/Blocks.tsx";
import Navbar from "./components/Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar>
              <Areas />
            </Navbar>
          }
        />
        <Route
          path="/:area"
          element={
            <Navbar>
              <Area />
            </Navbar>
          }
        />
        <Route
          path="/:area/:sector"
          element={
            <Navbar>
              <Sectors />
            </Navbar>
          }
        />
        <Route
          path="/:area/:sector/:block"
          element={
            <Navbar>
              <Blocks />
            </Navbar>
          }
        />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
