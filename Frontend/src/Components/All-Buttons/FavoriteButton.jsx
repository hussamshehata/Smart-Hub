import React from "react"
import { Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "@/redux/favoriteSlice";

export default function FavoriteButton({product}) {

    const dispatch = useDispatch();
    const isFavorite = useSelector(state => state.favorites.items.some(fav => fav.id === product.id));

    const handleClick= () => {
        dispatch(toggleFavorite(product));
    };

    return (
        <div onClick= {handleClick} className="bg-white/80 rounded-full p-2 cursor-pointer">
            <Heart 
                size={24}
                fill={isFavorite ? "red" : "none"}
                stroke={isFavorite? "red" : "currentColor"}
                strokeWidth={2} 
            />
        </div>
    );
}