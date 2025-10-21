function Services () {
    return ( 
        <div className="flex justify-center mx-40 py-10">
            <div className="flex gap-8 w-full">
                <div className=" bg-gray-200 p-4 w-1/4 h-48 flex flex-col justify-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="  text-gray-700 " width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck-icon lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                    <h4 className="text-2xl text-neutral-700">Free Shipping</h4>
                    <p className="text-sm text-neutral-500">Orders over $50</p>
                </div>
                <div className="bg-gray-200 p-4 w-1/4 h-48 flex flex-col justify-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="  text-gray-700 " width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote-icon lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                    <h4 className="text-2xl text-neutral-700">Money Back</h4>
                    <p className="text-sm text-neutral-500">30 day guarantee</p>
                </div>
                <div className="bg-gray-200 p-4 w-1/4 h-48 flex flex-col justify-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="   text-gray-700 " width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
                    <h4 className="text-2xl text-neutral-700">Secure Payment</h4>
                    <p className="text-sm text-neutral-500">Secured by Stripe</p>
                </div>
                <div className="bg-gray-200 p-4 w-1/4 h-48 flex flex-col justify-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="  text-gray-700 " width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
                    <h4 className="text-2xl text-neutral-700">24/7 Support</h4>
                    <p className="text-sm text-neutral-500">Phone and Email support</p>
                </div>
            </div>
        </div>
    ) ;
}

export default Services;