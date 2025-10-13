import { motion } from "framer-motion";

export default function Home() {
    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
            <p className="mt-2 text-gray-500">Your smart hub for everything.</p>
        </motion.div>
    );
}
