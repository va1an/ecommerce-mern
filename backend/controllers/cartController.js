import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const { userId } = req.user._id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [{ product: productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
        }
        res.status(201).json({ Message: "Added to cart", cart });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

        if (!cart) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return req.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(i => i.product.toString() === productId);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.quantity = quantity;
        await cart.save();

        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user._id });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}