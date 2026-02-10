import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCart, removeCartItem } from "../api/cart";
import api from "../api/axios";
import { getAccessToken } from "../utils/token";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const totalItems = cart?.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    async function fetchCart() {
        const token = getAccessToken();

        if (!token) {
            setCart([]);
            return
        }

        try {
            const res = await getCart();
            setCart(res.data.cart.items);
        }
        catch (error) {
            console.log("Failed to fetch cart items")
        }
    }

    async function addToCart(productId, quantity = 1) {
        try {
            const res = await api.post("/cart/add", { productId, quantity });
            setCart(res.data.cart.items);
        }
        catch (error) {
            toast.error("Failed to add to cart");
        }
    }

    async function removeFromCart(productId) {
        try {
            const res = await removeCartItem(productId);
            setCart(res.data.cart.items);
        }
        catch (error) {
            toast.error("Failed to remove from cart");
        }
    }

    function clearCart() {
        setCart([]);
    }

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart, totalItems, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}