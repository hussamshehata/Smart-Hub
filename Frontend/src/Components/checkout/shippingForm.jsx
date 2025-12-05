import React from "react";

export default function Shipping() {
    return (
        <div className="px-4 mx-auto py-8 mt-8 rounded-md shadow border border-gray-300 w-3/5 ">
            <form>
                <h6 className="font-medium text-xl mb-4">Shipping Address</h6>

                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="street-address"
                        className="font-bold text-xs text-gray-500 mb-2"
                    >
                        STREET ADDRESS *
                    </label>
                    <input
                        id="street-address"
                        name="street_address"
                        type="text"
                        placeholder="Street Address"
                        className="border border-gray-500 rounded-md p-2"
                        required
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="country"
                        className="font-bold text-xs text-gray-500 mb-2"
                    >
                        COUNTRY
                    </label>
                    <select
                        id="country"
                        name="country"
                        className="border border-gray-500 rounded-md p-2"
                        required
                    >
                        <option value="">Country</option>
                        <option value="egypt">Egypt</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="germany">Germany</option>
                        <option value="france">France</option>
                        <option value="italy">Italy</option>
                    </select>
                </div>

                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="city"
                        className="font-bold text-xs text-gray-500 mb-2"
                    >
                        TOWN / CITY *
                    </label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Town / City"
                        className="border border-gray-500 rounded-md p-2"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="state"
                            className="font-bold text-xs text-gray-500 mb-2"
                        >
                            STATE
                        </label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            placeholder="State"
                            className="border border-gray-500 rounded-md p-2"
                            required
                        />
                    </div>

                    <div className="flex flex-col ">
                        <label
                            htmlFor="zip-code"
                            className="font-bold text-xs text-gray-500 mb-2"
                        >
                            ZIP CODE
                        </label>
                        <input
                            id="zip-code"
                            name="zip_code"
                            type="text"
                            placeholder="Zip Code"
                            className="border border-gray-500 rounded-md p-2"
                            required
                        />
                    </div>
                </div>

                <div>
                    <input
                        type="checkbox"
                        id="different-billing-address"
                        name="different_billing_address"
                        value="true"
                        className="text-xl"
                    />
                    <label
                        htmlFor="different-billing-address"
                        className="font-normal text-gray-500 ml-2"
                    >
                        Use a different billing address (optional)
                    </label>
                </div>
            </form>
        </div>
    );
}
