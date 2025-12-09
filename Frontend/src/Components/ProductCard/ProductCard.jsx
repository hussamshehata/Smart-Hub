import React from "react";
import AddToCartButton from "../All-Buttons/AddToCartButton";
import FavoriteButton from "../All-Buttons/FavoriteButton";
export const ProductCard = ({ product ,productid }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      <div
        className="relative h-64 bg-cover bg-center overflow-hidden "
        style={{ backgroundImage: `url(${product.image})` }}
      >
        <div className="flex justify-between p-3">
          <span className="px-3 py-1 bg-primary-600 text-white text-sm font-bold rounded-full">
            {product.brand}
          </span>
       
          <FavoriteButton productId={product.id}/>
        </div>

        
      </div>

         <div className="p-5">
                                <div className="flex  gap-1 mb-2">
                                    {Array.from ({ length: 5 }).map((_,i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < product.rating ? "currentColor" : "none" } stroke="currentColor" strokeWidth="2" class="lucide lucide-star-icon lucide-star text-neutral-700"> <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/> </svg>
                                    ))}
                                </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h3>
        <p className="text-sm text-slate-600 mb-3">{product.description}</p>
        

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">{product.storage}</span>
          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">{product.ram}</span>
          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">{product.color}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-blue-600">{product.price}$</p>
         <AddToCartButton product={product}/>
         
        </div>
      </div>
    </div>
  );
};
