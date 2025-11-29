import { useState , useEffect } from "react";
import { Button } from "../ui/button";
function PromoBanner() {
    const promoData =[
        {
            title:"Hurry up! 40% OFF",
            description:"Enjoy up to offer on our best-selling products for a limited time only.",
            image: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760886151/promo_bchqyq.jpg" ,
            expireDate: "2025-11-29T23:59:59"
        }
    ];

    const promo = promoData[0];

    const [timeLeft, setTimeLeft] = useState({days:"00" , hours:"00" , minutes : "00" , seconds : "00"});

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const expireDate = new Date(promo.expireDate);
            const difference = expireDate - now ;

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({days:"00", hours:"00", minutes:"00" , seconds:"00"})
            }
            else 
            {
                const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0");
                const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
                const minutes = String(Math.floor((difference / (1000 * 60 )) % 60)).padStart(2, "0");
                const seconds = String(Math.floor((difference / (1000)) % 60)).padStart(2, "0");

                setTimeLeft({ days, hours, minutes, seconds});
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [promo.expireDate]);

    return (
        <div className="flex w-full">

            <div className="w-1/2">
                <img src={promo.image} alt="Promo" className="w-full h-full object-cover"/>
            </div>

            <div className="flex flex-col justify-center gap-4 w-1/2 bg-[#ffab0066] px-20 ">
                <p className="text-primary-600 font-bold">PROMOTION</p>
                <h2 className="text-neutral-700 text-4xl font-bold">{promo.title}</h2>
                <p className="text-neutral-700 text-1xl font-bold">{promo.description}</p>

                <div className="text-neutral-700">
                    <p className="mb-2">Offer expires in :</p>
                    <ul className="list-none flex gap-4">
                        <li className="flex flex-col justify-center items-center gap-2"><span className=" bg-white p-4 text-4xl">{timeLeft.days}</span>Days</li>
                        <li className="flex flex-col justify-center items-center gap-2"><span className=" bg-white p-4 text-4xl">{timeLeft.hours}</span>Hours</li>
                        <li className="flex flex-col justify-center items-center gap-2"><span className=" bg-white p-4 text-4xl">{timeLeft.minutes}</span>Minutes</li>
                        <li className="flex flex-col justify-center items-center gap-2"><span className=" bg-white p-4 text-4xl">{timeLeft.seconds}</span>Seconds</li>
                    </ul>
                </div>
                <Button variant="blacky" size="default" className="w-40">Shop Now</Button>
            </div>

        </div>      
    );
}

export default PromoBanner;