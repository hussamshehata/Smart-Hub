// src/Components/ProductCard.jsx
import React, { useEffect } from "react";
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
    {
      id: 4,
      name: "Wireless Earbuds",
      description: "Premium sound quality with ergonomic design.",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Laptop Stand",
      description: "Adjustable aluminum stand for better posture.",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Mechanical Keyboard",
      description: "RGB backlit keyboard with tactile switches.",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      name: "USB-C Hub",
      description: "Multi-port hub with HDMI and USB 3.0 ports.",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      name: "Webcam HD",
      description: "1080p webcam with built-in microphone.",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      name: "Gaming Mouse",
      description: "High-precision optical sensor with RGB lighting.",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
    },
  ];

   useEffect(() => {
      localStorage.setItem("products", JSON.stringify(products));
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
                <ProductButtons product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}