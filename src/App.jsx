import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./Layouts/MainLayouts.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";


function App() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="Product" element={<Product />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="product/:id" element={<ProductDetails />} />
                    <Route path="blog" element={<Blog />} />






                </Route>

                {/* Routes without layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </AnimatePresence>
    );
}

export default App;
