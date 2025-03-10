import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Crags from "./Crags.tsx";
import CragDetails from "./CragDetails.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="crags">
          <Route index element={<Crags />} />
          <Route path=":cragName" element={<CragDetails />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
