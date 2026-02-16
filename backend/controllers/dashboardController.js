import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const getAdminDashboard = async (req, res) => {
    try {
        const revenueData = await Order.aggregate([{ $match: { status: { $ne: "cancelled" } } }, { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" }, totalOrders: { $sum: 1 } } }]);

        const totalRevenue = revenueData[0]?.totalRevenue || 0;
        const totalOrders = revenueData[0]?.totalOrders || 0;
        const totalUsers = await User.countDocuments();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const ordersToday = await Order.countDocuments({ createdAt: { $gt: today } });

        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const revenueByDay = await Order.aggregate([{ $match: { createdAt: { $gt: last7Days }, status: { $ne: "cancelled" } } }, { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" }, day: { $dayOfMonth: "$createdAt" } }, total: { $sum: "$totalPrice" } } }, { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }]);

        const formattedRevenue = revenueByDay.map(item => ({ _id: `${item._id.year}-${item._id.month}-${item._id.day}`, total: item.total }));

        const latestOrders = await Order.find().populate("user", "name email").sort({ createdAt: -1 }).limit(5);

        res.json({ totalRevenue, totalOrders, totalUsers, ordersToday, revenueByDay: formattedRevenue, latestOrders });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}