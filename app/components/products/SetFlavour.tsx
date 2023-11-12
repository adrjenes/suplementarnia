"use client"

import {CartProductType, SelectedFlavourType} from "@/app/product/[productId]/ProductDetails";
import React from "react";

interface SetColorProps {
    details: SelectedFlavourType[],
    cartProduct: CartProductType,
    handleFlavourSelect: (value: SelectedFlavourType) => void
}

const SetFlavour: React.FC<SetColorProps> = ({
   details, cartProduct, handleFlavourSelect
}) => {
    return <div>
        <div className="flex gap-4 items-center">
            {details.length >= 1 ? <span className="font-semibold">SMAK:</span> : ""}
            <div className="flex gap-1">
                {details.map((details) => {
                    return (
                        <div key={details.flavour} onClick={() => handleFlavourSelect(details)}
                             className={`h-12 w-12 rounded border-teal-300 flex items-center justify-center px-12
                        ${
                            cartProduct.selectedFlavour.flavour === details.flavour ? 'border-[2px]' : 'border-[1.5px]'
                        }
                        `}>
                                <p>{details.flavour}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
}
export default SetFlavour;