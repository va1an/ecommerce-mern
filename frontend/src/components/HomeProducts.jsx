import { useNavigate } from "react-router-dom";

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
                    <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                        <img src={product.image} alt={product.name} className="rounded-lg mb-4" />
                        <h3 className="font-inter font-semibold">{product.name}</h3>
                        <p className="text-lg font-inter font-bold mb-3">{product.price}</p>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer font-inter">Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>
    )
}