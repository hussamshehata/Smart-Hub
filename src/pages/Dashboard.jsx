import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-500">Welcome back, admin!</p>
        </motion.div>
    );
}
