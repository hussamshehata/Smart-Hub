import React from "react";
import accessories from "@/data/accessories.json";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import ProductsLayout from "@/Components/ProductsLayout/ProductsLayout";

export default function Accessories() {
  const brand = [...new Set(accessories.map(p => p.brand))];


  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <ProductsLayout
        products={accessories}
        ProductCard={ProductCard}
        brands={brand}

      />
    </div>
  );
}
