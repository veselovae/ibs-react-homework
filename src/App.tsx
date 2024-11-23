import React from "react";
import { Route, Routes } from "react-router-dom";

import { routes } from "./routes.const";

import { MainPage } from "./components/MainPage";
import { Catalog } from "./components/Catalog/Catalog";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { Page404 } from "./components/Page404/Page404";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={routes.default} element={<MainPage />}>
        <Route index element={<Catalog />} />
        <Route path={routes.product} element={<ProductCard />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
