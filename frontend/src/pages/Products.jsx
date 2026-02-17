import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { getAllProducts } from "../api/product";
import { getCategories } from "../api/category";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    async function fetchData() {
        try {
            const [productRes, categoryRes] = await Promise.all([
                getAllProducts(selectedCategory),
                getCategories()
            ]);

            setProducts(productRes.data.data);
            setCategories(categoryRes.data.categories);
        }
        catch (error) {
            toast.error("Failed to fetch products");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [selectedCategory]);

    return (
        <div className="px-6 py-6 bg-gray-100">
            <h1 className="font-inter text-3xl font-bold mb-6">Shop Products</h1>

            <div className="flex gap-6">
                <aside className="w-64 bg-white p-4 rounded-lg shadow h-fit">
                    <h2 className="font-inter font-semibold mb-3">Categories</h2>

                    <button onClick={() => setSelectedCategory("")} className={`block w-full text-left px-3 py-2 rounded mb-1 ${selectedCategory === "" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>All</button>

                    {categories.map((cat) => (
                        <button key={cat._id} onClick={() => setSelectedCategory(cat._id)} className={`block w-full text-left px-3 py-2 rounded mb-1 cursor-pointer ${selectedCategory === cat._id ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>{cat.name}</button>
                    ))}
                </aside>

                <main className="flex-1">
                    {loading ? <Spinner /> : products.length === 0 ? <p>No products found...</p> : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}