import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCart, removeCartItem, updateCartItem } from "../api/cart";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    async function fetchCart() {
        try {
            const res = await getCart();
            setCart(res.data);
        }
        catch (error) {
            toast.error("Failed to load cart")
        }
    }

    async function handleQuantity(productId, quantity) {
        if (quantity < 1) return;

        try {
            await updateCartItem(productId, quantity);
            fetchCart();
        }
        catch (error) {
            toast.error("Failed to update cart")
        }
    }

    async function handleRemove(productId) {
        try {
            await removeCartItem(productId);
            toast.success("Item removed");
            fetchCart();
        }
        catch (error) {
            toast.error("Failed to remove cart item")
        }
    }

    useEffect(() => {
        fetchCart();
    }, [])

    if (!cart) {
        return <p>No cart items found</p>
    }

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-3">
            <div className="md:col-span-2 space-y-4">
                {cart.items.map((item) => (
                    <div key={item.product._id} className="flex gap-4 bg-white p-4 rounded shadow">
                        <img src={item.product.images?.[0]?.url} className="w-24 h-24 object-cover rounded" />

                        <div className="flex-1">
                            <h3 className="font-inter font-semibold">{item.product.name}</h3>
                            <p className="text-gray-600">₹{item.product.price}</p>

                            <div className="flex items-center gap-3 mt-2">
                                <button onClick={() => handleQuantity(item.product._id, item.quantity - 1)} className="px-3 border rounded">-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantity(item.product._id, item.quantity + 1)} className="px-3 border rounded">+</button>
                                <button onClick={() => handleRemove(item.product._id)} className="ml-4 font-inter text-red-600">Remove</button>
                            </div>
                        </div>

                        <div className="font-inter font-semibold">₹{item.product.price * item.quantity}</div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded shadow h-fit">
                <h2 className="text-xl font-iter font-semibold mb-4">Summary</h2>

                <div className="flex justify-between mb-3">
                    <span className="font-inter">Total</span>
                    <span className="font-inter font-bold text-lg">₹{cart.totalPrice}</span>
                </div>

                <button onClick={() => navigate("/checkout")} className="w-full bg-primaryButton hover:bg-primaryHover text-white font-inter py-3">Checkout</button>
            </div>
        </div>
    )
}