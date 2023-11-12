"use client"

import {ImageType} from "@/app/admin/add-products/AddProductForm";
import React, {useCallback, useEffect, useState} from "react";
import DropImage from "@/app/components/inputs/DropImage";
import Button from "@/app/components/Button";

interface SelectFlavourProps {
    item: ImageType;
    addImageToState: (value: ImageType) => void;
    removeImageFromState: (value: ImageType) => void;
    isFlavourCreated: boolean;
}


const SelectImage: React.FC<SelectFlavourProps> = ({item, addFlavourToState, isFlavourCreated}) => {
    const [flavour, setFlavour] = useState("");

    useEffect(() => {
        if(isFlavourCreated) {
            setFlavour(null);
        }
    }, [isFlavourCreated]);

    const handleFileChange = useCallback((value: string) => {
        setFlavour(value);
        addFlavourToState({...item, image: value});
    }, []);

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setFlavour(null);
        }
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
            <div className="flex flex-row gap-2 items-center h-[60px]">
            </div>
            <>
                {flavour && (
                    <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                        <p>{flavour?.length}</p>
                    </div>
                )}
            </>
        </div>
    )

}
export default SelectImage;