import { useNavigate } from "react-router-dom"

export default function HomeCategories({ categories }) {
    const navigate = useNavigate();

    return (
        <section className="mx-6 rounded-xl mt-15">
            <h1 className="text-2xl font-inter mb-3 font-bold">Categories</h1>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                {categories.map(cat => (
                    <p key={cat.name} onClick={() => navigate('/products')} className="bg-white mt-2 font-semibold py-10 cursor-pointer hover:text-blue-600 font-inter text-xl rounded-lg shadow">{cat.name}</p>
                ))}
            </div>
        </section>
    )
}