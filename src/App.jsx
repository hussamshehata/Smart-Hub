// src/App.jsx
import React from "react";
import ProductButtons from "@/components/ProductButtons"; // or "./components/ProductButtons" if you don't use @ alias
import Shipping from "@/components/shippingForm";
import ContactInformation from "@/components/ContactInformation";
import ProductCard from "./Components/ProductCard";
import Header from "./components/Header"

function App() {
    return (
        <div>
            <Header/>
            {/* other product details here */}
            <ProductButtons />
            <ContactInformation />
            <Shipping />

            <ProductCard/>
        </div>
    );
}

export default App;

