import React from "react";
import laptops from "@/data/laptops.json";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import ProductsLayout from "@/Components/ProductsLayout/ProductsLayout";

export default function Laptops() {
  const brand = [...new Set(laptops.map(p => p.brand))];

  const storageOptions = [...new Set(laptops.flatMap(p => p.storageOptions))];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <ProductsLayout
        products={laptops}
        ProductCard={ProductCard}
        brands={brand}
        storageOptions={storageOptions}
      />
    </div>
  );
}
