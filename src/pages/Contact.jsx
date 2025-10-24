import { motion } from "framer-motion";
import { Store, Phone, Mail, Truck, Banknote, LockKeyhole, ChevronRight } from "lucide-react";
import { Button } from "../Components/ui/button.jsx"

export default function Contact() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="mx-[7rem] pt-6">
                {/* About Us */}
                <div className="space-y-8">
                    <div className="w-3xl">
                        <h3 className="text-5xl font-medium">
                            We believe in smarter choices. We're passionate about modern technology.
                        </h3>

                        <p className="mt-8">
                            Our store brings you the latest smartphones, high-quality headphones, and
                            innovative smartwatches from trusted global brands. We carefully select every
                            product to offer performance, design, and reliability that fit your lifestyle.
                            Whether you're upgrading your phone, exploring wireless sound, or finding the
                            perfect smartwatch, our goal is to make smart technology accessible, simple, and
                            inspiring for everyone.
                        </p>
                    </div>

                    <div className="flex w-full">
                        <img src="" alt="About Us" className="w-1/2 object-cover" />

                        <div className="flex flex-col justify-center px-8 py-[60px] w-1/2 bg-neutral-100">
                            <h4 className="text-4xl font-medium">About Us</h4>
                            <p className="text-base font-normal pt-4 pb-2">
                                Smart-Hub is a trusted online store based in Egypt, specializing in smartphones,
                                headphones, and smartwatches. Established in 2019, we're dedicated to bringing
                                you the latest tech from top global brands at the best value.
                            </p>
                            <p className="text-base font-normal pb-8">
                                Our customer service team is always ready to assist you — anytime, anywhere,
                                24/7.
                            </p>
                            <a href="" className="flex gap-1 hover:underline">
                                Shop Now
                                <ChevronRight />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Us */}
                <div className="mt-8">
                    <h4 className="text-4xl font-medium text-center mb-8">Contact Us</h4>

                    <div className="flex gap-6 pb-4">
                        <div className="flex flex-col items-center w-1/3 h-[150px] bg-neutral-100 text-center p-2">
                            <div className="py-2">
                                <Store size={30} />
                            </div>
                            <p className="font-bold text-base text-neutral-500">ADDRESS</p>
                            <p className="pt-1 w-3/5 text-base font-semibold">
                                234 Hai Trieu, Ho Chi Minh City, Viet Nam
                            </p>
                        </div>

                        <div className="flex flex-col items-center w-1/3 h-[150px] bg-neutral-100 text-center p-2">
                            <div className="py-2">
                                <Phone size={30} />
                            </div>
                            <p className="font-bold text-base text-neutral-500">CONTACT US</p>
                            <p className="pt-1 text-base font-semibold">+84 234 567 890</p>
                        </div>

                        <div className="flex flex-col items-center w-1/3 h-[150px] bg-neutral-100 text-center p-2">
                            <div className="py-2">
                                <Mail size={30} />
                            </div>

                            <p className="font-bold text-base text-neutral-500">EMAIL</p>
                            <p className="pt-1 text-base font-semibold">hello@3legant.com</p>
                        </div>
                    </div>

                    <div className="flex mb-6">
                        <div className="w-1/2">
                            <form>
                                <div className="flex flex-col mb-6 w-5/6">
                                    <label
                                        htmlFor="full-name"
                                        className="font-bold text-xs text-neutral-500 mb-2"
                                    >
                                        FULL NAME
                                    </label>
                                    <input
                                        id="full-name"
                                        name="full-name"
                                        type="text"
                                        placeholder="Your name"
                                        className="border border-neutral-300 rounded-md p-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col mb-6 w-5/6">
                                    <label
                                        htmlFor="email"
                                        className="font-bold text-xs text-neutral-500 mb-2"
                                    >
                                        EMAIL ADDRESS
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Your Email"
                                        className="border border-neutral-300 rounded-md p-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-5/6">
                                    <label
                                        htmlFor="message"
                                        className="font-bold text-xs text-neutral-500 mb-2"
                                    >
                                        MESSAGE
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        className="resize-none h-40 border border-neutral-300 rounded-md p-2 mb-4"
                                        placeholder="Your message"
                                    ></textarea>
                                    <div>
                                        <Button variant="blacky" size="default">
                                            Send Message
                                        </Button>

                                    </div>


                                </div>
                            </form>
                        </div>

                        <div className="w-1/2">
                            <img src="src/assets/map.jpg" alt="map" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between bg-neutral-100 w-full py-[3rem] px-[10rem]">
                <div>
                    <Truck size={45} absoluteStrokeWidth />
                    <p className="font-medium text-xl pt-2">Free Shipping</p>
                    <p className="text-sm font-normal text-neutral-500">Order above $200</p>
                </div>
                <div>
                    <Banknote size={45} absoluteStrokeWidth />
                    <p className="font-medium text-xl pt-2">Money-back</p>
                    <p className="text-sm font-normal text-neutral-500">30 days guarantee</p>
                </div>
                <div>
                    <LockKeyhole size={45} absoluteStrokeWidth />
                    <p className="font-medium text-xl pt-2">Secure Payments</p>
                    <p className="text-sm font-normal text-neutral-500">Secured by Stripe</p>
                </div>
                <div>
                    <Phone size={45} absoluteStrokeWidth />
                    <p className="font-medium text-xl pt-2">24/7 Support</p>
                    <p className="text-sm font-normal text-neutral-500">Phone and Email support</p>
                </div>
            </div>
        </motion.div>
    );
}