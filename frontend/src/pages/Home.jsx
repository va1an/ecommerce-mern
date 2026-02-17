import Hero from "../components/Hero";
import HomeCategories from "../components/HomeCategories";
import HomeProducts from "../components/HomeProducts";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/product";
import { getCategories } from "../api/category";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchProducts() {
        try {
            const { data } = await getAllProducts();
            setProducts(data.data);
        }
        catch (error) {
            toast.error("Failed to load products")
        }
        finally {
            setLoading(false);
        }
    }

    async function fetchCategories() {
        try {
            const res = await getCategories();
            setCategories(res.data.categories);
        }
        catch (error) {
            toast.error("Failed to fetch categories");
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [])

    return (
        <div className="bg-gray-100">
            <Hero />
            {/* <HomeCategories categories={categories} /> */}
            <HomeProducts products={products} />
        </div>
    )
}