import React from "react";
import Navbar from "../Components/Navbar&Footer/Navbar.jsx";
import ProductCard from "../components/ProductCard";
import ProductButtons from "../Components/All-Buttons/productbuttons.jsx";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="p-8">

                <h1 className="text-2xl font-heading mb-4">Product</h1>
                {/* other product details here */}
                <ProductButtons />

                <ProductCard />
            </div>
        </>
    );
}