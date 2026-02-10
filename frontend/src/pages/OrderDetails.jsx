import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import { getOrderById } from "../api/order";
import Spinner from "../components/Spinner";

export default function OrderDetails() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchOrder() {
        try {
            const res = await getOrderById(id);
            setOrder(res.data.order);
        }
        catch (error) {
            toast.error("Failed to fetch product");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (loading) return <Spinner />
    if (!order) return <p className="font-inter font-bold">Order not found</p>
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="font-inter text-2xl font-bold mb-6">Order Details</h1>
            <div className="bg-white p-6 rounded-lg shadow mb-6 space-y-4">
                <p className="font-inter"><strong>Order ID: </strong>{order._id}</p>
                <p className="font-inter"><strong>Status: </strong>{order.status}</p>
                <p className="font-inter"><strong>Date: </strong>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="space-y-4">
                {order.items.map((item) => (
                    <div key={item.product._id} className="flex gap-4 bg-white p-4 rounded shadow">
                        <img src={item.product.images?.[0]?.url} alt={item.product.name} className="w-20 h-20 rounded object-cover" />
                        <div className="flex-1 font-inter">
                            <h3 className="font-semibold">{item.product.name}</h3>
                            <p>Qty: {item.quantity}</p>
                            <p>₹{item.product.price}</p>
                        </div>
                        <div className="font-bold">
                            ₹{item.product.price * item.quantity}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow mt-6">
                <h2 className="font-inter text-lg font-semibold mb-3">Total: ₹{order.totalPrice}</h2>
            </div>
        </div>
    )
}