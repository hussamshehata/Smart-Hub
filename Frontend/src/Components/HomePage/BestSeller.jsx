import { useState } from "react"; 
import { Button } from "../ui/button.jsx";
import BestSellerData from "../../data/BestSellerData.json"
import FavoriteButton from "../All-Buttons/FavoriteButton";
import AddToCartButton from "../All-Buttons/AddToCartButton";
import RatingStars from "../All-Buttons/RatingStars";
function BestSeller() {
    const [visibleCount, setVisibleCount] = useState(4);

    const products = BestSellerData

    function getSoldLabel(soldCount) {
        if (!soldCount) return null;
        const step = 10;
        const rounded = Math.floor(soldCount / step) * step;
        return `+${rounded} Sold`;
    }

    const sortedProducts= products.sort((a,b) => b.soldCount - a.soldCount);
    const visibleProducts = sortedProducts.slice(0, visibleCount);

    return (
        <div className="flex flex-col gap-8 mx-40 my-10">
            <h2 className="text-neutral-700 text-4xl">Best Seller</h2>

            <div className="flex flex-wrap justify-center gap-8">
                    {visibleProducts.map((product) => (
                        <div key={product.id} className="flex  flex-col  gap-2  text-neutral-700 bg-white w-64 rounded-lg shadow-xl hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition-shadow duration-300 group ">

                            <div className="flex  flex-col  justify-between rounded-t-lg h-64  w-64  p-4   group  relative "
                                style={{ backgroundImage: `url(${product.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                
                                <div className="flex justify-between">
                                    {product.soldCount && ( <p className="text-1xl  bg-white/80 rounded-sm  font-bold  p-2  w-max">{getSoldLabel(product.soldCount)}</p>)}

                                    <div className="opacity-0  group-hover:opacity-100  transition-opacity  duration-300">
                                        <FavoriteButton product={product} />
                                    </div>
                                    
                                </div>
                                
                                <div className=" flex justify-center opacity-0  group-hover:opacity-100  transition-opacity  duration-300  cursor-pointer">
                                    <AddToCartButton product={product} />
                                </div>

                            </div>
                            
                            <div className="p-2 ">
                                <div className="cursor-pointer">
                                    <RatingStars rating={product.rating} />
                                </div>

                                <p className="text-1xl font-bold">{product.name}</p>
                                <p className="text-1xl">{product.description}</p>
                                <p className="text-1xl font-bold ">{product.price}$</p>
                            </div>
                        </div>
                    ))}
            </div>


            <div className="flex gap-8 justify-center">
               
                <Button
                    variant="blacky" size="default"
                    onClick={() => setVisibleCount(prev => Math.max(4, prev - 4))}
                    disabled={visibleCount <= 4}
                    className={visibleCount <= 4 ? "bg-gray-400 cursor-not-allowed text-white  w-40" : " text-white  w-40"}
                >
                    Show Less
                </Button>
                    
                <Button
                    variant="blacky" size="default"
                    onClick={() => setVisibleCount(visibleCount + 4)}
                    disabled={visibleCount >= sortedProducts.length}
                    className={visibleCount >= sortedProducts.length ? "bg-gray-400 cursor-not-allowed text-white  w-40" : " text-white  w-40"}
                >
                    Show More
                </Button>
            </div>

        </div> 
    );
}
export default BestSeller;