"use client"
import {useCart} from "@/hooks/useCart";
import Link from "next/link";
import {MdArrowBack} from "react-icons/md";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";
import ItemContent from "@/app/cart/ItemContent";
import {formatPrice} from "@/utils/formatPrice";
import {SafeUser} from "@/types";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {FaShoppingBasket} from "react-icons/fa";

interface CartClientProps {
    currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart();
    const [color, setColor] = useState("");
    const router = useRouter();

    if (!cartProducts || cartProducts.length == 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Twój koszyk jest pusty</div>
                <div>
                    <Link href={"/"} className="text-green-700 flex items-center gap-1 mt-2">
                        <MdArrowBack/>
                        <span>Rozpocznij zakupy</span>
                    </Link>
                </div>
            </div>
        )
    }
    console.log(cartProducts)
    return <div>
        <div className="flex text-center items-center pt-2 gap-3">
            <p className={`text-4xl font-bold hover:text-green-700 ${color}`}
               onMouseEnter={() => setColor("text-green-700")}
               onMouseLeave={() => setColor("")}
            >
                TWÓJ KOSZYK
            </p>
            <FaShoppingBasket size={30} className={`${color}`} onMouseEnter={() => setColor("text-green-700")} onMouseLeave={() => setColor("")}/>
            <div className="pl-4">
                <button
                    onClick={() => {handleClearCart()}}
                    className="text-green-700 border-green-600 border-[2px] rounded-full p-0.5 px-2"
                >Wyczyść koszyk</button>
            </div>
        </div>

        <div className="pt-6">
            {cartProducts && cartProducts.map((item) => {
                return <ItemContent key={item.id} item={item}/>
            })}
        </div>
        <div className="border-t-[1.5px] border-slate-200 py-6 flex justify-between gap-4">

            <div className="text-sm flex flex-col gap-5 items-start">
                <div className="flex justify-between w-full text-base font-semibold">
                    <span>Suma całkowita</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                </div>
                <p className="text-slate-500">VAT i przesyłka obliczane przy podsumowaniu koszyka</p>
                <Button
                    label={currentUser ? 'Przejdź do płatności' : 'Zaloguj się, aby przejść do płatności'}
                    outline = {currentUser ? false : true}
                    onClick={() => {currentUser ? router.push('/checkout') : router.push('/login')}}
                />
                <Link href={"/"} className="text-green-700 flex items-center gap-1">
                    <MdArrowBack/>
                    <span>Kontynuuj zakupy</span>
                </Link>
            </div>
        </div>
    </div>

}
export default CartClient;