import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import api from "../api/axios";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
    const navigate = useNavigate();


    return (
        <div onClick={() => navigate(`/product/${product._id}`)} className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
            <img src={product.images?.[0]?.url} alt={product.name} className="w-full h-56 object-cover" />
            <div className="p-4 space-y-2">
                <h3 className="font-inter font-semibold line-clamp-1">{product.name}</h3>
                <p className="font-inter text-gray-500 tex-sm line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center pt-2">
                    <div>
                        <span className="font-inter font-bold text-lg">₹{product.discountPrice || product.price}</span>
                        {product.discountPrice && (
                            <span className="text-sm line-through text-gray-400 ml-2">₹{product.price}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}