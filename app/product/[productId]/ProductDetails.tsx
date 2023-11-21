"use client"
import React, {useCallback, useEffect, useState} from "react";
import {Rating} from "@mui/material";
import SetFlavour from "@/app/components/products/SetFlavour";
import SetQuatity from "@/app/components/products/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import {useCart} from "@/hooks/useCart";
import {MdCheckCircle} from "react-icons/md";
import {useRouter} from "next/navigation";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { formatPrice } from "@/utils/formatPrice";
interface ProductDetailsProps {
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImage: SelectedImageType,
    selectedFlavour: SelectedFlavourType,
    quantity: number,
    price: number
}
export type SelectedImageType = {
    image: string;
}
export type SelectedFlavourType = {
    flavour: string,
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
    const {handleAddProductToCart, cartProducts} = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImage: {...product.images[0]},
        selectedFlavour: {...product.details[0]},
        quantity: 1,
        price: product.price,
    });
    const router = useRouter();

    useEffect(() => {
        setIsProductInCart(false)
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if (existingIndex > -1) setIsProductInCart(true);
        }

    }, [cartProducts])

    const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;

    const handleFlavourSelect = useCallback(
        (value: SelectedFlavourType) => {
            setCartProduct((prev) => {
                return {
                    ...prev,
                    selectedFlavour: value,
                    quantity: 1, // Reset quantity to 1 on flavour change
                };
            });
        }, [setCartProduct]);

    const handleQtyIncrease = useCallback(() => {
        setCartProduct((prev) => {
            return {...prev, quantity: prev.quantity + 1};
        });
    }, [cartProduct])

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) return;
        setCartProduct((prev) => {
            return {...prev, quantity: prev.quantity - 1};
        })
    }, [cartProduct])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={cartProduct} product={product} handleFlavourSelect={handleFlavourSelect}/>
            <div className="flex flex-col gap-3 text-slate-500 text-sm">
                <h2 className="text-3xl font-bold text-slate-700">{product.name}</h2>
                <div className="flex items-center pt-1.5">
                    <p className="text-gray-400 pr-5 uppercase pt-0.5 ">{product.brand}</p>
                    <Rating value={productRating} readOnly/>
                    <div className="pl-2 pt-0.5">Opinie: {product.reviews.length}</div>
                </div>
                <div className="text-justify pt-2 flex flex-col gap-3">
                    <div>
                        <a className="text-green-600 text-md font-bold">OPIS PRODUKTU</a>
                    </div>
                    <p className="whitespace-normal break-words">{product.description}</p>
                </div>
                <div className="flex py-4">
                    <span className="font-semibold text-green-600">KATEGORIA:</span>
                    <p className="pl-2 font-bold">{product.category}</p>
                </div>
                <div className="">
                    {product.inStock ?
                        (
                            <div>
                                <SetFlavour cartProduct={cartProduct} details={product.details}
                                            handleFlavourSelect={handleFlavourSelect}
                                />
                                <div className="py-4">
                                </div>
                                <SetQuatity cartProduct={cartProduct} handleQtyIncrease={handleQtyIncrease}
                                            handleQtyDecrease={handleQtyDecrease}/>
                                <div className="py-4">
                                </div>
                                <div className="text-3xl">{formatPrice(product.price)}</div>
                                <div className="max-w-[300px] pt-6">
                                    <button onClick={() => handleAddProductToCart(cartProduct)}
                                            className="rounded border-[3px] border-green-600 gap-2 cursor-pointer py-3 px-8 w-full flex items-center
                                                    justify-center text-white bg-green-600"
                                    >
                                        <span className="min-w-0 font-bold">Dodaj do koszyka</span>
                                        <AddShoppingCartIcon className="flex-shrink-0 font-bold"/>
                                    </button>
                                </div>
                            </div>


                        )
                        : (
                            <div className="pt-3">
                                <div className={product.inStock ? "text-teal-400 font-bold" : "text-red-400 font-bold"}>
                                    {product.inStock ? 'W MAGAZYNIE' : 'BRAK NA STANIE'}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}
export default ProductDetails;