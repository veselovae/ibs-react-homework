import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./routes/routes.const";

import { CatalogPage } from "@pages/CatalogPage";
import { ProductPage } from "@pages/ProductPage";
import { Error404Page } from "@pages/Error404Page";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.default} element={<CatalogPage />} />

      <Route path={ROUTES.catalog}>
        <Route index element={<CatalogPage />} />
        <Route path={ROUTES.product} element={<ProductPage />} />
      </Route>

      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default App;
