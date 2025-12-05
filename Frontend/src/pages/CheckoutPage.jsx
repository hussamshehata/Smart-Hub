import { motion } from "framer-motion";
import { Check } from 'lucide-react';
import ContactInformation from "../Components/checkout/ContactInformation.jsx";
import Shipping from "../Components/checkout/shippingForm.jsx";
import PaymentForm from "../Components/checkout/PaymentForm.jsx";
import { Button } from "../Components/ui/button.jsx";
import OrderSummary from "../Components/checkout/OrderSummary.jsx";
import { useNavigate } from "react-router-dom";




export default function CheckoutPage() {
    const navigate = useNavigate();


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <>
                <div className="max-w-6xl mx-auto py-8">
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
                            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                                2
                            </div>
                            <span className="ml-3 font-semibold text-sm">Checkout details</span>
                        </div>
                        <div className="w-24 h-px bg-gray-300 mx-6"></div>
                        <div className="flex items-center text-gray-400">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm">
                                3
                            </div>
                            <span className="ml-3 font-medium text-sm">Order complete</span>
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 mb-4">
                    <div className="col-span-2 mb-4">
                        <ContactInformation />
                        <Shipping />
                        <PaymentForm />


                    </div>
                    <div className="mx-auto lg:col-span-1">
                        <OrderSummary />
                    </div>


                </div>
                <div className="ml-[150px] lg:ml-[200px] w-3/5 lg:w-2/5 mt-6 mb-8">
                    <Button
                        className=" w-full bg-black hover:bg-gray-900 text-white h-12 text-base font-medium rounded-lg"
                        onClick={() => navigate("ordercomplete")}
                    >
                        Place Order
                    </Button>

                </div>

            </>
        </motion.div>
    );

}