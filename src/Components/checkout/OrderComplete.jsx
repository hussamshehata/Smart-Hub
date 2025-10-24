import React from "react";
import { Button } from "@/Components/All-Buttons/ui/button.jsx"

export default function OrderComplete() {
    return (
        <>
            <div className="flex flex-col items-center max-w-2xl rounded-md shadow border border-gray-300 p-6 ml-4 mt-4 mb-4">
                <h6 className="text-[28px] font-medium text-neutral-500 text-center mb-6">
                    Thank you! 🎉
                </h6>
                <h4 className="text-[40px] max-w-md font-medium text-center mb-8">
                    Your order has been received
                </h4>

                {/* Product List Section */}
                <div className="flex justify-center gap-6 mb-8">
                    {/* Product 1 */}
                    <div className="relative">
                        <img
                            src="src/assets/smartwatch.jpg"
                            alt="product"
                            className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="absolute -top-2 -right-2 bg-primary-900 text-neutral-50 text-xs w-6 h-6 rounded-lg flex items-center justify-center">
                            2
                        </div>
                    </div>

                    {/* Product 2 */}
                    <div className="relative">
                        <img
                            src="src/assets/Iphone.jpg"
                            alt="product"
                            className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="absolute -top-2 -right-2 bg-primary-900 text-neutral-50 text-xs w-6 h-6 rounded-lg flex items-center justify-center">
                            2
                        </div>
                    </div>

                    {/* Product 3 */}
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
                            alt="product"
                            className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="absolute -top-2 -right-2 bg-primary-900 text-neutral-50 text-xs w-6 h-6 rounded-lg flex items-center justify-center">
                            1
                        </div>
                    </div>
                </div>


                {/* Order Details Table */}
                <div className="flex gap-8 mb-8">
                    <div className="space-y-3">
                        <p className="text-neutral-500">Order code:</p>
                        <p className="text-neutral-500">Date:</p>
                        <p className="text-neutral-500">Total:</p>
                        <p className="text-neutral-500">Payment method:</p>
                    </div>
                    <div className="space-y-3">
                        <p>#0123_45678</p>
                        <p>October 19, 2023</p>
                        <p>$1,345.00</p>
                        <p>Credit Card</p>
                    </div>
                </div>

                <Button variant="blacky" size="default">
                    Purchase history
                </Button>

            </div>

        </>
    );
}