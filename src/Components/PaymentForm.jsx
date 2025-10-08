import React from "react";

export default function PaymentForm() {
    return (
        <div className="px-4 py-8 mt-8 ml-8 border border-black shadow w-2/5">
            <form>
                <h6 className="font-medium text-xl mb-4">Payment method</h6>

                <div className="border border-black rounded-sm px-4 py-2 mb-2">
                    <input
                        type="radio"
                        id="pay-by-card-credit"
                        name="payment_method"
                        value="card-credit"
                        className="text-xl"
                    />
                    <label htmlFor="pay-by-card-credit" className="font-normal ml-2">
                        Pay by Card Credit
                    </label>
                </div>

                <div className="border border-black rounded-sm px-4 py-2 mb-2">
                    <input
                        type="radio"
                        id="pay-by-paypal"
                        name="payment_method"
                        value="paypal"
                        className="text-xl"
                    />
                    <label htmlFor="pay-by-paypal" className="font-normal ml-2">
                        Paypal
                    </label>
                </div>

                <hr className="my-6" />

                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="street-address"
                        className="font-bold text-xs text-gray-500 mb-2"
                    >
                        Card Number
                    </label>
                    <input
                        id="street-address"
                        name="street_address"
                        type="text"
                        placeholder="1234 1234 1234"
                        className="border border-gray-500 rounded-md px-2 py-1"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="state"
                            className="font-bold text-xs text-gray-500 mb-2"
                        >
                            Expiration date
                        </label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            placeholder="MM/YY"
                            className="border border-gray-500 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="zip-code"
                            className="font-bold text-xs text-gray-500 mb-2"
                        >
                            CVC
                        </label>
                        <input
                            id="zip-code"
                            name="zip_code"
                            type="text"
                            placeholder="CVC code"
                            className="border border-gray-500 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
