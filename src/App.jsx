// src/App.jsx
import React from "react";
import ProductButtons from "@/components/ProductButtons"; // or "./components/ProductButtons" if you don't use @ alias
import CheckoutDetails from "./pages/CheckoutDetails";
import Home from "./pages/Home";
import OrderSummary from "@/Components/OrderSummary.jsx";
import Shipping from "@/components/shippingForm";
import ContactInformation from "@/components/ContactInformation";
import ProductCard from "./Components/ProductCard.jsx";
import Header from "./components/Header"
import GridSection from "@/Components/GridSection.jsx";
import TrayTableProduct from "@/Components/cart.jsx";

function App() {
    return (
        <GridSection>

            <div>

                <Header />
                {/* other product details here */}
                <ProductButtons />
                <ContactInformation />
                <Shipping />
                <TrayTableProduct />


                <ProductCard />
                <OrderSummary />
            </div>
        </GridSection>

    );
}

export default App;

