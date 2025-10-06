import React from "react";
import ProductButtons from "./ProductButtons";


export default function productCard() {
  const products = [
    {
      id: 1,
      name: "IPHONE 17 Pro Max",
      description: "High-quality sound with active noise cancellation.",
      price: 1499.99,
      image:
        "src/assets/Iphone.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and stay connected on the go.",
      price: 149.99,
      image:
        "src/assets/smartwatch.jpg",
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

  return (
        <section className="p-10">
            <h1 className="text-center text-7xl mb-16">Best Seller </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-br from-gray-150 to-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1 text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-black">
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
