import React from "react";
import AllProducts from "@/data/AllProducts.json";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import ProductsLayout from "@/Components/ProductsLayout/ProductsLayout";

export default function Mobiles() {
  const brands = [...new Set(AllProducts.map(p => p.brand))];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <ProductsLayout
        products={AllProducts}
        ProductCard={ProductCard}
        brands={brands}
      />
    </div>
  );
}
