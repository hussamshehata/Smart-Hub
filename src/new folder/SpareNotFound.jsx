import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SpareNotFound() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen text-center bg-background text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.h1
                className="text-6xl font-bold mb-4 text-primary"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                404
            </motion.h1>

            <motion.p
                className="text-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Oops! The page you’re looking for doesn’t exist.
            </motion.p>

            <Link
                to="/"
                className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
                Go Back Home
            </Link>
        </motion.div>
    );
}
