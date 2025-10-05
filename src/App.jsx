// src/App.jsx
import React from "react";
import ProductButtons from "@/components/ProductButtons"; // or "./components/ProductButtons" if you don't use @ alias
import Shipping from "@/components/shippingForm";
import ContactInformation from "@/components/ContactInformation";
function App() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-heading mb-4">Product</h1>
            {/* other product details here */}
            <ProductButtons />
            <ContactInformation />
            <Shipping />

        </div>
    );
}

export default App;

