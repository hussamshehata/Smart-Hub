import React from "react";

export default function GridSection({ children }) {
    return (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-6">
        {children}
    </section>
    )
}
