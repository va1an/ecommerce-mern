import express from 'express';
import { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from "../middlewares/authorize.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/all-orders", protect, adminOnly, getAllOrders);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/update/status/:id", protect, adminOnly, updateOrderStatus);

export default router;