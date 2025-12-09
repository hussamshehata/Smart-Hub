import { useEffect, useState } from "react";
import { Button } from "../ui/button.jsx";
import NewArrivalsData from "../../data/NewArrivalsData.json"
import FavoriteButton from "../All-Buttons/FavoriteButton";
import AddToCartButton from "../All-Buttons/AddToCartButton";
import RatingStars from "../All-Buttons/RatingStars";
function NewArrivals() {
    const [products, setProducts] = useState([]);

    useEffect (() =>{
        setProducts(NewArrivalsData);
    }, []);

    return (
        <div  className="flex  flex-col  gap-8  mx-40  my-10">
            <h2 className="text-neutral-700 text-4xl">New Arrivals</h2>

                <div className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory">
                    {products.map((product) => (
                        <div key={product.id} className="flex  flex-col  mb-2  text-neutral-700 bg-white  rounded-lg shadow-xl hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition-shadow duration-300 group">

                            <div className="flex  flex-col  justify-between  rounded-t-lg  h-64  w-64  p-4  group  relative"
                                style={{ backgroundImage: `url(${product.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    
                                <div className="flex justify-between">
                                    {product.newArrival && ( <p className="text-1xl  bg-white/80 rounded-sm  font-bold  py-2  px-4  w-max">New</p>)}

                                    <div className="opacity-0  group-hover:opacity-100  transition-opacity  duration-300">
                                        <FavoriteButton product={product} />
                                    </div>
                                </div>

                                <div className="opacity-0  group-hover:opacity-100  transition-opacity  duration-300  cursor-pointer">
                                    <AddToCartButton product={product} />
                                </div>

                            </div>

                            <div className="p-2 ">
                                <RatingStars rating={product.rating} />
                            
                                <p className="text-1xl font-bold">{product.name}</p>
                                <p className="text-1xl">{product.description}</p>
                                <p className="text-1xl font-bold">{product.price}$</p>
                            </div>

                        </div>
                    ))}
                </div>
        </div> 
    );
}
export default NewArrivals;