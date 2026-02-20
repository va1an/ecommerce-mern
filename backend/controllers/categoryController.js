import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import slugify from 'slugify';

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const exists = await Category.findOne({ name });
        if (exists) {
            return res.status(400).json({ message: "Category name already exists" });
        }

        const category = await Category.create({ name, slug: slugify(name, { lower: true }) });
        res.status(201).json({ message: "Category created", category });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getAllCtegories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.status(200).json({ categories });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name = name;
        category.slug = slugify(name, { lower: true });

        await category.save();

        res.status(200).json({ message: "Category updated", category });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const toggleCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.isActive = !category.isActive;
        await category.save();

        res.status(200).json({ message: `Category ${category.isActive ? "enabled" : "disabled"}` });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const productExists = await Product.exists({ category: id });

        if (productExists) {
            return res.status(400).json({ message: "Category is used by products. Disable it instead." });
        }

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}