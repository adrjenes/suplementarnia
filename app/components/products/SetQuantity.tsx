"use client"

import {CartProductType} from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
    maxQuantity: number | null;
}
const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded';

const SetQuantity: React.FC<SetQtyProps> = ({
                                                cartCounter,
                                                cartProduct,
                                                handleQtyIncrease,
                                                handleQtyDecrease,
                                                maxQuantity
                                            }) => {
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
                    disabled={cartProduct.quantity >= maxQuantity}
                >
                    +
                </button>

            </div>
        </div>
    );
};
export default SetQuantity;