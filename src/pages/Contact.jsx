import { motion } from "framer-motion";

export default function Contact() {
    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-gray-500">We’d love to hear from you!</p>
        </motion.div>
    );
}
