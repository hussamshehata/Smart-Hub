import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import smartphonesData from "../../../data/smartphones.json";
import ProductButtons from "../../../Components/All-Buttons/productbuttons.jsx";
import SortAndViewButtons from "../../../Components/ui/SortAndViewButtons.jsx";

export default function Mobiles() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("grid4");
  const [sortOption, setSortOption] = useState("Default");

  const fallbackImage =
    "https://via.placeholder.com/400x400.png?text=No+Image";

  useEffect(() => {
   
    const cleanData = smartphonesData.map((item) => ({
      ...item,
      image: item.image && item.image.startsWith("http")
        ? item.image
        : fallbackImage,
    }));

    setProducts(cleanData);
    localStorage.setItem("products", JSON.stringify(cleanData));
  }, []);


  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Name: A-Z":
        return a.name.localeCompare(b.name);
      case "Name: Z-A":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const gridClass =
    view === "list"
      ? "grid-cols-1"
      : view === "grid2"
      ? "grid-cols-2"
      : view === "grid3"
      ? "grid-cols-3"
      : "grid-cols-4";

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <section className="max-w-7xl mx-auto mb-12 p-2">
        <h1 className="text-3xl font-bold mb-6">Mobiles</h1>
        <SortAndViewButtons
          view={view}
          setView={setView}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <section className="mt-16">
          <h2 className="text-4xl mb-10 pt-10">Best Seller</h2>

          <div className={`grid ${gridClass} gap-8`}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-gradient-to-br from-neutral-150 to-neutral-200 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
                  view === "list" ? "flex items-center gap-5 p-4" : ""
                }`}
              >
                <Link
                  to={`/product/${product.id}`}
                  className={`relative overflow-hidden ${
                    view === "list" ? "w-1/3 rounded-xl" : "rounded-t-2xl"
                  }`}
                >
                  <img
                    src={product.image || fallbackImage}
                    alt={product.name}
                    onError={(e) => (e.target.src = fallbackImage)}
                    className={`object-cover object-center transition-all duration-300 ${
                      view === "list"
                        ? "w-full h-48 rounded-lg"
                        : "w-full h-72 rounded-t-2xl"
                    }`}
                  />
                </Link>

                <div className="p-5 flex-1">
                  <h3 className="text-lg font-semibold mb-1 text-muted-700">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-500 mb-4 line-clamp-2">
                    {product.description
                      ? product.description
                      : `${product.brand} smartphone with ${product.storage} storage and ${product.camera} camera.`}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-muted-700">
                      ${product.price}
                    </span>
                    <ProductButtons product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </motion.div>
  );
}
