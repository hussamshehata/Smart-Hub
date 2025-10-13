// src/pages/Shop.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import SortAndViewButtons from "@/Components/ui/SortAndViewButtons";
import ProductCard from "@/Components/ProductCard.jsx";

export default function Shop() {
  const [view, setView] = useState("grid3");
  const [sortOption, setSortOption] = useState("Default");

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <section className="max-w-7xl mb-12 mx-auto p-2">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>
        <SortAndViewButtons
          view={view}
          setView={setView}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <ProductCard view={view} sortOption={sortOption} />
      </section>
    </motion.div>
  );
}
