import React from "react";
import Header from "../Components/Header";
import ProductCard from "../components/ProductCard";
import ProductButtons from "../components/ProductButtons";

export default function Home() {
    return (
        <>
            <Header />
            <div className="p-8">

                <h1 className="text-2xl font-heading mb-4">Product</h1>
                {/* other product details here */}
                <ProductButtons />

                <ProductCard />
            </div>
        </>
    );
}