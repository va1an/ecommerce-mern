import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/authorize.js';
import { getAdminDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getAdminDashboard);

export default router;