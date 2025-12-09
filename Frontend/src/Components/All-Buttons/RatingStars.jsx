import React from "react";
import { Star } from 'lucide-react';

function RatingStars({ rating }) {
    return (
        <div className="flex  gap-1 mb-2">
            {Array.from ({ length: 5 }).map((_,i) => (
                <Star
                    key={i}  
                    size={16}
                    fill={i < rating ? "currentColor" : "none" } 
                    stroke="currentColor" 
                    strokeWidth={2}
                    className="text-neutral-700">
                </Star>
            ))}
        </div>
    );
}

export default RatingStars;