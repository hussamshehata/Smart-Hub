import { useState , useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom"; 

function HeroBanner() {
    const title ="welcome to Smart Hub!"
    const description="Your one-stop shop for all things tech."
    const images = [
        "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885739/hero1_tft7te.jpg",
        "https://res.cloudinary.com/dbaqz7nim/image/upload/v1762422105/phones_t4whki.jpg",
        "https://res.cloudinary.com/dbaqz7nim/image/upload/v1762422149/accessories_jlb326.jpg"
    ];

    const [currentImage , setCurrentImage] =useState(0) ;
    const navigate = useNavigate();

    useEffect(()=> {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        } , 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const handleShopClick= () => {
        navigate("/shop");
    };


    return (
        <section className="h-screen  bg-cover  bg-center  bg-no-repeat  flex  flex-col  justify-center  items-end  transition-all  duration-700   ease-in-out"
                 style={{backgroundImage: `url(${images[currentImage]})`}} >

            <div className="w-1/2">
                <div className="flex  flex-col  gap-4  bg-white/50  p-4  w-max  rounded-2xl">
                    <h2 className="text-neutral-700 text-5xl" >{title}</h2>
                    <p className="text-neutral-700 text-2xl">{description}</p>
                    <Button variant="blacky" size="default" className="w-40" onClick={handleShopClick}>Shop Now</Button>
                </div>
            </div>
        </section>
    )
}
export default HeroBanner;
