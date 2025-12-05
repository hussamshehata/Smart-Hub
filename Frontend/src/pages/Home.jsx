/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import HeroBanner from "../Components/HomePage/HeroBanner.jsx";
import Brands from "../Components/HomePage/Brands.jsx";
import NewArrivals from "../Components/HomePage/NewArrivals.jsx";
import ShopCollection from "../Components/HomePage/ShopCollection.jsx";
import BestSeller from "../Components/HomePage/BestSeller.jsx";
import PromoBanner from "../Components/HomePage/PromoBanner.jsx";
import Services from "../Components/HomePage/Services.jsx";
import InstagramFeed from "../Components/HomePage/InstagramFeed.jsx";
import Newsletter from "../Components/HomePage/Newsletter.jsx";
export default function Home() {
    return (
        <motion.div
            className="p-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <HeroBanner />
            <Brands />
            <NewArrivals/>
            <ShopCollection />
            <BestSeller/>
            <PromoBanner />
            <Services />
            <InstagramFeed />
            <Newsletter />
        </motion.div>
    );
}
