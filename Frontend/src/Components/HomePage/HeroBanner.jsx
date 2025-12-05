import { useState , useEffect } from "react";
import { Button } from "../ui/button.jsx";
import { useNavigate } from "react-router-dom"; 
import HeroBannerData from "../../data/HeroBannerData.json";

function HeroBanner() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [client,setClient] = useState("");
    const [images, setImages] = useState([]);

    useEffect(()=> {
        setClient(HeroBannerData.client);
        setTitle(HeroBannerData.title);
        setDescription(HeroBannerData.description);
        setImages(HeroBannerData.images);
    }, []);

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
        <section className="h-screen  bg-cover  bg-center  bg-no-repeat  flex  flex-col  justify-center items-center  md:items-end  transition-all  duration-700  ease-in-out"
                style={{backgroundImage: `url(${images[currentImage] || ""})`}} >
                    

            <div className="mr-0 md:mr-40">
                <div className="flex  flex-col  gap-4  bg-white/80  p-4  w-max  rounded-2xl">
                    <h2 className="text-neutral-700 text-5xl font-bold">Hi {client} !</h2>
                    <h2 className="text-neutral-700 text-5xl" >{title}</h2>
                    <p className="text-neutral-700 text-2xl">{description}</p>
                    <Button variant="blacky" size="default" className="w-40" onClick={handleShopClick}>Shop Now</Button>
                </div>
            </div>
        </section>
    )
}
export default HeroBanner;
