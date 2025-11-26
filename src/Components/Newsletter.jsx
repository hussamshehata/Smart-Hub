function Newsletter() {

    const formData =[
        {id:"1" ,
        title:"Join Our Newsletter" ,
        description:"Sign up for deals, new products and promotions",
        bgImage : "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760886047/newsletter_rszlrk.jpg"
    }
    ];

    return (
        <div className=" flex  flex-col  justify-center"
        style={{ backgroundImage: `url(${formData[0].bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >

            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-neutral-700 text-4xl mb-4">{formData[0].title}</h2>
                <p className="text-neutral-700 text-2xl mb-8">{formData[0].description}</p>

                <form className="flex gap-2 text-1xl border-b border-neutral-500 pb-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                    <input type="email" placeholder="Enter your email" className="bg-transparent w-96" />
                    <button type="button" className="bg-transparent text-neutral-700 cursor-pointer">SignUp</button>
                </form>
                    
            </div>
        </div>

        );
}

export default Newsletter;