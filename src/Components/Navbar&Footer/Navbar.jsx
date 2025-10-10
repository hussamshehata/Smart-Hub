import React, { useState } from "react";
import {Menu, X, ShoppingCart,} from "lucide-react";
import { Button } from "@/Components/All-Buttons/ui/button";
import ThemeToggle from "../All-Buttons/ThemeToggle.jsx";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, ] = useState(2); // 👈 example number, later this can come from context or API

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
                    <a href="#" className="text-xl font-bold text-primary">
                        SmartHub
                    </a>
                    

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6">
                        <a href="#" className="text-gray-700 hover:text-primary">Home</a>
                        <a href="#" className="text-gray-700 hover:text-primary">Shop</a>
                        <a href="#" className="text-gray-700 hover:text-primary">Blog</a>
                        <a href="#" className="text-gray-700 hover:text-primary">Contact</a>
                    </div>


                    {/* Right Section */}
                    <div className="flex items-center gap-1">
                        {/* Cart Icon with Badge */}
                        <div className="relative hidden sm:flex">
                            <Button
                                variant="outline"
                                size="icon"
                                className="me-2"
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
                            <a href="#" className="text-gray-700 hover:text-primary">Home</a>
                            <a href="#" className="text-gray-700 hover:text-primary">Shop</a>
                            <a href="#" className="text-gray-700 hover:text-primary">Blog</a>
                            <a href="#" className="text-gray-700 hover:text-primary">Contact</a>
                        </div>
                    </div>
                )}
            </nav>

        </>
    );
}

