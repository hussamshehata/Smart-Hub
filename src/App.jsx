// src/App.jsx
import React from "react";
import ProductCard from "./Components/ProductCard.jsx";
import Navbar from "./Components/Navbar&Footer/Navbar.jsx"
import GridSection from "@/Components/GridSection.jsx";
import ThemeToggle from "@/Components/All-Buttons/ThemeToggle.jsx";
import Footer from "@/Components/Navbar&Footer/Footer.jsx"
function App() {
    return (
        <GridSection>

            <div>
                <Navbar/>

<ThemeToggle/>
                {/* other product details here */}


                <ProductCard/>
<Footer/>
            </div>
        </GridSection>


    );
}

export default App;

