function Services () {
    return ( 
        <div className="flex justify-center py-16 ">
        <ul className="list-none flex gap-8">
            <li className="bg-gray-300 p-4 w-56 flex flex-col justify-center">
                <img src="service.jpg" className="w-8 h-8"/>
                <h4 className="my-4 font-bold">Free Shipping</h4>
                <p className="description">Orders over $50</p>
            </li>
            <li className="bg-gray-300 p-4 w-56 flex flex-col justify-center">
                <img src="service.jpg" className="w-8 h-8"/>
                <h4 className="my-4 font-bold">Money Back Guarantee</h4>
                <p className="description">30 day guarantee</p>
            </li>
            <li className="bg-gray-300 p-4 w-56 flex flex-col justify-center">
                <img src="service.jpg" className="w-8 h-8"/>
                <h4 className="my-4 font-bold">Secure Payment</h4>
                <p className="description">Secured by Stripe</p>
            </li>
            <li className="bg-gray-300 p-4 w-56 flex flex-col justify-center">
                <img src="service.jpg" className="w-8 h-8"/>
                <h4 className="my-4 font-bold">24/7 Support</h4>
                <p className="description">Phone and Email support</p>
            </li>
        </ul>
    </div>

    ) ;
}

export default Services;