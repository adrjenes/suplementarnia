"use client"

import {ImageType} from "@/app/admin/add-products/AddProductForm";
import React, {useCallback, useEffect, useState} from "react";
import DropImage from "@/app/components/inputs/DropImage";
import Button from "@/app/components/Button";

interface SelectColorProps {
    item: ImageType;
    addImageToState: (value: ImageType) => void;
    removeImageFromState: (value: ImageType) => void;
    isProductCreated: boolean;
}


const SelectImage: React.FC<SelectColorProps> = ({item, addImageToState, removeImageFromState, isProductCreated}) => {
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if(isProductCreated) {
            setFile(null);
        }
    }, [isProductCreated]);

    const handleFileChange = useCallback((value: File) => {
        setFile(value);
        addImageToState({...item, image: value});
    }, []);

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setFile(null);
        }
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-slate-200 items-center p-2">
            <>
                {!file && ( <div className="col-span-2 text-center">
                    <DropImage handleFileChange={handleFileChange}/>
                </div>
                )}
                {file && (
                    <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                        <p>{file?.name}</p>
                        <div className="w-70px">
                            <Button label="Anuluj" small outline onClick={() => {
                                setFile(null)
                                removeImageFromState(item);
                            }}/>
                        </div>
                    </div>
                )}
            </>
        </div>
    )

}
export default SelectImage;