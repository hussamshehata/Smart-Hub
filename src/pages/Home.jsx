import React from "react";
import Navbar from "../Components/Navbar&Footer/Navbar.jsx";
import ProductCard from "../components/ProductCard";
import ProductButtons from "../Components/All-Buttons/productbuttons.jsx";

import HeroBanner from "@/Components/HeroBanner";
import PromoBanner from "@/Components/PromoBanner";
import Services from "@/Components/Services";
import Newsletter from "@/Components/Newsletter";

export default function Home() {
    return (
<<<<<<< Updated upstream
        <>
            <Navbar />
            <div className="p-8">

                <h1 className="text-2xl font-heading mb-4">Product</h1>
                {/* other product details here */}
                <ProductButtons />

                <ProductCard />
            </div>
        </>
=======
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <HeroBanner />
            <PromoBanner />
            <Services />
            <Newsletter /> 
        </motion.div>
>>>>>>> Stashed changes
    );
}