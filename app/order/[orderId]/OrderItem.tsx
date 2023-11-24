"use client"

import { CartProductType } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { truncateText } from "@/utils/truncateText";
import { formatPrice } from "@/utils/formatPrice";

interface OrderItemProps {
    item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
    const displayFlavours = () => {
        return item.selectedFlavour.map((flavour, index) => (
            <span key={index}>
                {flavour.flavour}: {flavour.quantity}<br/>
                {index < item.selectedFlavour.length - 1}
            </span>
        ));
    };

    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <div className="relative w-[70px] aspect-square">
                    <Image
                        src={item.selectedImage.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div>{truncateText(item.name)}</div>
                </div>
            </div>
            <div className="justify-self-center">{formatPrice(item.price)}</div>
            <div className="justify-self-center">{displayFlavours()}</div>
            <div className="justify-self-end font-semibold text-green-700">{(item.price * item.quantity).toFixed(2)} zł</div>
        </div>
    )
}

export default OrderItem;