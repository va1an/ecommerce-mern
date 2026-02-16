import { MapPin, ShoppingCart, User } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function ProfileSidebar() {
    const linkClass = ({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded ${isActive ? "bg-primaryButton text-white" : "hover:bg-gray-100"}`
    return (
        <div className="w-64 bg-white rounded-lg shadow p-4 h-fit font-inter">
            <nav className="flex flex-col gap-2">
                <NavLink to={"/profile"} end className={linkClass}><User size={18} /> Profile</NavLink>
                <NavLink to={"/profile/orders"} className={linkClass}><ShoppingCart size={18} /> Orders</NavLink>
                <NavLink to={"/profile/addresses"} className={linkClass}><MapPin size={18} /> Addresses</NavLink>
            </nav>
        </div>
    )
}