import React from "react";

export default function ContactInformation() {
    return (
        <div className="px-4 py-8 mt-8 mx-auto mb-2 rounded-md shadow border border-gray-300 w-3/5">
            <form>
                <h6 className="font-medium text-xl mb-4">Contact Information</h6>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label htmlFor="first-name" className="font-bold text-xs text-gray-500 mb-2">
                            FIRST NAME
                        </label>
                        <input
                            id="first-name"
                            name="first_name"
                            type="text"
                            placeholder="First name"
                            className="border border-gray-400 rounded-md p-2"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="last-name" className="font-bold text-xs text-gray-500 mb-2">
                            LAST NAME
                        </label>
                        <input
                            id="last-name"
                            name="last_name"
                            type="text"
                            placeholder="Last name"
                            className="border border-gray-400 rounded-md p-2"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="phone-number" className="font-bold text-xs text-gray-500 mb-2">
                        PHONE NUMBER
                    </label>
                    <input
                        id="phone-number"
                        name="phone_number"
                        type="tel"
                        placeholder="Phone number"
                        className="border border-gray-400 rounded-md p-2"
                        required
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="font-bold text-xs text-gray-500 mb-2">
                        EMAIL ADDRESS
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        className="border border-gray-400 rounded-md p-2"
                        required
                    />
                </div>
            </form>
        </div>

    );
}
