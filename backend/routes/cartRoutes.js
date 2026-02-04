import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addToCart, getCart, removeFromCart, updateCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove/:productId", protect, removeFromCart);

export default router;