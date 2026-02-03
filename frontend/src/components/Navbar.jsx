import { Search, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logoutUser();
            logout();
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
                <ShoppingCart />
                {user ? <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg cursor-pointer text-white font-inter">Logout</button> : <button onClick={() => navigate('/login')} className="bg-blue-500 rounded-lg cursor-pointer font-inter text-white px-4 py-2">Login</button>}
                {user ? <button onClick={() => navigate('/register')} className="bg-gray-500 px-4 py-2 rounded-lg font-inter text-white cursor-pointer">Profile</button> : <button onClick={() => navigate('/register')} className="bg-blue-500 rounded-lg cursor-pointer font-inter text-white px-4 py-2">Register</button>}
            </div>
        </nav>
    )
}