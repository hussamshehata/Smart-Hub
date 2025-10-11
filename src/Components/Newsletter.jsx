function Newsletter() {
  return (
    <div className=" bg-[url('src/assets/newsletter.jpg')]  bg-cover  bg-center  bg-no-repeat" >

        <div className="newsletter">
            <div className="flex flex-col items-center justify-center py-16">
                <p className="text-5xl mb-4">Join Our Newsletter</p>
                <p className="text-2xl mb-8">Sign up for deals, new products and promotions</p>

                <form className="text-2xl mb-8">
                    <input type="email" placeholder="Enter your email" className="p-2 w-80 border border-gray-400 bg-transparent rounded" />
                    <button className="bg-transparent border border-gray-400 text-gray-600 px-4 ml-4 py-2 rounded cursor-pointer">Signup</button>
                </form>

                 <hr />
            </div>
        </div>
    </div>

     );
}

export default Newsletter;