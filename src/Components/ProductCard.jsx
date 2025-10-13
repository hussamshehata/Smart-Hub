// src/Components/ProductCard.jsx
import React from "react";
import ProductButtons from "./All-Buttons/productbuttons.jsx";
import { Link } from "react-router-dom";

export default function ProductCard({ view, sortOption }) {
  const products = [
    {
      id: 1,
      name: "IPHONE 17 Pro Max",
      description: "High-quality sound with active noise cancellation.",
      price: 1499.99,
      image:
        "https://res.cloudinary.com/dmsvr8dnt/image/upload/v1760220178/Iphone_wulxcf.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and stay connected on the go.",
      price: 149.99,
      image:
        "https://res.cloudinary.com/dmsvr8dnt/image/upload/v1760220178/smartwatch_of3d0s.jpg",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Portable speaker with deep bass and crystal sound.",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },
  ];
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
      : "grid-cols-3";

  return (
    <section className=" mt-24">
      <h1 className="text-5xl mb-16 pt-20">Best Seller</h1>
      <div className={`grid ${gridClass} gap-10`}>
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
                src={product.image}
                alt={product.name}
                className={`object-cover ${
                  view === "list" ? "w-full h-48 rounded-lg" : "w-full h-96"
                }`}
              />
            </Link>

            <div className="p-5 flex-1">
              <h3 className="text-lg font-semibold mb-1 text-muted-700">
                {product.name}
              </h3>
              <p className="text-sm text-muted-500 mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-muted-700">
                  ${product.price}
                </span>
                <ProductButtons />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
