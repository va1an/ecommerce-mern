import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function HomeProducts({ products }) {
    const navigate = useNavigate();

    return (
        <section className="mx-6 my-8 mt-10">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-inter font-bold mb-3">Featured Products</h2>
                <p onClick={() => navigate('/products')} className="font-iinter text-xl font-semibold text-blue-600 hover:underline cursor-pointer">View all products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.slice(0, 4).map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}