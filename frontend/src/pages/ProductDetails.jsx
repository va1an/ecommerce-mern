import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import { getProductById } from "../api/product";
import Spinner from "../components/Spinner";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [qty, setqty] = useState(1);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();

    async function fetchProduct() {
        try {
            const res = await getProductById(id);
            setProduct(res.data.product);
            setSelectedImage(res.data.product.images?.[0]?.url);
        }
        catch (error) {
            toast.error("Failed to fetch product");
        }
        finally {
            setLoading(false);
        }
    }

    async function handleAddToCart() {
        try {
            await addToCart(product._id, qty);
            toast.success("Added to cart")
        }
        catch (error) {
            toast.error("Failed to add to cart")
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) return <Spinner />
    if (!product) return <p>Product not found...</p>
    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
                <img src={selectedImage} alt={product.name} className="w-full h-180 object-cover rounded-lg border" />
                <div className="flex gap-3 mt-4">
                    {product.images.map((img) => (
                        <img key={img.public_id} src={img.url} onClick={() => setSelectedImage(img.url)} className={`w-20 h-20 object-cover rounded cursor-pointer border border-gray-100 ${selectedImage === img.url ? "ring-2 ring-primaryButton" : ""}`} />
                    ))}
                </div>
            </div>

            <div>
                <h1 className="text-3xl font-bold font-inter mb-3">{product.name}</h1>
                <p className="text-gray-600 font-inter mb-4">{product.description}</p>

                <div className="flex items-center gap-4 mb-4">
                    {product.discountPrice ? (
                        <>
                            <span className="font-inter text-2xl font-bold text-green-600">₹{product.discountPrice}</span>
                            <span className="font-inter line-through text-gray-400">₹{product.price}</span>
                        </>
                    ) : (
                        <span className="font-inter text-2xl font-bold">₹{product.price}</span>
                    )}
                </div>

                <p className={`mb-4 font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>

                {product.stock > 0 && (
                    <div className="flex items-center gap-4 mb-6">
                        <button onClick={() => setqty(qty > 1 ? qty - 1 : 1)} className="px-3 py-1 border rounded">-</button>
                        <span>{qty}</span>
                        <button onClick={() => setqty(qty + 1)} className="px-3 py-1 border rounded">+</button>
                    </div>
                )}

                <button disabled={product.stock === 0} onClick={handleAddToCart} className="bg-primaryButton hover:bg-primaryHover text-white font-inter px-6 py-3 rounded-lg disabled:opacity-50 cursor-pointer">Add to Cart</button>

                <div className="mt-6 text-sm text-gray-500">
                    <p>Category: {product.category?.name}</p>
                </div>
            </div>
        </div >
    )
}