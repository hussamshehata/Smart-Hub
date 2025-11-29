import { useState } from "react";

import { Button } from "@/Components/ui/button";
function NewArrivals() {
    const [favorites, setFavorites] =useState({});

    const products = [
        {id: 1 , name:"Product 1" , description: "Description", price: "299.99$", newArrival: true, rating: 4, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 2 , name:"Product 2" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 3 , name:"Product 3" , description: "Description", price: "299.99$", newArrival: true, rating: 3, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 4 , name:"Product 4" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 5 , name:"Product 5" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 6 , name:"Product 6" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 7 , name:"Product 7" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 8 , name:"Product 8" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 9 , name:"Product 9" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 10 , name:"Product 10" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 11 , name:"Product 11" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id: 12 , name:"Product 12" , description: "Description", price: "299.99$", newArrival: true, rating: 5, bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" }
    ];

    return (
        <div  className="flex  flex-col  gap-8  mx-40  my-10">
            <h2 className="text-neutral-700 text-4xl">New Arrivals</h2>

                <div className="flex gap-8  overflow-x-auto  overflow-visible  scrollbar-hide">
                    {products.map((product) => (
                        <div key={product.id} className="flex  flex-col  gap-2  mb-2  text-neutral-700">

                            <div className="flex  flex-col  justify-between  rounded-lg  h-72  w-64  p-4  group  relative hover:z-10  hover:shadow-[0_0_25px_rgba(0,0,0,0)]"
                            style={{ backgroundImage: `url(${product.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className="flex justify-between">
                                    {product.newArrival && ( <p className="text-1xl  bg-white  font-bold  py-2  px-4  w-max">New</p>)}
                                    <div className="bg-white  rounded-3xl  p-2  opacity-0  group-hover:opacity-100  transition-opacity  duration-300  cursor-pointer"
                                    onClick={() => 
                                        setFavorites({
                                            ...favorites,
                                            [product.id]: !favorites[product.id],
                                        })
                                    }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={favorites[product.id] ? "red" : "none"} stroke={favorites[product.id] ? "red" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart">
                                            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                                        </svg>
                                    </div>
                                </div>
                                <Button variant="default" size="default" className="opacity-0  group-hover:opacity-100  transition-opacity  duration-300">Add to cart</Button>
                            </div>

                            <div className="flex  gap-1">
                                {Array.from ({ length: 5 }).map((_,i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < product.rating ? "currentColor" : "none" } stroke="currentColor" strokeWidth="2" class="lucide lucide-star-icon lucide-star text-neutral-700"> <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/> </svg>
                                ))}
                            </div>
                            
                            <p className="text-1xl">{product.name}</p>
                            <p className="text-1xl">{product.description}</p>
                            <p className="text-1xl">{product.price}</p>

                        </div>
                    ))}
                </div>
        </div> 
    );
}
export default NewArrivals;