import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import api from "../../api/axios";
import Spinner from "../../components/Spinner";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchOrders() {
        try {
            const res = await api.get("/order/all-orders");
            setOrders(res.data.orders);
        }
        catch (error) {
            toast.error("Failed to fetch orders");
        }
        finally {
            setLoading(false);
        }
    }

    async function updateStatus(id, status) {
        try {
            await api.put(`/order/update/status/${id}`, { status });
            setOrders(prev => prev.map(order => order._id === id ? { ...order, status } : order));
            toast.success("Order status updated");
        }
        catch (error) {
            toast.error("Failed to update status");
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    function getStatusColor(status) {
        switch (status) {
            case "pending": return "bg-yellow-100 text-yellow-700";
            case "confirmed": return "bg-blue-100 text-blue-700";
            case "packed": return "bg-purple-100 text-purple-700";
            case "shipped": return "bg-indigo-100 text-indigo-700";
            case "delivered": return "bg-green-100 text-green-700";
            case "cancelled": return "bg-red-100 text-red-700";
        }
    }

    if (loading) return <Spinner />

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-inter font-bold">Admin Orders</h1>
            {orders.length === 0 && (
                <p className="font-inter text-gray-500">No orders found</p>
            )}
            {console.log(orders)}

            {orders.map(order => (
                <div key={order._id} className="bg-white shadow rounded-lg p-6 space-y-5">
                    <div className="flex flex-wrap justify-between items-center gap-3">
                        <div>
                            <p className="font-inter font-semibold">Order ID: {order._id}</p>
                            <p className="font-inter text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-sm font-inter ${getStatusColor(order.status)}`}>{order.status}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm font-inter">
                        <div>
                            <p className="font-semibold mb-1">Customer</p>
                            <p>{order.user?.name}</p>
                            <p className="text-gray-500">{order.user?.email}</p>
                        </div>

                        <div>
                            <p className="font-semibold mb-1">Shipping Address</p>
                            <p>{order.shippingAddress?.fullName}</p>
                            <p>{order.shippingAddress?.city},{" "}{order.shippingAddress?.state}</p>
                            <p>{order.shippingAddress?.postalCode}</p>
                        </div>
                    </div>

                    <div className="space-y-3 font-inter">
                        <p className="font-semibold">Items</p>
                        {order.items.map(item => (
                            <div key={item.product?._id} className="flex justify-between border p-3 rounded">
                                <div className="flex gap-3 items-center">
                                    <img src={item.product?.images?.[0]?.url} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="font-medium">{item.product?.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>

                                <div className="font-semibold">
                                    ₹ {item.product?.price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-4 font-inter">
                        <p className="text-lg font-bold">Total: ₹ {order.totalPrice}</p>

                        <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="border p-2 rounded cursor-pointer">
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="packed">Packed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    )
}