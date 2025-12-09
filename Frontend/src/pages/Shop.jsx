import React from "react";
import Allproducts from "@/data/Allproducts.json";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import ProductsLayout from "@/Components/ProductsLayout/ProductsLayout";

export default function Mobiles() {
  const brands = [...new Set(Allproducts.map(p => p.brand))];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <ProductsLayout
        products={Allproducts}
        ProductCard={ProductCard}
        brands={brands}
      />
    </div>
  );
}
