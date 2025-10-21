import { Button } from "./ui/button";
function PromoBanner() {
    return (
        <div className="flex w-full">

            <div className="w-1/2">
                <img src="https://res.cloudinary.com/dbaqz7nim/image/upload/v1760886151/promo_bchqyq.jpg" alt="Promo" className="w-full h-full object-cover"/>
            </div>

            <div className="flex flex-col justify-center gap-4 w-1/2 bg-[#ffab0066] px-20 ">
                <p className="text-primary-600 font-bold">PROMOTION</p>
                <h2 className="text-neutral-700 text-4xl font-bold">Hurry up! 40% OFF</h2>
                <p className="text-neutral-700 text-1xl font-bold">Enjoy up to offer on our best-selling products for a limited time only.</p>
                <div className="text-neutral-700">
                    <p className="mb-2">Offer expires in :</p>
                    <ul className="list-none flex gap-4">
                        <li className="flex flex-col justify-center items-center gap-2"><span className=" bg-white p-4 text-4xl">02</span>Days</li>
                        <li className="flex flex-col justify-center items-center gap-2"><span className=" bg-white p-4 text-4xl">12</span>Hours</li>
                        <li className="flex flex-col justify-center items-center gap-2"><span className=" bg-white p-4 text-4xl">45</span>Minutes</li>
                        <li className="flex flex-col justify-center items-center gap-2"><span className=" bg-white p-4 text-4xl">05</span>Seconds</li>
                    </ul>
                </div>
                <Button variant="blacky" size="default" className="w-40">Shop Now</Button>
            </div>

        </div>      
    );
}

export default PromoBanner;