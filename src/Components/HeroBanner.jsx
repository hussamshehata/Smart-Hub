import { Button } from "@/Components/ui/button";

function HeroBanner() {
    return (
        <section
                className=" h-screen  bg-[url('https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885739/hero1_tft7te.jpg')] bg-cover  bg-center  bg-no-repeat  flex  flex-col  justify-center " >
                
                <div className="flex flex-col gap-4 w-11/12 sm:w-3/4 md:w-1/2 text-center md:text-right items-center md:items-start">
                </div>
        
                <div className="flex flex-col gap-4 w-1/2 self-end">
                    <h2 className="text-neutral-700 text-5xl" >Welcome to Smart Hub !</h2>
                    <p className="text-neutral-700 text-2xl">Your one-stop shop for all things tech.</p>
                    <Button variant="blacky" size="default" className="w-40">Shop Now</Button>
                </div>
        </section>
    )
}
export default HeroBanner;

