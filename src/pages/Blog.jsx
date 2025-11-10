import { motion } from "framer-motion";
import BlogList from "../Components/Blog/BlogList.jsx";
import { Button } from "../Components/ui/button.jsx";


export default function Blog() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <>
                <BlogList />
                <div className="flex justify-center pb-8">
                    <Button variant="outline" size="xl">
                        Show more
                    </Button>
                </div>


            </>

        </motion.div>
    );
}