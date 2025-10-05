// src/App.jsx
import React from "react";
import ProductButtons from "@/components/ProductButtons"; // or "./components/ProductButtons" if you don't use @ alias
import ProductCard from "./Components/ProductCard";
function App() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-heading mb-4">Product</h1>
            {/* other product details here */}
            <ProductCard/>
        </div>
    );
}

export default App;

