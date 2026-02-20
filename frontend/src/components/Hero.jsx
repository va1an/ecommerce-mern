import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className="mx-6 my-8 bg-linear-to-r from-blue-600 to-blue-400 rounded-xl p-10 text-white flex justify-between items-center">
            <div>
                <h2 className="text-4xl font-bold font-inter mb-2">Big Summer <span className="text-yellow-300">Sale</span></h2>
                <p className="mb-4 font-inter">Up to 60% off on all products</p>
                <button onClick={() => navigate('/products')} className="bg-secondaryButton hover:bg-secondaryHover px-6 py-2 rounded-lg font-medium font-inter cursor-pointer">Shop Now</button>
            </div>
            <img src="./hero.png" alt="sale" className="hidden md:block w-300 h-180 object-cover" />
        </section>
    )
}