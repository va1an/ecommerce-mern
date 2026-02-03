import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        for (const item of items) {
            const product = await Product.findById(item.product)

            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: "Product out of stock" });
            }

            product.stock -= item.quantity;
            await product.save();
        }

        const order = await Order.create({ user: req.user._id, items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email").populate("items.product", "name price");

        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        res.json(order);
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
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}