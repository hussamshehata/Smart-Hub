import React from "react";
import smartphones from "@/data/smartphones.json";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import ProductsLayout from "@/Components/ProductsLayout/ProductsLayout";

export default function Mobiles() {
  const brands = [...new Set(smartphones.map(p => p.brand))];

  const storageOptions = [...new Set(smartphones.flatMap(p => p.storageOptions))];
  const ramOptions = [...new Set(smartphones.flatMap(p => p.ramOptions))];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <ProductsLayout
        products={smartphones}
        ProductCard={ProductCard}
        brands={brands}
        storageOptions={storageOptions}
        ramOptions={ramOptions}
      />
    </div>
  );
}
