import { motion } from "framer-motion";
import FullPost from "@/Components/Blog/FullPost.jsx";

export default function PostDetails() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <FullPost />

        </motion.div>
    );
}