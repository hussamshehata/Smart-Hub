import { useState , useEffect } from "react";
import { Button } from "../ui/button.jsx";
import PromoBannerData from "../../data/PromoBannerData.json"
function PromoBanner() {
    
    const promo = PromoBannerData[0];

    const [timeLeft, setTimeLeft] = useState({days:"00" , hours:"00" , minutes : "00" , seconds : "00"});
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const expireDate = new Date(promo.expireDate);
            const difference = expireDate - now ;

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({days:"00", hours:"00", minutes:"00" , seconds:"00"});
                setIsExpired(true);
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
        <div className="flex flex-col-reverse md:flex-row w-full">
            {isExpired ? 
            (   
                <>
                    <div className="w-full md:w-1/2">
                        <img src="../..../assets/images/StayTuned.jpeg" alt="Promo" className=" w-full max-h-96 object-fit"/>
                    </div>

                    <div className="flex flex-col justify-center gap-4 w-full md:w-1/2 max-h-96 bg-[#ffab0066] p-10 md:p-20">
                        <p className="text-primary-600 font-bold">PROMOTION</p>
                        <h2 className="text-neutral-700 text-4xl font-bold">No active promotions right now ,<br /> Stay tuned for new offers soon !</h2>
                        <p className="text-neutral-700 text-2xl font-bold">Just continue scrolling , we'll come back with a special offer for you .</p>
                    </div>
                </>
                
                
            ) : (
                    <>
                        <div className="w-full md:w-1/2">
                            <img src={promo.image} alt="Promo" className="w-full h-full object-cover"/>
                        </div>

                        <div className="flex flex-col justify-center gap-4 w-full md:w-1/2  bg-[#ffab0066] p-10 md:p-20">
                            <p className="text-primary-600 text-2xl font-bold">PROMOTION</p>
                            <h2 className="text-neutral-700 text-4xl font-bold">{promo.title}</h2>
                            <p className="text-neutral-700 text-2xl font-bold">{promo.description}</p>

                            <div className="text-neutral-700 my-4">
                                <p className="text-2xl mb-2">Offer expires in :</p>
                                <ul className="list-none flex gap-4">
                                    <li className="flex flex-col justify-center items-center gap-2 text-1xl"><span className="flex bg-white w-16 h-16 justify-center items-center text-4xl font-bold">{timeLeft.days}</span>Days</li>
                                    <li className="flex flex-col justify-center items-center gap-2 text-1xl"><span className="flex bg-white w-16 h-16 justify-center items-center text-4xl font-bold">{timeLeft.hours}</span>Hours</li>
                                    <li className="flex flex-col justify-center items-center gap-2 text-1xl"><span className="flex bg-white w-16 h-16 justify-center items-center text-4xl font-bold">{timeLeft.minutes}</span>Minutes</li>
                                    <li className="flex flex-col justify-center items-center gap-2 text-1xl"><span className="flex bg-white w-16 h-16 justify-center items-center text-4xl font-bold">{timeLeft.seconds}</span>Seconds</li>
                                </ul>
                            </div>
                            <Button variant="blacky" size="default" className="w-40">View Offers</Button>
                        </div>
                    </>
                )}
        </div>      
    );
}

export default PromoBanner;