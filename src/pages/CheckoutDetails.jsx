import React from "react";
import Header from "../Components/Header";
import Shipping from "../components/shippingForm";
import ContactInformation from "../components/ContactInformation";
import PaymentForm from "../Components/PaymentForm";

export default function CheckoutDetails() {
    return (
        <>
            <Header />

            <ContactInformation />
            <Shipping />
            <PaymentForm />

        </>
    );
}
