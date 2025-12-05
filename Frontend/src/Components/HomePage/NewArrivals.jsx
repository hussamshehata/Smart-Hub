import { useEffect, useState } from "react";
import { Button } from "../ui/button.jsx";
import NewArrivalsData from "../../data/NewArrivalsData.json"
function NewArrivals() {
    const [favorites, setFavorites] =useState({});
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

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
                                    <div className="bg-white/80  rounded-full  p-2  opacity-0  group-hover:opacity-100  transition-opacity  duration-300  cursor-pointer"
                                        onClick={() => setFavorites({ ...favorites,[product.id]: !favorites[product.id],})}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={favorites[product.id] ? "red" : "none"} stroke={favorites[product.id] ? "red" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart">
                                            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                                        </svg>
                                    </div>
                                </div>
                                <Button variant="default" size="default" className="opacity-0  group-hover:opacity-100  transition-opacity  duration-300"
                                    onClick={() => setCart(prev => ({...prev, [product.id]:!prev[product.id] }))}>
                                    {cart[product.id]? "Added to cart" : "Add to cart"}</Button>
                            </div>

                            <div className="p-2 ">
                                <div className="flex  gap-1 mb-2">
                                    {Array.from ({ length: 5 }).map((_,i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < product.rating ? "currentColor" : "none" } stroke="currentColor" strokeWidth="2" class="lucide lucide-star-icon lucide-star text-neutral-700"> <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/> </svg>
                                    ))}
                                </div>
                            
                                <p className="text-1xl font-bold">{product.name}</p>
                                <p className="text-1xl">{product.description}</p>
                                <p className="text-1xl font-bold">{product.price}</p>
                            </div>

                        </div>
                    ))}
                </div>
        </div> 
    );
}
export default NewArrivals;