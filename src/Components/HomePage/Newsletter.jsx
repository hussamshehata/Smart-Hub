import { useState } from "react";

function Newsletter() {
    const [email,setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        setEmail("");
        setSuccess(true);
        
        setTimeout(()=> {
            setSuccess(false);
        },3000);
    };

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

            <div className="flex flex-col items-center justify-center py-20  relative ">
                <h2 className="text-neutral-700 text-4xl mb-4 text-center">{formData[0].title}</h2>
                <p className="text-neutral-700 text-2xl mb-8 text-center">{formData[0].description}</p>

                <form onSubmit={handleSubmit} className="flex items-center gap-2 text-1xl">
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-80 border border-neutral-700 rounded-md p-2 " />
                    <button type="submit" className="bg-transparent text-neutral-700 border border-neutral-700 rounded-md p-2 cursor-pointer disabled:text-opacity-50 disabled:cursor-default" disabled={!email}>SignUp</button>
                </form>
                {success && (<p className="absolute bottom-4 -translate-y-full mt-4 text-neutral-700 font-medium">Your account has been successfully registered.</p>)}
                    
            </div>
        </div>

        );
}

export default Newsletter;