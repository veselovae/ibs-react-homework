import { Header } from "@src/components/Header";
import { ProductCard } from "./components/ProductCard";

export const ProductPage = () => {
  return (
    <div className="product-page page">
      <Header />
      <ProductCard />
    </div>
  );
};
