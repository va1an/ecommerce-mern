import { LayoutDashboard, Package, ShoppingCart, LogOut, Tag } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../api/auth';

export default function AdminSidebar() {
    const { logout } = useAuth();

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
        <aside className='w-64 bg-gray-900 text-gray-200 flex flex-col'>
            <div className='font-inter px-6 py-4 font-bold text-xl border-b border-gray-800'>Admin Panel</div>

            <nav className='flex flex-col flex-1 space-y-2'>
                <NavLink to={'/admin/dashboard'} className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${isActive ? "bg-gray-600 text-white" : "hover:bg-gray-800 text-gray-200"}`}><LayoutDashboard />Dashboard</NavLink>
                <NavLink to={'/admin/categories'} className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${isActive ? "bg-gray-600 text-white" : "hover:bg-gray-800 text-gray-200"}`}><Tag />Categories</NavLink>
                <NavLink to={'/admin/products'} className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${isActive ? "bg-gray-600 text-white" : "hover:bg-gray-800 text-gray-200"}`}><Package />Products</NavLink>
                <NavLink to={'/admin/orders'} className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${isActive ? "bg-gray-600 text-white" : "hover:bg-gray-800 text-gray-200"}`}><ShoppingCart />Orders</NavLink>
            </nav>

            <div className='px-4 py-4 border-t border-gray-800'>
                <button onClick={handleLogout} className='flex items-center gap-2 text-red-400 hover:text-red-500 cursor-pointer'><LogOut size={18} />Logout</button>
            </div>
        </aside>
    )
}
