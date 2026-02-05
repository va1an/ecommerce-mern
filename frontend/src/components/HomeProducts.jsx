import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function HomeProducts() {
    const navigate = useNavigate();

    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99,
            image: "https://placehold.co/300",
        },
        {
            id: 2,
            name: "Nike Running Shoes",
            price: 80,
            image: "https://placehold.co/300",
        },
        {
            id: 3,
            name: "Smartphone X Pro",
            price: 899,
            image: "https://placehold.co/300",
        },
        {
            id: 4,
            name: "Digital Watch",
            price: 150,
            image: "https://placehold.co/300",
        },
    ];

    return (
        <section className="mx-6 my-8 mt-10">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-inter font-bold mb-3">Featured Products</h2>
                <p onClick={() => navigate('/products')} className="font-iinter text-xl font-semibold text-blue-600 hover:underline cursor-pointer">View all products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}