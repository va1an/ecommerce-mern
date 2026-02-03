import express from 'express';
import { upload } from '../middlewares/upload.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/authorize.js';
import { createProduct, deleteProduct, disableProduct, enableProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/all-products', getAllProducts);
router.get('/:id', getProductById);
router.post('/create', protect, adminOnly, upload.array("images", 5), createProduct);
router.put('/update/:id', protect, adminOnly, upload.array("images", 5), updateProduct);
router.put('/disable/:id', protect, adminOnly, disableProduct);
router.put('/enable/:id', protect, adminOnly, enableProduct);
router.delete('/delete/:id', protect, adminOnly, deleteProduct);

export default router;