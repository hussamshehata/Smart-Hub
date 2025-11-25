import React from "react";

export default function StatCard({ title, amount, desc }) {
    return (
        <div className="rounded-2xl p-6 shadow flex flex-col gap-2">
            <span className="text-gray-500 font-medium">{title}</span>
            <h2 className="text-3xl font-bold">{amount}</h2>
            <span className="text-gray-400 text-sm">{desc}</span>
        </div>
    );
}