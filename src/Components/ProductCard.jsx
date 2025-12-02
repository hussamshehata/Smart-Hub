import React, { useState } from "react";
import AllProducts from "../data/AllProducts.json";
import SortAndViewButtons from "./ui/SortAndViewButtons";
export default function ProductCard() {
  const [favorites, setFavorites] = useState({});
  const [cart, setCart] = useState({});
  const [view, setView] = useState("grid3");
  const [sortOption, setSortOption] = useState("Default");

  const products = AllProducts.filter(
    (p) => p.soldCount !== undefined && p.rating !== undefined
  );

  const getSortedProducts = () => {
    let sorted = [...products];

    switch (sortOption) {
      case "Price: Low to High":
        sorted.sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
        break;
      case "Price: High to Low":
        sorted.sort((a, b) => parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
        break;
      case "Name: A-Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name: Z-A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Newest":
        sorted.reverse();
        break;
      case "Default":
      default:
        sorted.sort((a, b) => {
          const aCount = parseFloat(a.soldCount.replace("k", "")) * 1000;
          const bCount = parseFloat(b.soldCount.replace("k", "")) * 1000;
          return bCount - aCount;
        });
    }

    return sorted;
  };

  const sortedProducts = getSortedProducts();

  const gridClasses = {
    grid3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
    grid2: "grid grid-cols-1 sm:grid-cols-2 gap-8",
    list: "flex flex-col gap-6",
  };

  const cardClasses = view === "list" 
    ? "flex flex-row gap-4  rounded-lg shadow-xl hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition-shadow duration-300 group overflow-hidden"
    : "flex flex-col gap-2 text-neutral-700  w-full rounded-lg shadow-xl hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition-shadow duration-300 group";

  return (
    <div className="flex flex-col gap-8 mx-4 sm:mx-10 my-10 w-full">
      {/* Sort and View Controls */}
      <SortAndViewButtons
        view={view}
        setView={setView}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {/* Products Grid/List */}
      <div className={gridClasses[view]}>
        {sortedProducts.map((product) => (
          <div key={product.id} className={cardClasses}>
            <div
              className={`flex flex-col justify-between rounded-t-lg ${view === "list" ? "w-64 h-64" : "w-full h-96"} p-4 group relative`}
              style={{
                backgroundImage: `url(${product.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex justify-between">
                {product.soldCount && (
                  <p className="text-1xl bg-white/80 rounded-sm font-bold py-2 px-4 w-max">
                    {product.soldCount}
                  </p>
                )}

                <div
                  className="bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={() =>
                    setFavorites({
                      ...favorites,
                      [product.id]: !favorites[product.id],
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={favorites[product.id] ? "red" : "none"}
                    stroke={favorites[product.id] ? "red" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                  </svg>
                </div>
              </div>

              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary-500 text-neutral-100 px-4 py-2 rounded-md hover:bg-primary-600"
                onClick={() =>
                  setCart((prev) => ({
                    ...prev,
                    [product.id]: !prev[product.id],
                  }))
                }
              >
                {cart[product.id] ? "Added to cart" : "Add to cart"}
              </button>
            </div>

            <div className={`p-4 ${view === "list" ? "flex-1" : ""}`}>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={i < product.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="lucide lucide-star-icon lucide-star text-neutral-400"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                  </svg>
                ))}
              </div>

              <p className="text-1xl font-bold text-neutral-700">{product.name}</p>
              <p className="text-1xl text-neutral-700">{product.description}</p>
              <p className="text-1xl font-bold text-neutral-700">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}