// src/App.jsx
import React from "react";
import ProductCard from "./Components/ProductCard.jsx";
import Navbar from "./Components/Navbar&Footer/Navbar.jsx"
import GridSection from "@/Components/GridSection.jsx";
import ThemeToggle from "@/Components/All-Buttons/ThemeToggle.jsx";
import Footer from "@/Components/Navbar&Footer/Footer.jsx"

import HeroBanner from "./Components/HeroBanner.jsx";
import Brands from "./Components/Brands.jsx";
import PromoBanner from "./Components/promoBanner.jsx";
import Newsletter from "./Components/Newsletter.jsx";
import Services from "./Components/Services.jsx";
function App() {
    return (
        <GridSection>

            <div>
                <Navbar/>
                <HeroBanner/>
                <Brands/>

<ThemeToggle/>
                {/* other product details here */}


                <ProductCard/>
                <PromoBanner/>
                <Services/>
                <Newsletter/>

                
<Footer/>
            </div>
        </GridSection>


    );
}

export default App;

