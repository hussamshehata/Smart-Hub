import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/Components/ui/button";
import ThemeToggle from "../All-Buttons/ThemeToggle.jsx";
import CartSidebar from "./Sidebar.jsx";
import Menucart from "./Menucart.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link to="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-primary">
              Shop
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">
              Contact
            </Link>
          </div>

          {/* Right Section */}

          <div className="flex items-center gap-1">
            {/* Cart Icon with Badge */}

            <Menucart />
            {/* Sign in Button */}
            <Button className="me-2" variant="outline" size="default">
              sign in
            </Button>
            <ThemeToggle />

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
              <Link to="/" className="text-gray-700 hover:text-primary">
                Home
              </Link>
              <Link to="/shop" className="text-gray-700 hover:text-primary">
                Shop
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary">
                Blog
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
