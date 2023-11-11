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
import React from "react";

interface CartClientProps {
    currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart();

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

    return <div>
        <Heading title="Twój koszyk" center/>
        <div className="grid grid-cols-5 text-xs gap-4 pb-6 items-center mt-8">
            <div className="col-span-2 justify-self-start">PRODUKT</div>
            <div className="justify-self-center">CENA</div>
            <div className="justify-self-center">ILOŚĆ</div>
            <div className="justify-self-end">CAŁOŚĆ</div>
        </div>
        <div>
            {cartProducts && cartProducts.map((item) => {
                return <ItemContent key={item.id} item={item}/>
            })}
        </div>
        <div className="border-t-[1.5px] border-slate-200 py-6 flex justify-between gap-4">
            <div className="w-[150px]">
                <Button label="Wyczyść koszyk" onClick={() => {handleClearCart()}} small outline />
            </div>
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