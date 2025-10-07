// src/App.jsx
import React from "react";
import ProductButtons from "@/components/ProductButtons"; // or "./components/ProductButtons" if you don't use @ alias
import CheckoutDetails from "./pages/CheckoutDetails";
import Home from "./pages/Home";




function App() {
    return (
        <>
            <CheckoutDetails />
        </>
    );
}

export default App;

