"use client"

import React, {useEffect, useState} from "react";
import {useCart} from "@/hooks/useCart";
import {useElements, useStripe, PaymentElement, AddressElement} from "@stripe/react-stripe-js";
import {formatPrice} from "@/utils/formatPrice";
import toast from "react-hot-toast";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

interface CheckoutFormProps {
    clientSecret: string;
    handleSetPaymentSuccess: (value: boolean) => void,
    handleSetOrderProcessing: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    clientSecret,
    handleSetPaymentSuccess,
    handleSetOrderProcessing,
}) => {
    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent} = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const formattedPrice = formatPrice(cartTotalAmount);

    useEffect(() => {
        if (!stripe) {
            return;
        }
        if (!clientSecret) {
            return;
        }
        handleSetPaymentSuccess(false);
    }, [stripe]);

    const handleSubmit = async(e: React.FormEvent) => {

        e.preventDefault();
        handleSetOrderProcessing(true); 
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);
        
        stripe
            .confirmPayment({
                elements,
                redirect: 'if_required'
        }).then(result => {
            if (!result.error) {
                toast.success('Checkout Success')
                handleClearCart();
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
                handleSetOrderProcessing(false); 
            }
            setIsLoading(false);
        })
    }
    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Wprowadź swoje dane, aby dokończyć transakcję"/>
            </div>
            <h2 className="font-semibold mb-2">Informacje o adresie</h2>
            <AddressElement
                options={{
                    mode: "shipping",
                    allowedCountries: ["PL", "US"],
                }}
                />
            <h2 className="font-semibold mt-4 mb-2">Informacje o płatności</h2>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }}/>
            <div className="py-4 text-center text-slate-700 text-4xl font-bold">
                Suma: {formattedPrice}
            </div>
            <Button label={isLoading ? "Przetwarzanie" : "Zapłać teraz"} disabled={isLoading || !stripe || !elements} onClick={() => {}}/>
        </form>
    )
}
export default CheckoutForm;














