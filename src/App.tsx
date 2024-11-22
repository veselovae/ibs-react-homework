import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import MainPage from "./components/MainPage";
import Catalog from "./components/Catalog/Catalog";
import ProductCard from "./components/ProductCard/ProductCard";
import Page404 from "./components/Page404/Page404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Catalog />} />
        <Route path="product/:productId" element={<ProductCard />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
