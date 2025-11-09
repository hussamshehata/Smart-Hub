import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/Components/ui/button";
import ThemeToggle from "../All-Buttons/ThemeToggle.jsx";
import CartSidebar from "./Sidebar.jsx";

export default function Menucart() {
  const [cartCount] = useState(2); // example number, later this can come from context or API
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: "Tidy Table",
      price: 94.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Red Chair",
      price: 89.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Table Lamp",
      price: 45.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop",
    },
  ]);
  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };
  return (
    <>
      {/* Announcement Bar */}

      {/* Navbar */}
      <div className="relative hidden sm:flex">
        <Button
          variant="outline"
          size="icon"
          className="me-2"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart size={18} />
        </Button>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </>
  );
}
