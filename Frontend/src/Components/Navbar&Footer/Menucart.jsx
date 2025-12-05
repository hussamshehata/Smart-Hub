import React from "react";
import { ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import CartSidebar from "./Sidebar.jsx";
import { selectCartTotalQuantity } from "../../redux/cartSlice.js";

export default function Menucart() {
    const cartCount = useSelector(selectCartTotalQuantity);
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    return (
        <>
            <div className="relative">
                <button
                    className="flex items-center justify-center text-gray-600 hover:text-black transition-all duration-200"
                    onClick={() => setIsCartOpen(true)}
                >
                    <ShoppingBag size={20} />
                </button>

                {cartCount > 0 && (
                    <motion.span
                        key={cartCount}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center"
                    >
                        {cartCount}
                    </motion.span>
                )}
            </div>

            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
