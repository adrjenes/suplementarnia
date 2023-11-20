"use client"

import {useCart} from "@/hooks/useCart";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/app/checkout/CheckoutForm";
import Button from "@/app/components/Button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutClient = () => {
    const {cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [finalProducts, setFinalProducts] = useState([]);

    const router = useRouter();

    console.log("paymentIntent ", paymentIntent);
    console.log("clientSecret ", clientSecret);

    useEffect(() => {
        if (cartProducts) {
            const mergedProducts = {};

            cartProducts.forEach(product => {
                const updatedProduct = {
                    ...product,
                    selectedFlavour: {
                        ...product.selectedFlavour,
                        quantity: product.quantity
                    }
                };
                console.log("updatedProduct", updatedProduct);
                if (!mergedProducts[updatedProduct.id]) {
                    mergedProducts[updatedProduct.id] = { ...updatedProduct, selectedFlavour: [{ ...updatedProduct.selectedFlavour }] };
                } else {
                    mergedProducts[updatedProduct.id].selectedFlavour.push({ ...updatedProduct.selectedFlavour });
                }

            });
            const finalCartProducts = Object.values(mergedProducts);
            console.log("final", finalCartProducts)
            console.log("cart", cartProducts)
            setLoading(true)
            setError(false)

                fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        items: finalCartProducts,
                        payment_intent_id: paymentIntent
                    })
                }).then((res) => {
                    setLoading(false);
                    if (res.status === 401) {
                        return router.push('/login');
                    }
                    return res.json();
                }).then((data) => {
                    setFinalProducts(finalCartProducts);
                    setClientSecret(data.paymentIntent.client_secret)
                    handleSetPaymentIntent(data.paymentIntent.id)
                }).catch((error) => {
                    setError(true);
                    console.log("Error, error");
                    toast.error("Something went wrong");
                })
            }

    }, [cartProducts, paymentIntent]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        }
    }

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value);
    }, []);


    useEffect(() => {
        if (paymentSuccess && finalProducts.length > 0) {
            const updateProductQuantities = async () => {
                try {
                    await fetch('/api/update-product-quantities', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({products: finalProducts}) // Użyj finalProducts
                    });
                    // Dodatkowe akcje po pomyślnej aktualizacji
                } catch (error) {
                    console.error('Błąd podczas aktualizacji ilości produktów', error);
                } finally {
                    localStorage.removeItem("eShopPaymentIntent");
                }
            };

            updateProductQuantities();
        }
    }, [paymentSuccess, finalProducts]);
    return <div className="w-full">
        {clientSecret && cartProducts && (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm
                    clientSecret={clientSecret}
                    handleSetPaymentSuccess={handleSetPaymentSuccess}
                />
            </Elements>
        )}
        {loading && <div className="text-center">Ładowanie zakupu...</div>}
        {error && (
            <div className="text-center text-rose-500">Something went wrong...</div>
            )}
        {paymentSuccess && (
            <div className="flex items-center flex-col gap-4">
                <div className="text-teal-500 text-center">Transakcja zakończona sukcesem</div>
                <div className="max-w-[220px] w-full">
                    <Button
                        label="Przegląd zamówień"
                        onClick={() => router.push("/orders")}
                    />
                </div>
            </div>
        )}
    </div>;
}
export default CheckoutClient;