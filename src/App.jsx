// src/App.jsx
import React from "react";
import ProductCard from "./Components/ProductCard.jsx";
import Header from "./components/Header"
import GridSection from "@/Components/GridSection.jsx";
import ThemeToggle from "@/Components/ThemeToggle.jsx";

function App() {
    return (
        <GridSection>

            <div>
                <Header/>

<ThemeToggle/>
                {/* other product details here */}


                <ProductCard/>

            </div>
        </GridSection>


    );
}

export default App;

