"use client"

import {CartProductType, SelectedFlavourType} from "@/app/product/[productId]/ProductDetails";
import React, {useEffect, useState} from "react";



interface SetFlavourProps {
    details: SelectedFlavourType[],
    cartProduct: CartProductType,
    handleFlavourSelect: (value: SelectedFlavourType) => void,
    isProductInCart: boolean
}

const SetFlavour: React.FC<SetFlavourProps> = ({details, cartProduct, handleFlavourSelect, isProductInCart}) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFlavour = details.find(detail => detail.flavour === event.target.value);
        if (selectedFlavour) {
            handleFlavourSelect(selectedFlavour);
        }
    }

    return (
        <div className="flex gap-4 items-center">
            {details.length >= 1 && <span className="font-semibold">SMAK:</span>}
            <div className="p-0.5">
                <select
                    value={cartProduct.selectedFlavour.flavour}
                    onChange={handleSelectChange}
                    className={`border-green-600 text-slate-700 border-[2px] rounded px-3 py-2`}>
                    {details.map(detail => (
                        <option
                            key={detail.flavour}
                            value={detail.flavour}
                            className="text-slate-700"
                        >
                            {detail.flavour}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SetFlavour;