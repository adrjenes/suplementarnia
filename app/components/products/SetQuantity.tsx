"use client"

import {CartProductType} from "@/app/product/[productId]/ProductDetails";
import {useEffect, useState} from "react";

interface SetQtyProps {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
    maxQuantity: number | null;
}
const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded';

const SetQuantity: React.FC<SetQtyProps> = ({cartCounter, cartProduct, handleQtyIncrease, handleQtyDecrease,}) => {
    const [quantity, setQuantity] = useState(0);

    return (
        <div className="flex gap-8 items-center">
            {cartCounter ? null : <div className="font-semibold">ILOŚĆ</div>}
            <div className="flex gap-4 items-center text-base">
                <button
                    onClick={handleQtyDecrease}
                    className={btnStyles}
                    disabled={cartProduct.quantity <= 1}
                >
                    -
                </button>
                <div>{cartProduct.quantity}</div>
                <button
                    onClick={handleQtyIncrease}
                    className={btnStyles}
                    disabled={cartProduct.quantity >= cartProduct.selectedFlavour.quantity}
                >
                    +
                </button>

            </div>
        </div>
    );
};
export default SetQuantity;