import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Menu, X, ShoppingCart,} from "lucide-react";
import { Button } from "@/Components/ui/button";
import ThemeToggle from "../All-Buttons/ThemeToggle.jsx";
import CartSidebar from "./Sidebar.jsx"


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, ] = useState(2); // example number, later this can come from context or API
    const [isCartOpen, setIsCartOpen] = React.useState(false);

  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: 'Tidy Table',
      price: 94.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Red Chair',
      price: 89.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Table Lamp',
      price: 45.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop'
    }
  ]);
  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
    return (
        <>
            {/* Announcement Bar */}
            <div className="bg-gray-900 text-white text-sm text-center py-2">
                ✨ Free shipping on orders over $50
            </div>

            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto  py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-primary">
                        SmartHub
                    </Link>


                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
                        <Link to="/shop" className="text-gray-700 hover:text-primary">Shop</Link>
                        <Link to="/blog" className="text-gray-700 hover:text-primary">Blog</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
                    </div>


                    {/* Right Section */}
                    <div className="flex items-center gap-1">
                        {/* Cart Icon with Badge */}
                        <div className="relative hidden sm:flex">
                            <Button
                                variant="outline"
                                size="icon"
                                className="me-2"
                                onClick={
                                    () => setIsCartOpen(true)
                                }
                            >
                                <ShoppingCart size={18} />
                            </Button>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
                            )}
                        </div>

                        {/* Sign in Button */}
                        <Button className= "me-2" variant="outline" size="default">
                            sign in
                        </Button>
                        <ThemeToggle/>


                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-700 hover:text-primary"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-gray-50 border-t border-gray-200">
                        <div className="flex flex-col items-center py-3 space-y-2">
                            <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
                            <Link to="/shop" className="text-gray-700 hover:text-primary">Shop</Link>
                            <Link to="/blog" className="text-gray-700 hover:text-primary">Blog</Link>
                            <Link to="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
                        </div>
                    </div>
                )}
            </nav>
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

