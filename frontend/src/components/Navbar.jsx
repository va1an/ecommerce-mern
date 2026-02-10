import { Search, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { totalItems, clearCart } = useCart();

    async function handleLogout() {
        try {
            await logoutUser();
            logout();
            clearCart();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-inter font-bold text-blue-600">ShopEase</h1>

            <div className="flex items-center gap-2 w-1/2">
                <input type="text" placeholder="Search products..." className="w-full px-4 py-2 border border-gray-200 rounded-lg font-inter outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="bg-primaryButton text-white p-2 rounded-lg cursor-pointer"><Search /></button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Link to={"/cart"} className="relative" >
                        <ShoppingCart onClick={() => navigate("/cart")} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
                {user ? <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg cursor-pointer text-white font-inter">Logout</button> : <button onClick={() => navigate('/login')} className="bg-blue-500 rounded-lg cursor-pointer font-inter text-white px-4 py-2">Login</button>}
                {user ? <button onClick={() => navigate('/profile')} className="bg-gray-500 px-4 py-2 rounded-lg font-inter text-white cursor-pointer">Profile</button> : <button onClick={() => navigate('/register')} className="bg-blue-500 rounded-lg cursor-pointer font-inter text-white px-4 py-2">Register</button>}
            </div>
        </nav>
    )
}