import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createAddress, deleteAddress, getAllAddress, setDefaultAddress, updateAddress } from "../controllers/addressController.js";

const router = express.Router();

router.post("/add", protect, createAddress);
router.get("/all-addresses", protect, getAllAddress);
router.put("/update/:id", protect, updateAddress);
router.delete("/delete/:id", protect, deleteAddress);
router.put("/update/default/:id", protect, setDefaultAddress);

export default router;