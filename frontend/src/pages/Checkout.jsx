import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { getAddresses } from "../api/address";

export default function Checkout() {
    const { cart, fetchCart } = useCart();
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");

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

    async function fetchAddresses() {
        try {
            const res = await getAddresses();
            setAddresses(res.data.addresses);

            const defaultAddress = res.data.addresses.find(a => a.isDefault);

            if (defaultAddress) {
                setSelectedAddress(defaultAddress._id);
            }
        }
        catch (error) {
            toast.error("Failed to fetch address");
        }
    }

    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    async function handlePlaceOrder() {
        try {
            const payload = {
                addressId: selectedAddress,
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

    useEffect(() => {
        fetchAddresses();
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
            <div >
                <h2 className="font-inter text-2xl font-bold mb-2">Shipping Address</h2>

                {addresses.length === 0 ? (
                    <div className="border p-4 rounded text-center">
                        <p className="font-inter mb-3">You don't have any address yet</p>
                        <button className="font-inter bg-primaryButton hover:bg-primaryHover text-white px-4 py-2 cursor-pointer rounded">Add Address</button>
                    </div>
                ) : (
                    addresses.map(addr => (
                        <div key={addr._id} onClick={() => setSelectedAddress(addr._id)} className={`border p-4 rounded cursor-pointer ${selectedAddress === addr._id ? "border-blue-500" : ""}`}>
                            <p className="font-inter font-semibold">{addr.fullName}</p>
                            <p className="font-inter">{addr.addressLine1}, {addr.city}</p>
                            <p className="font-inter">{addr.phone}</p>
                        </div>
                    )))}

                <h3 className="mt-10 mb-2 font-inter font-semibold">Payment Method:</h3>
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