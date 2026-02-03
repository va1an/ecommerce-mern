import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/authorize.js';
import { createCategory, deleteCategory, getAllCtegories, toggleCategory, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/all-categories', getAllCtegories);
router.post('/create', protect, adminOnly, createCategory);
router.put('/update/:id', protect, adminOnly, updateCategory);
router.patch('/toggle/:id', protect, adminOnly, toggleCategory);
router.delete('/delete/:id', protect, adminOnly, deleteCategory);

export default router;