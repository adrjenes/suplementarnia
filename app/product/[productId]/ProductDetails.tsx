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
import {formatPrice} from "@/utils/formatPrice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
        if (cartProducts) {
            setIsProductInCart(cartProducts.some(item =>
                item.id === cartProduct.id &&
                item.selectedFlavour.flavour === cartProduct.selectedFlavour.flavour
            ));
        } else {
            setIsProductInCart(false);
        }
    }, [cartProducts, cartProduct.id, cartProduct.selectedFlavour.flavour]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 max-lg:gap-6 gap-12 ">
            <ProductImage cartProduct={cartProduct} product={product} handleFlavourSelect={handleFlavourSelect}/>
            <div className="flex flex-col gap-3 text-slate-500 text-sm max-md:pt-6">
                <h2 className="text-3xl font-bold text-slate-700">{product.name}</h2>
                <div className="flex items-center max-lg:pt-0 pt-1.5">
                    <p className="text-gray-400  uppercase max-lg:pt-0 pt-0.5 pr-2">{product.brand}</p>
                    <Rating value={productRating} readOnly/>
                    <div className="pl-2 pt-0.5">Opinie: {product.reviews.length}</div>
                </div>
                <div className="text-justify pt-2 flex flex-col gap-3">
                    <div>
                        <a className="text-green-600 text-md font-bold">OPIS PRODUKTU</a>
                    </div>
                    <p className="whitespace-normal break-words">{product.description}</p>
                </div>
                <div className="flex max-lg:py-0 py-4">
                    <span className="font-semibold text-green-600">KATEGORIA:</span>
                    <p className="pl-2 font-bold">{product.category}</p>
                </div>

                <SetFlavour cartProduct={cartProduct} details={product.details}
                            handleFlavourSelect={handleFlavourSelect} isProductInCart={isProductInCart}/>
                <div className="max-lg:gap-3 max-xl:flex max-xl:text-center max-xl:items-center max-xl:gap-6 ">
                    <div className="text-3xl max-lg:pt-0 pt-4 font-bold">{formatPrice(product.price)}</div>
                    <div className="max-w-[300px] max-lg:pt-0 pt-6 ">
                        <button
                            label="Dodaj do koszyka"
                            onClick={() => handleAddProductToCart(cartProduct)}
                            disabled={isProductInCart}
                            className={`${isProductInCart ? 'rounded border-[3px] border-gray-600 gap-2 cursor-not-allowed py-3 px-8 w-full flex items-center justify-center text-white bg-gray-600' :
                                'rounded border-[3px] border-green-600 gap-2 cursor-pointer py-3 px-8 w-full flex items-center justify-center text-white bg-green-600'}`}
                        ><div className="flex items-center gap-2">
                            {isProductInCart ?
                                <>
                                    <p>Dodano do koszyka</p><CheckCircleIcon className="flex-shrink-0 font-bold"/>
                                </> :
                                <>
                                    <p>Dodaj do koszyka</p><AddShoppingCartIcon className="flex-shrink-0 font-bold"/>
                                </>
                            }
                        </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails;
