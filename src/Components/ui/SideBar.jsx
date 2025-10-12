import React, { useState } from "react";

export default function SidebarFilter() {
  const [selectedCategory, setSelectedCategory] = useState("Mobiles");
  const [selectedPrice, setSelectedPrice] = useState("$0.00 - 99.99");

  const categories = [
    "All Products",
    "Mobiles",
    "Smart Watches",
    "Headphones",
    "Laptops",
  ];

  const prices = [
    "$0.00 - 99.99",
    "$100.00 - 199.99",
    "$200.00 - 299.99",
    "$300.00 - 399.99",
    "$400.00+",
  ];

  return (
    <div className="w-full md:w-64 p-4 mt-8">
      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-base font-bold tracking-wide mb-3">CATEGORIES</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left text-[15px] ${
                  selectedCategory === cat
                    ? "font-semibold text-neutral-700 underline decoration-neutral-700 underline-offset-4"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-base font-bold tracking-wide mb-3">PRICE</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 border-neutral-400 rounded focus:ring-0"
              checked={false}
              readOnly
            />
            <span className="text-neutral-500 text-[15px]">All Price</span>
          </li>

          {prices.map((price) => (
            <li key={price} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPrice === price}
                onChange={() => setSelectedPrice(price)}
                className="w-4 h-4 border-neutral-400 rounded text-neutral-700 focus:ring-0 checked:bg-neutral-700"
              />
              <span className="text-neutral-700 text-[15px]">{price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
