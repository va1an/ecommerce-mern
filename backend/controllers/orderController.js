import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import Address from "../models/addressModel.js";
import User from "../models/userModel.js";

export const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.body;
        const { shippingAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate("items.product")

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        const totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

        for (const item of cart.items) {
            const product = await Product.findById(item.product)

            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: "Product out of stock" });
            }

            product.stock -= item.quantity;
            await product.save();
        }

        const order = await Order.create({ user: req.user._id, items: cart.items, totalPrice, shippingAddress: { fullName: address.fullName, phone: address.phone, address: address.addressLine1, city: address.city, state: address.state, postalCode: address.pincode, country: address.country }, paymentMethod });
        cart.items = [];
        await cart.save();
        res.status(201).json({ order });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find().populate("user", "name email").populate({ path: "items.product", select: "name images price" }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.json({
            data: orders,
            currentPage: page,
            totalPages: Math.ceil(totalOrders / limit),
            totalItems: totalOrders,
            limit
        });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email").populate("items.product", "name price images");

        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        res.json({ order });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        if (status === "delivered") {
            order.deliveredAt = Date.now();
        }

        await order.save();
        res.status(200).json({ order });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

