"use client"
import {useCart} from "@/hooks/useCart";
import Link from "next/link";
import {MdArrowBack} from "react-icons/md";
import Button from "@/app/components/Button";
import ItemContent from "@/app/cart/ItemContent";
import {formatPrice} from "@/utils/formatPrice";
import {SafeUser} from "@/types";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {FaShoppingBasket} from "react-icons/fa";
import { VscDebugContinue } from "react-icons/vsc";
import { MdOutlinePayment } from "react-icons/md";
interface CartClientProps { currentUser: SafeUser | null; }

const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    const {cartProducts, handleClearCart, cartTotalAmount, handleSetPaymentIntent} = useCart();
    const [color, setColor] = useState("");
    const router = useRouter();
    const [loadingPaymentStep, setLoadingPaymentStep] = useState(false);

    if (!cartProducts || cartProducts.length == 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Twój koszyk jest pusty</div>
                <div>
                    <Link href={"/"} className="text-green-700 flex items-center gap-1 mt-2">
                        <MdArrowBack/> <span>Rozpocznij zakupy</span>
                    </Link>
                </div>
            </div>
        )
    }
    const handlePaymentStep =async () => {
        setLoadingPaymentStep(true);
        console.log(cartTotalAmount);
        const paymentIntentBody = {
            items: [],
            totalAmount: formatPrice(cartTotalAmount),
            payment_intent_id: null
        }
        await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(paymentIntentBody)
        }).then((res) => {
            console.log(res);
            if (res.status === 401) { return router.push('/login') }
            else if (res.status === 400) { return router.push('/cart') }
            return res.json();
        }).then((data) => {
            if(data.paymentIntent) {
                handleSetPaymentIntent(data.paymentIntent);
                setLoadingPaymentStep(false);
                router.push('/checkout');
            }
        }).catch((error) => {console.error("Something went wrong")})
    }
    return <div>
        <div className="flex  items-center  gap-3">
            <p className={`text-4xl font-bold hover:text-green-700 ${color}`} onMouseEnter={() => setColor("text-green-700")} onMouseLeave={() => setColor("")}>
                TWÓJ KOSZYK
            </p>
            <FaShoppingBasket size={30} className={`${color}`} onMouseEnter={() => setColor("text-green-700")} onMouseLeave={() => setColor("")}/>
            <div className="pl-4">
                <button onClick={() => {handleClearCart()}} className="text-green-700 border-green-600 border-[2px] rounded-full p-0.5 px-2">
                    Wyczyść koszyk
                </button>
            </div>
        </div>
        <div className="max-xl:block flex pt-8 justify-between">
            <div className="h-[550px] max-sm:h-[300px] xl:w-[70%] overflow-auto hover:overflow-y-scroll ">
                {cartProducts && cartProducts.map((item, idx) => {
                    return <ItemContent key={idx} item={item}/>
                })}
            </div>
            <div className="xl:pl-12">
                <div className="text-sm flex flex-col gap-4 items-start max-xl:pt-4 w-[30vh]">
                    <div className="flex flex-col justify-between w-full text-base font-semibold">
                        <span className="pb-4">Suma całkowita:</span>
                        <span className="text-3xl">{formatPrice(cartTotalAmount)}</span>
                    </div>

                    <Button icon={MdOutlinePayment} label={currentUser ? loadingPaymentStep ? "Ładowanie formularza płatności" : 'Przejdź do płatności' : 'Zaloguj się, aby przejść do płatności'}
                        outline = {currentUser ? false : true} onClick={handlePaymentStep}
                    />
                    <Link href={"/"} className="text-green-700 gap-1 w-full">
                        <div className="flex items-center justify-end gap-1 pt-6">
                            <span className="text-md">Kontynuuj zakupy</span><VscDebugContinue size={25}/>
                        </div>

                    </Link>
                </div>
            </div>
        </div>
    </div>
}
export default CartClient;