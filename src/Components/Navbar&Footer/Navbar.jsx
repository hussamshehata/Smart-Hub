import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import UserDropdown from "./UserDropdown.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import MobileMenu from "./MobileMenu.jsx";
import Menucart from "@/Components/Navbar&Footer/Menucart.jsx";

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Announcement Bar */}
            <div className="bg-primary-900 text-white text-sm text-center py-2">
                🎧 <span className="font-medium">30% off storewide — Limited time only!</span>{" "}
                <Link to="/shop" className="underline hover:text-gray-300 ml-1">Shop Now →</Link>
            </div>

            <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-semibold text-primary-600">Smart Hub.</Link>

<<<<<<< Updated upstream
                    {/* Desktop links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-black transition">Home</Link>
                        <Link to="/shop" className="text-gray-700 hover:text-black transition">Shop</Link>
                        <Link to="/product" className="text-gray-700 hover:text-black transition">Product</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-black transition">Contact</Link>
=======
                    {/* --- Desktop Links --- */}
                    <div className="hidden md:flex items-center space-x-8 relative">
                        {/* Home */}
                        <Link
                            to="/"
                            className="relative text-gray-700 hover:text-black transition duration-200
              before:content-[''] before:absolute before:bottom-0 before:left-0
              before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              hover:before:w-full"
                        >
                            Home
                        </Link>

                        {/* Shop Dropdown */}
                        <div className="relative group">
                            <button
                                className="flex items-center gap-1 text-gray-700 hover:text-black relative transition duration-200
                before:content-[''] before:absolute before:bottom-0 before:left-0
                before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
                group-hover:before:w-full"
                            >
                                Shop <ChevronDown size={16} />
                            </button>
                            <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-100 shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {["All product" , "Laptop", "Mobiles", "Accessories"].map((item) => (
                                    <Link
                                        key={item}
                                        to={`/${item.toLowerCase()}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Product Dropdown */}
                        <div className="relative group">
                            <button
                                className="flex items-center gap-1 text-gray-700 hover:text-black relative transition duration-200
                before:content-[''] before:absolute before:bottom-0 before:left-0
                before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
                group-hover:before:w-full"
                            >
                                Product <ChevronDown size={16} />
                            </button>
                            <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-100 shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {["New Arrivals", "Best Sellers", "On Sale"].map((item) => (
                                    <Link
                                        key={item}
                                        to={`/product/${item.toLowerCase().replace(" ", "-")}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <Link
                            to="/contact"
                            className="relative text-gray-700 hover:text-black transition duration-200
              before:content-[''] before:absolute before:bottom-0 before:left-0
              before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              hover:before:w-full"
                        >
                            Contact Us
                        </Link>
>>>>>>> Stashed changes
                    </div>

                    {/* Right icons */}
                    <div className="flex items-center gap-4">
                        <button className="flex items-center justify-center text-gray-600 hover:text-black transition-all duration-200">
                            <Search size={20} />
                        </button>

                        <UserDropdown />
                        <Menucart />
                        <ThemeToggle />

                        <button className="md:hidden text-gray-700 hover:text-black" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <MobileMenu isOpen={isOpen} />
            </nav>
        </>
    );
}
