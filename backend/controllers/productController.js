import Product from '../models/productModel.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        )
        streamifier.createReadStream(file.buffer).pipe(stream);
    })
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, discountPrice, stock, category } = req.body;

        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let images = [];

        if (req.files?.length) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file);
                images.push({
                    url: result.secure_url,
                    public_id: result.public_id
                })
            }
        }

        const product = await Product.create({ name, description, price, discountPrice, stock, category, images, createdBy: req.user._id });
        res.status(201).json({ message: "Product created successfully", product });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const query = { isActive: true };

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalProducts = await Product.countDocuments();

        if (req.query.category) {
            query.category = req.query.category;
        }

        const products = await Product.find(query).populate("category", "name").sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.status(200).json({
            data: products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalItems: totalProducts,
            limit
        });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category", "name slug");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //upload new image
        if (req.files?.length) {
            //delete old image
            for (const img of product.images) {
                await cloudinary.uploader.destroy(img.public_id);
            }

            product.images = [];

            for (const file of req.files) {
                const result = await uploadToCloudinary(file);
                product.images.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }

        Object.assign(product, req.body);
        await product.save();

        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const disableProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isActive = false;
        product.save();

        res.status(200).json({ message: "Product disabled successfully" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const enableProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isActive = true;
        product.save();

        res.status(200).json({ message: "Product enabled successfully" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        for (const img of product.images) {
            if (img.public_id) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }

        await product.deleteOne();

        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}