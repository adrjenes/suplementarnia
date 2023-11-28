"use client"

import {CartProductType} from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
    maxQuantity: number | null;
}
const btnStyles = 'border-[1.2px] border-slate-300 max-sm:px-1 px-2 rounded';

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
            <div className="flex max-sm:flex-col max-sm:gap-1 gap-4 items-center text-white text-base">
                <button
                    onClick={handleQtyDecrease}
                    className={`border-2 max-sm:px-1 px-2 rounded ${cartProduct.quantity <= 1 ? 'bg-slate-200 border-slate-200' : 'bg-green-600 border-green-600'}`}
                    disabled={cartProduct.quantity <= 1}
                >
                    -
                </button>
                <div className="text-black">{cartProduct.quantity}</div>
                <button
                    onClick={handleQtyIncrease}
                    className={`border-2 max-sm:px-1 px-2 rounded ${cartProduct.quantity >= maxQuantity ? 'bg-slate-200 border-slate-200' : 'bg-green-600 border-green-600'}`}
                    disabled={cartProduct.quantity >= maxQuantity}
                >
                    +
                </button>

            </div>
        </div>
    );
};
export default SetQuantity;