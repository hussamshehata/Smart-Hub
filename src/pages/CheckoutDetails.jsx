import React from "react";
import Navbar from "../Components/Navbar&Footer/Navbar.jsx";
import Shipping from "../components/shippingForm";
import ContactInformation from "../components/ContactInformation";
import PaymentForm from "../Components/PaymentForm";

export default function CheckoutDetails() {
    return (
        <>
            <Navbar />

            <ContactInformation />
            <Shipping />
            <PaymentForm />

        </>
    );
}
