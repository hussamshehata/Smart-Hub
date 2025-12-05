// src/pages/Shop.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import SortAndViewButtons from "../Components/ui/SortAndViewButtons.jsx";
import ProductCard from "../Components/ProductCard.jsx";

export default function Shop() {
  const [view] = useState("grid3");
  const [sortOption] = useState("Default");

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
        <ProductCard view={view} sortOption={sortOption} />
      </section>
    </motion.div>
  );
}
