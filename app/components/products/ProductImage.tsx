"use client"

import React, {useState} from "react";
import {CartProductType, SelectedImageType} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
    cartProduct: CartProductType;
    product: any;
    handleFlavourSelect: (value: SelectedImageType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
    cartProduct,
    product,
    handleColorSelect}) => {

    const [isSelect, setIsSelect] = useState(product.images[0].image);

    return <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div
            className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            {product.images.map((image: SelectedImageType) => {
                return (
                    <div key={image.image} onClick={() => setIsSelect(image.image)}
                         className={`relative w-[80%] aspect-square rounded border-teal-300 
                         ${isSelect  === image.image ? 'border-[1.5px]' : 'border-none'}`}
                    >
                        <Image src={image.image} alt={image.image} fill className="object-contain"/>
                    </div>
                )
            })}
        </div>
        <div className="col-span-5 relative aspect-square">
            <Image fill src={isSelect} alt={cartProduct.name}
                   className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
            />
        </div>
    </div>
};

export default ProductImage;