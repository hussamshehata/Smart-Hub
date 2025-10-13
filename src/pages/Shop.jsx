import ProductCard from "../Components/ProductCard.jsx";
import { motion } from "framer-motion";
export default function Shop() {
    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >

        <section className="max-w-7xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">Shop</h1>
            <div>
                <ProductCard />

            </div>
        </section>

        </motion.div>
    );
}


