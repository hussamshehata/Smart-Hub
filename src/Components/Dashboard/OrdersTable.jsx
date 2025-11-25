import React from "react";

export default function OrdersTable() {
    const orders = [
        { name: "iPhone 15 Pro Max", number: 85631, pay: "Credit cart", trade: "bought", status: "Pending" },
        { name: "Samsung Galaxy S24 Ultra", number: 36378, pay: "Cash", trade: "sold", status: "Returned" },
        { name: "Xiaomi Redmi Note 13 Pro", number: 49347, pay: "Cash", trade: "sold", status: "Pending" },
        { name: "Apple Watch Series 9", number: 96996, pay: "Credit cart", trade: "sold", status: "Delivered" },
        { name: "Samsung Galaxy Watch 6", number: 22821, pay: "Cash", trade: "sold", status: "Delivered" },
        { name: "Sony WH-1000XM5 Headphones", number: 81475, pay: "Cash", trade: "bought", status: "Pending" },
        { name: "Apple AirPods Pro 2", number: 482, pay: "Credit cart", trade: "bought", status: "Delivered" },
    ];

    return (
        <div className="rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

            {/* GRID WRAPPER */}
            <div className="grid grid-cols-1 gap-4">

                {/* GRID HEADER (hidden on mobile) */}
                <div className="hidden md:grid grid-cols-5 p-3 rounded-lg font-semibold text-neutral-500">
                    <span>Product Name</span>
                    <span>Product Number</span>
                    <span>Payment</span>
                    <span>Trade</span>
                    <span>Status</span>
                </div>

                {/* GRID ITEMS */}
                {orders.map((item, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-5 p-4 rounded-xl shadow-sm gap-2 md:gap-0"
                    >
                        {/* Product Name */}
                        <div>
                            <span className="font-medium md:font-normal">{item.name}</span>
                        </div>

                        {/* Product Number */}
                        <div>
                            <span className="text-neutral-500">#{item.number}</span>
                        </div>

                        {/* Payment */}
                        <div>
                            <span className="text-neutral-500">{item.pay}</span>
                        </div>

                        {/* Trade */}
                        <div>
                            <span className="text-neutral-500">{item.trade}</span>
                        </div>

                        {/* Status */}
                        <div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${item.status === "Delivered"
                                    ? "bg-green-100 text-green-600"
                                    : item.status === "Returned"
                                        ? "bg-red-100 text-red-600"
                                        : "bg-yellow-100 text-yellow-600"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}