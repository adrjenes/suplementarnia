"use client"

import React, {useEffect, useState} from "react";
import Image from "next/image";
import { truncateText } from "@/utils/truncateText";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import Pagination from "@/app/components/Pagination";

interface ProductCardProps {
    data: any
}

const ProductCard: React.FC<ProductCardProps> = ({data}) => {
    const router = useRouter();
    const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length
    return <div>
        <div onClick={() => router.push(`/product/${data.id}`)}
             className="col-span-1 border-2 border-slate-300 bg-white rounded-lg p-4 hover:shadow-md hover:border-green-600 text-center text-sm cursor-pointer transition-all duration-300 ease-in-out">
            <div className="flex flex-col items-center w-full gap-2">
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image fill src={data.images[0].image} alt={data.name} className="w-full h-full object-contain"/>
                </div>
                <div className="mt-2 font-medium">{truncateText(data.name)}</div>
                <div className="flex items-center justify-center">
                    <Rating value={productRating} readOnly size="small"/>
                    <span className="ml-1 text-xs text-gray-600">({data.reviews.length})</span>
                </div>
                <div className="mt-1 text-lg font-semibold text-gray-800">{formatPrice(data.price)}</div>
            </div>
        </div>
    </div>
}
export default ProductCard;