import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";

export default function Login() {
    return (
        <motion.div
            className="p-6 flex flex-col items-center justify-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <Button>Sign In</Button>
        </motion.div>
    );
}
