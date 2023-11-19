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
    quantity: number | null,
}
const Horizontal = () => {
    return <hr className="w-[30% my-2]"/>
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

            if (existingIndex > -1) {
                setIsProductInCart(true);
            }
        }
    }, [cartProducts])

    const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;

    const handleFlavourSelect = useCallback(
        (value: SelectedFlavourType) => {
            setCartProduct((prev) => {
                const availableQuantity = product.details.find(detail => detail.flavour === value.flavour)?.quantity || 0;
                return {
                    ...prev,
                    selectedFlavour: value,
                    quantity: 1,
                };
            });
        }, [product.details, cartProduct.selectedFlavour]);





    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            <ProductImage cartProduct={cartProduct} product={product} handleFlavourSelect={handleFlavourSelect}/>
            <div className="flex flex-col gap-5 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2 pt-1.5">
                    <Rating value={productRating} readOnly/>
                    <div className="pt-0.5">Opinie: {product.reviews.length}</div>
                </div>
                <Horizontal/>
                <div className="text-justify">{product.description}</div>
                <Horizontal/>
                <div>
                    <span className="font-semibold">KATEGORIA:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">PRODUCENT:</span> {product.brand}
                </div>
                <div className={product.inStock ? "text-teal-400" : "text-red-400"}>
                    {product.inStock ? 'W magazynie' : 'Brak na stanie'}
                </div>
                <Horizontal/>

                            <SetFlavour cartProduct={cartProduct} details={product.details}
                                        handleFlavourSelect={handleFlavourSelect}/>
                            <Horizontal/>
                            <div className="max-w-[300px] pt-6">
                                <Button label="Dodaj do koszyka" onClick={() => handleAddProductToCart(cartProduct)}/>
                            </div>
            </div>
        </div>
    )
}
export default ProductDetails;