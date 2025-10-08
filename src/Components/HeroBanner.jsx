function HeroBanner() {
    return (   
        <section 
                className=" h-screen  bg-[url('src/images/hero1.jpg')] bg-cover  bg-center  bg-no-repeat  flex  flex-col  justify-center " >
                <div className="w-1/2 self-end px-5">
                    <h1 className="text-black text-5xl mb-5" >Welcome to Smart Hub !</h1>
                    <p className="text-black text-2xl mb-5">Your one-stop shop for all things tech.</p>
                    <button className="px-8 py-4 text-lg bg-black text-white rounded-md cursor-pointer">Shop Now</button>
                </div>
        </section>
    )
}
export default HeroBanner;

