/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import HeroBanner from "@/Components/HomePage/HeroBanner";
import Brands from "@/Components/HomePage/Brands";
import NewArrivals from "@/Components/HomePage/NewArrivals";
import ShopCollection from "@/Components/HomePage/ShopCollection";
import BestSeller from "@/Components/HomePage/BestSeller";
import PromoBanner from "@/Components/HomePage/PromoBanner";
import Services from "@/Components/HomePage/Services";
import InstagramFeed from "@/Components/HomePage/InstagramFeed";
import Newsletter from "@/Components/HomePage/Newsletter";
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
