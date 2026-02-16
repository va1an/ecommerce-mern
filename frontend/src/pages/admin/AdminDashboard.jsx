import { useEffect, useState } from "react";
import { logoutUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import api from "../../api/axios";
import StatCard from "../../components/StatCard";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AdminDashboard() {
    const [data, setData] = useState(null);

    async function fetchDashboard() {
        try {
            const res = await api.get("/admin/dashboard");
            setData(res.data);
        }
        catch (error) {
            toast.error("Failed to fetch data");
        }
    }

    useEffect(() => {
        fetchDashboard();
    }, [])

    if (!data) return <p>Loading....</p>

    return (
        <div className="p-6 space-y-8 font-inter">
            <div className="grid md:grid-cols-4 gap-6">
                <StatCard title={"Total Revenue"} value={`₹ ${data.totalRevenue}`} />
                <StatCard title={"Total Orders"} value={data.totalOrders} />
                <StatCard title={"Total Users"} value={data.totalUsers} />
                <StatCard title={"Orders Today"} value={data.ordersToday} />
            </div>

            <div className="bg-white p-6 shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Revenue (Last 7 Days)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.revenueByDay}>
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#3b82f6" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Latest Orders</h2>
                <table className="w-full">
                    <thead>
                        <tr className="text-left border-b">
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.latestOrders.map(order => (
                            <tr key={order._id} className="border-b">
                                <td>{order._id.slice(-6)}</td>
                                <td>{order.user?.name}</td>
                                <td className="capitalize">{order.status}</td>
                                <td>₹ {order.totalPrice}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}