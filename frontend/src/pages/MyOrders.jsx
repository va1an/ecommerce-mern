import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../api/order";
import Spinner from "../components/Spinner";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function fetchOrders() {
        try {
            const res = await getMyOrders();
            setOrders(res.data.orders);
        }
        catch (error) {
            toast.error("Failed to fetch orders");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <Spinner />

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="font-inter text-2xl mb-6 font-bold">My Orders</h1>

            {orders?.length === 0 ? (
                <p className="font-inter">No orders yet</p>
            ) : (
                <div className="space-y-4">
                    {orders?.map((order) => (
                        <div key={order._id} className="bg-white p-5 rounded-lg shadow flex justify-between items-center">
                            <div>
                                <p className="font-inter font-semibold">Order #{order._id.slice(-6)}</p>
                                <p className="font-inter text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                                <p className="font-inter mt-1 text-sm">Status: <span>{order.status}</span></p>
                            </div>

                            <div className="text-right">
                                <p className="font-inter font-bold text-lg">₹{order.totalPrice}</p>
                                <button onClick={() => navigate(`${order._id}`)} className="mt-2 px-4 py-2 font-inter bg-primaryButton hover:bg-primaryHover cursor-pointer text-white rounded">View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}