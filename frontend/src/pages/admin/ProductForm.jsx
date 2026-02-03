import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"
import { createProduct, getProductById, updateProduct } from "../../api/product";
import { getCategories } from "../../api/category";

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        category: ""
    });
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [categories, setCategories] = useState([]);

    async function fetchProduct() {
        try {
            setLoading(true);
            const res = await getProductById(id);
            const product = res.data;

            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                discountPrice: product.discountPrice || "",
                stock: product.stock,
                category: product.category._id
            });

            setExistingImages(product.images || []);
        }
        catch (error) {
            toast.error("Failed to fetch product");
        }
        finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleImageChange(e) {
        setImages([...e.target.files]);
    }

    function removeExisingImage(public_id) {
        setExistingImages(existingImages.filter(img => img.public_id !== public_id));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => data.append(key, value));
            images.forEach(img => data.append("images", img));

            data.append("existingImages", JSON.stringify(existingImages));

            if (isEdit) {
                await updateProduct(id, data);
                toast.success("Product updated");
            }
            else {
                await createProduct(data);
                toast.success("Product created");
            }

            navigate('/admin/products');
        }
        catch (error) {
            toast.error("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    }

    async function fetchCategories() {
        const res = await getCategories();
        setCategories(res.data.categories.filter(c => c.isActive));
    }

    useEffect(() => {
        fetchCategories();
        if (isEdit) {
            fetchProduct();
        }
    }, [id]);

    return (
        <div className="flex items-center justify-center font-iter">
            <div className="bg-white rounded-lg p-6 max-w-3xl">
                <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit Product" : "Add Product"}</h1>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" name="name" placeholder="Product name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" required ></textarea>

                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
                        <input type="number" name="discountPrice" placeholder="Discount Price" value={formData.discountPrice} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {isEdit && existingImages.length > 0 && (
                        <div>
                            <p className="font-inter font-medium mb-2">Existing Images</p>
                            <div className="flex gap-3">
                                {existingImages.map(img => (
                                    <div key={img.public_id} className="relative">
                                        <img src={img.url} className="w-20 h-20 rounded object-cover" />
                                        <button type="button" onClick={() => removeExisingImage(img.public_id)} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 rounded">x</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <input type="file" multiple onChange={handleImageChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" required />

                    <button type="submit" disabled={loading} className="bg-primaryButton text-white font-inter hover:bg-primaryHover rounded px-4 py-2 cursor-pointer">{loading ? "Saving" : isEdit ? "Update Product" : "Add Product"}</button>
                </form>
            </div>
        </div>
    )
}