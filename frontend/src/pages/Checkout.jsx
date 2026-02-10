import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function Checkout() {
    const { cart, fetchCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "COD"
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    async function handlePlaceOrder() {
        try {
            const payload = {
                shippingAddress: {
                    fullName: form.fullName,
                    phone: form.phone,
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    pincode: form.pincode
                },
                paymentMethod: form.paymentMethod
            }

            await api.post("/order/create", payload);
            toast.success("Order placed successfully");
            fetchCart();
            navigate("/order-success");
        }
        catch (error) {
            toast.error("Failed to place order");
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
            <div className="space-y-3">
                <h2 className="font-inter text-2xl font-bold">Shipping Address</h2>

                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="font-inter border border-gray-300 w-full p-2 focus:ring-2 focus:ring-primaryButton outline-none rounded" />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="font-inter border border-gray-300 w-full p-2 focus:ring-2 focus:ring-primaryButton outline-none rounded" />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} className="font-inter border border-gray-300 w-full p-2 focus:ring-2 focus:ring-primaryButton outline-none rounded" />
                <input type="text" name="city" placeholder="City" onChange={handleChange} className="font-inter border border-gray-300 w-full p-2 focus:ring-2 focus:ring-primaryButton outline-none rounded" />
                <input type="text" name="state" placeholder="State" onChange={handleChange} className="font-inter border border-gray-300 w-full p-2 focus:ring-2 focus:ring-primaryButton outline-none rounded" />
                <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} className="font-inter border border-gray-300 w-full p-2 focus:ring-2 focus:ring-primaryButton outline-none rounded" />
                <select name="paymentMethod" onChange={handleChange} className="font-inter border border-gray-300 w-full p-2 focus:ring-2 focus:ring-primaryButton outline-none rounded">
                    <option value="COD">Cash On Delivery</option>
                    <option value="ONLINE">Online Payment</option>
                </select>
            </div>

            <div className="bg-white p-6 shadow rounded h-fit">
                <h2 className="font-inter text-xl font-semibold mb-4">Order Summary</h2>
                {cart.map(item => (
                    <div key={item.product._id} className="flex justify-between mb-2">
                        <span className="font-inter">{item.product.name} x {item.quantity}</span>
                        <span className="font-inter">₹ {item.product.price * item.quantity}</span>
                    </div>
                ))}
                <hr className="my-4" />

                <div className="flex justify-between font-inter font-bold text-lg">
                    <span>Total</span>
                    <span>₹ {totalPrice}</span>
                </div>

                <button onClick={handlePlaceOrder} className="font-inter bg-primaryButton hover:bg-primaryHover w-full py-2 rounded-lg text-white cursor-pointer mt-6">Place Order</button>
            </div>
        </div>
    )
}