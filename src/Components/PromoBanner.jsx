function PromoBanner() {
    return (
        <div className="flex mt-24">

            <div className="left-side w-1/2 h-full">
                <img src="../assets/images/promo.jpg" alt="Promo" className="w-full h-1/5 object-cover"/>
            </div>

            <div className="w-1/2 flex flex-col bg-[#ffab0066] p-16">
                <p className="text-blue-600">PROMOTION</p>
                <p className="text-[4rem]">Hurry up! 40% OFF</p>
                <p className="font-bold">Enjoy up to offer on our best-selling products for a limited time only.</p>
                <div>
                    <p className="mt-8 mb-4 ">Offer expires in :</p>
                    <ul className="list-none flex gap-4">
                        <li className="flex flex-col justify-center items-center gap-2 w-12 mr-4"><span className="w-18 bg-white p-4 text-[2rem] block">02</span>Days</li>
                        <li className="flex flex-col justify-center items-center gap-2 w-12 mr-4"><span className="w-18 bg-white p-4 text-[2rem] block">12</span>Hours</li>
                        <li className="flex flex-col justify-center items-center gap-2 w-12 mr-4"><span className="w-18 bg-white p-4 text-[2rem] block">45</span>Minutes</li>
                        <li className="flex flex-col justify-center items-center gap-2 w-12 mr-4"><span className="w-18 bg-white p-4 text-[2rem] block">05</span>Seconds</li>
                    </ul>
                </div>
                <button className="bg-black text-white py-2 px-0 w-32 rounded-lg mt-8">Shop Now</button>
            </div>

        </div>      
    );
}

export default PromoBanner;