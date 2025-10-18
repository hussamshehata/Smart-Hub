import { motion } from "framer-motion";

import HeroBanner from "@/Components/HeroBanner";
import Brands from "@/Components/Brands";
import PromoBanner from "@/Components/PromoBanner";
import Services from "@/Components/Services";
import InstagramFeed from "@/Components/InstagramFeed";
import Newsletter from "@/Components/Newsletter";
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
            <PromoBanner />
            <Services />
            <InstagramFeed />
            <Newsletter />
        </motion.div>
    );
}
