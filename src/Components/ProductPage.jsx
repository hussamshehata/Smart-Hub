import React from "react";
import GridSection from "@/components/GridSection";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    const products = [
        {
            title: "Wireless Headphones",
            description: "High quality sound with noise cancellation.",
            image: "/images/headphones.jpg",
        },
        {
            title: "Smart Watch",
            description: "Track your fitness and stay connected.",
            image: "/images/smartwatch.jpg",
        },
        {
            title: "Gaming Mouse",
            description: "Ergonomic design with RGB lighting.",
            image: "/images/mouse.jpg",
        },
    ];

    return (
        <GridSection>
            {products.map((item, index) => (
                <ProductCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                />
            ))}
        </GridSection>
    );
}
