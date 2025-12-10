import React, { useState, useRef, useEffect } from "react";
import {LogOut, User,} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/UserSlice.js";
import { motion, AnimatePresence } from "framer-motion";



export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const handleLogout = () => {
            dispatch(logout());
            window.location.href = "/"; // redirect after logout
        };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* User icon + name button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-black transition"
            >
                <User size={20} />


            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 shadow-lg rounded-md z-50"
                    >
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <LogOut size={16} className="inline mr-2" />
                            Logout
                        </button>
                        {user && (
                            <>
                                {user.isAdmin && (
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        dispatch(logout());
                                        localStorage.removeItem("token"); // clear token
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
