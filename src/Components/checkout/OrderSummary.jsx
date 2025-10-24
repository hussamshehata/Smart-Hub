import React from "react";

export default function OrderSummary() {
    return (
        <div className="w-[380px] rounded-md shadow border border-gray-300 p-6">
            <h2 className="text-2xl font-semibold mb-6">Order summary</h2>

            {/* Item 1 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <img
                        src="assets/Table.jpg"
                        alt="Tray Table"
                        className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                        <p className="font-medium">Tray Table</p>
                        <p className="text-gray-500 text-sm">Color: Black</p>
                        <div className="flex items-center border border-gray-400 rounded-md w-20 justify-between px-2 mt-1">
                            <button className="text-gray-500">−</button>
                            <span>2</span>
                            <button className="text-gray-500">+</button>
                        </div>
                    </div>
                </div>
                <p className="font-medium">$38.00</p>
            </div>

            <hr className="my-2" />

            {/* Item 2 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <img
                        src="assets/Table2.jpg"
                        alt="Tray Table Red"
                        className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                        <p className="font-medium">Tray Table</p>
                        <p className="text-gray-500 text-sm">Color: Red</p>
                        <div className="flex items-center border border-gray-400 rounded-md w-20 justify-between px-2 mt-1">
                            <button className="text-gray-500">−</button>
                            <span>2</span>
                            <button className="text-gray-500">+</button>
                        </div>
                    </div>
                </div>
                <p className="font-medium">$38.00</p>
            </div>

            <hr className="my-2" />

            {/* Item 3 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <img
                        src="assets/lamp.jpg"
                        alt="Table Lamp"
                        className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                        <p className="font-medium">Table lamp</p>
                        <p className="text-gray-500 text-sm">Color: gold</p>
                        <div className="flex items-center border border-gray-400 rounded-md w-20 justify-between px-2 mt-1">
                            <button className="text-gray-500">−</button>
                            <span>2</span>
                            <button className="text-gray-500">+</button>
                        </div>
                    </div>
                </div>
                <p className="font-medium">$39.00</p>
            </div>

            <hr className="my-4" />

            {/* Coupon */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Input"
                    className="border border-gray-400 rounded-md px-3 py-2 mr-2 focus:outline-none"
                />
                <button className="bg-black text-white px-4 py-2 rounded-md">Apply</button>
            </div>

            {/* Discount */}
            <div className="flex justify-between mb-2 text-sm">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">🎟️ JenkateMW</span>
                </div>
                <span className="text-green-600 font-medium">
                    −$25.00{" "}
                    <span className="text-sm text-green-500 cursor-pointer">[Remove]</span>
                </span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">$99.00</span>
            </div>

            <hr className="my-2" />

            {/* Total */}
            <div className="flex justify-between mt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">$234.00</span>
            </div>
        </div>
    );
}