import { motion } from "framer-motion";

export default function Blog() {
    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-3xl font-bold mb-2">Blog</h1>
            <p className="text-gray-500">Latest updates and news here.</p>
        </motion.div>
    );
}
