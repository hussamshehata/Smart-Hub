import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/All-Buttons/ui/card";
import { Button } from "@/Components/All-Buttons/ui/button";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ title, description, image }) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition">
            <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-4">{description}</p>
                <Button className="w-full flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}
