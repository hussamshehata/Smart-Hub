import { motion } from "framer-motion";
import { Check } from 'lucide-react';
import OrderComplete from "@/Components/checkout/OrderComplete";

export default function OrderCompletePage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <>
                <div className="max-w-6xl mx-auto py-8 mb-6">
                    {/* Title */}
                    <h2 className="text-4xl font-semibold mb-10">Cart</h2>
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-10">
                        <div className="flex items-center text-gray-400">
                            <div className="w-10 h-10 rounded-full bg-green-400 text-white flex items-center justify-center font-semibold text-sm">
                                <Check />
                            </div>
                            <span className="ml-3 font-medium text-green-400 text-sm">Shopping cart</span>
                        </div>
                        <div className="w-24 h-px bg-green-400 mx-6"></div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-400 text-white flex items-center justify-center font-semibold text-sm">
                                <Check />
                            </div>
                            <span className="ml-3 font-medium text-green-400 text-sm">Checkout details</span>
                        </div>
                        <div className="w-24 h-px bg-green-400 mx-6"></div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                                3
                            </div>
                            <span className="ml-3 font-semibold text-sm">Order complete</span>
                        </div>
                    </div>

                    <OrderComplete />



                </div>
            </>
        </motion.div>
    );
}