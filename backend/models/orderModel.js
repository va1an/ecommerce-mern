import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [orderItemSchema],

        shippingAddress: {
            fullName: String,
            phone: String,
            address: String,
            city: String,
            postalCode: String,
            country: String
        },

        paymentMethod: {
            type: String,
            default: "COD"
        },

        itemsPrice: Number,
        shippingPrice: Number,
        taxPrice: Number,
        totalPrice: Number,

        isPaid: {
            type: Boolean,
            default: false
        },

        paidAt: Date,

        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
            default: "pending"
        },

        deliveredAt: Date
    },
    { timestamps: true }
)

export default mongoose.model("Order", orderSchema);