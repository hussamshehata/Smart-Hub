import { Link } from "react-router-dom";
import ShopCollectionData from "../../data/ShopCollectionData.json"

function ShopCollection () {

    return (
        <div className="flex  flex-col gap-8  mx-40  my-10 ">
            <h2 className="text-neutral-700  text-4xl">Shop Collection</h2>

            <div className="grid gap-8 grid-cols-2 ">

                <div className={`flex  flex-col  justify-end  gap-4  px-8  py-8 max-h-full ${ShopCollectionData[0].height}`}
                style={{ backgroundImage: `url(${ShopCollectionData[0].bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <p className="text-neutral-700  text-2xl">{ShopCollectionData[0].title}</p>
                    <Link to={"/shop/laptops"} className="text-neutral-700  inline-flex  gap-2  w-max  border-b  border-neutral-700  pb-0.5  hover:text-primary-600  hover:border-primary-600">
                        Collection 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
                    </Link>
                </div>

                <div className="grid  gap-8 grid-rows-2 ">
                    {ShopCollectionData.slice(1).map((item) =>(
                        <div key={item.id} className={`flex  flex-col  justify-end  gap-4  px-8  py-8   ${item.height}`}
                        style={{ backgroundImage: `url(${item.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <p className="text-neutral-700 text-2xl">{item.title}</p>
                            <Link to={item.link} className="text-neutral-700 inline-flex gap-2 w-max border-b border-neutral-700 pb-0.5 hover:text-primary-600   hover:border-primary-600">
                                Collection
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}
export default ShopCollection;