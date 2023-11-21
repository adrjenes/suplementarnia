"use client"

import {useCart} from "@/hooks/useCart";
import {useRouter} from "next/navigation";
import {CiShoppingCart} from "react-icons/ci";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {FiShoppingCart} from "react-icons/fi";

const CartCount = () => {
    const { cartTotalQty } = useCart();
    const router = useRouter();

    return (
        <div
            className="relative cursor-pointer pt-2 pr-3"
            onClick={() => router.push("/cart")}
            >
            <div className="text-3xl">
                <FiShoppingCart className="hover:text-green-700"/>
            </div>
            <span
                className="absolute
                top-[-2px]
                right-[-2px]
                bg-green-700
                text-white
                h-6
                w-6
                rounded-full
                flex
                items-center
                justify-center
                text-sm
                "
                >
                    {cartTotalQty}
            </span>
        </div>
    );
};
export default CartCount;