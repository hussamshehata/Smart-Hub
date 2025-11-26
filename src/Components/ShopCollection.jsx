import { Link } from "react-router-dom";

function ShopCollection () {
    const collections =[
        {id: 1 , title: "Laptops" , link: "/shop/laptops" , bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" , height: "h-auto"},
        {id: 2 , title: "Mobiles" , link: "/shop/mobiles" , bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1762422105/phones_t4whki.jpg" , height: "h-80"},
        {id: 3 , title: "Accessories" , link: "/shop/accessories" , bgImage: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1762422149/accessories_jlb326.jpg" , height: "h-80"}
   
    ];

    return (
        <div className="flex  flex-col  gap-8  mx-40  my-10 ">
            <h2 className="text-neutral-700  text-4xl">Shop Collection</h2>

            <div className="grid  grid-cols-2  gap-8">

                <div className={`flex  flex-col  justify-end  gap-4  px-8  py-8  ${collections[0].height}`}
                style={{ backgroundImage: `url(${collections[0].bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <p className="text-neutral-700  text-2xl">{collections[0].title}</p>
                    <Link to={collections[0].link} className="text-neutral-700  inline-flex  gap-2  w-max  border-b  border-neutral-700  pb-0.5  hover:text-primary-600  hover:border-primary-600">
                        Collection 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
                    </Link>
                </div>

                <div className="grid  grid-rows-2  gap-8 ">
                    {collections.slice(1).map((item) =>(
                        <div key={item.id} className={`flex  flex-col  justify-end  gap-4  px-8  py-8  ${item.height}`}
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