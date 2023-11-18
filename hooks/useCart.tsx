import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {Props} from "next/script";
import {CartProductType} from "@/app/product/[productId]/ProductDetails";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
}
export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem("eShopCartItems");
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);
        const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);
        setCartProducts(cProducts);
        setPaymentIntent(paymentIntent);
    }, []);
    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const {total, qty} = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity;
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
                    return acc;
                }, {
                    total: 0,
                    qty: 0
                })
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        }
        getTotals();
        console.log(cartProducts)
    }, [cartProducts])

    const handleAddProductToCart = useCallback((productToAdd: CartProductType) => {
        setCartProducts((prevProducts) => {
            const existingProducts = prevProducts || [];

            const isProductAlreadyInCart = existingProducts.some(
                item => item.id === productToAdd.id && item.selectedFlavour.flavour === productToAdd.selectedFlavour.flavour
            );

            if (isProductAlreadyInCart) {
                toast.error('Produkt o tym smaku znajduje się już w koszyku.');
                return existingProducts; // Nie dodawaj produktu, zwróć obecny stan koszyka
            } else {
                const updatedCart = [...existingProducts, productToAdd];
                localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
                return updatedCart;
            }
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((productToRemove: CartProductType) => {
        window.location.reload();
        if (cartProducts) {
            console.log("Usuwanie produktu:", productToRemove);
            const filteredProducts = cartProducts.filter((item) => {
                // Usuń produkt tylko jeśli zgadzają się ID i smak
                return !(item.id === productToRemove.id && item.selectedFlavour.flavour === productToRemove.selectedFlavour.flavour);
            });
            console.log("Po usunięciu:", filteredProducts);

            setCartProducts(filteredProducts);
            toast.success("Produkt został usunięty");
            localStorage.setItem("eShopCartItems", JSON.stringify(filteredProducts));
        }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        if (product.quantity >= product.maxQuantity) {
            return toast.error("Osiągnięto maksymalną ilość tego produktu.");
        }

        setCartProducts((prevProducts) => {
            const updatedCart = prevProducts.map(item => {
                if (item.id === product.id && item.selectedFlavour.flavour === product.selectedFlavour.flavour) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });

            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        if (product.quantity <= 1) {
            return toast.error("Minimalna ilość produktu to 1.");
        }

        setCartProducts((prevProducts) => {
            const updatedCart = prevProducts.map(item => {
                if (item.id === product.id && item.selectedFlavour.flavour === product.selectedFlavour.flavour) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });

            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleClearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem("eShopCartItems", JSON.stringify(null));
    }, [cartProducts]);

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val);
        localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
    }, [paymentIntent]);

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent,
    }

    return <CartContext.Provider value={value} {...props}/>
}
export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart musi być użyty z CartContextProvider");
    }
    return context;
}