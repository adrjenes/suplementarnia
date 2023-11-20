"use client"

import {useCart} from "@/hooks/useCart";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/app/checkout/CheckoutForm";
import Button from "@/app/components/Button";
import { CartProductType } from "@prisma/client";
import { formatPrice } from "@/utils/formatPrice";
import { set } from "react-hook-form";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
type MergedProduct = Omit<CartProductType, 'selectedFlavour'> & {selectedFlavour: Array<{flavour: string, quantity: number}>}

const CheckoutClient = () => {
    const {cartProducts, paymentIntent, handleSetPaymentIntent, cartTotalAmount } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    

    const router = useRouter();
    useEffect(() => {
        if(paymentIntent !== null) {
            setClientSecret(paymentIntent.client_secret);
            console.log(paymentIntent);
        }
    }, [paymentIntent]);

    const mergeProducts = useCallback(() => {
        
        if (cartProducts !== undefined && cartProducts != null && cartProducts.length > 0) {
            const mergedProducts: MergedProduct[] = [];

            cartProducts.forEach((product) => {
                //add or update updatedproduct
                const existingIndex = mergedProducts.findIndex((item) => item.id === product.id);
                const flavour = {flavour: product.selectedFlavour.flavour as string , quantity: product.quantity}; 
                const updatedProduct: MergedProduct = {
                    ...product,
                    selectedFlavour: [flavour]
                    
                };
                if(existingIndex !== -1){
                    mergedProducts[existingIndex].selectedFlavour.push(flavour);
                    return;
                } else {

                    mergedProducts.push(updatedProduct);
                }
            });
            return mergedProducts; 
          
           
        }
    }, [cartProducts]);

    const finalProducts = mergeProducts(); 
     

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        }
    }

    const handleSetPaymentSuccess = async () => {
        try {
            await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({items: finalProducts, payment_intent_id: paymentIntent.id, totalAmount: formatPrice(cartTotalAmount)}) // Użyj finalProducts
            }).then((res) => {
                //handle error
                return res.json(); 
            }).then((data) => {
                
                if(data.updated_order){
                    setPaymentSuccess(true);
                }
               
            });
            // Dodatkowe akcje po pomyślnej aktualizacji
        } catch (error) {
            console.error('Błąd podczas aktualizacji ilości produktów', error);
        } finally {
            localStorage.removeItem("eShopPaymentIntent");
        }


    }; 

    console.log(paymentSuccess); 
    return <div className="w-full">
        {(clientSecret && finalProducts !== undefined)&& (
           
            <Elements options={options} stripe={stripePromise} >
                <CheckoutForm clientSecret={paymentIntent.client_secret} handleSetPaymentSuccess={handleSetPaymentSuccess}/>
            </Elements>
           
           
        )}
        {loading && <div className="text-center">Ładowanie zakupu...</div>}
        {error && (
            <div className="text-center text-rose-500">Something went wrong...</div>
            )}
        {paymentSuccess === true ? (
            <div className="flex items-center flex-col gap-4">
                <div className="text-teal-500 text-center">Transakcja zakończona sukcesem</div>
                <div className="max-w-[220px] w-full">
                    <Button
                        label="Przegląd zamówień"
                        onClick={() => router.push("/orders")}
                    />
                </div>
            </div>
        ): <></>}
    </div>;
}
export default CheckoutClient;