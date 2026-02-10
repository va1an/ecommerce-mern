import { useNavigate } from "react-router-dom"

export default function Profile() {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate("/profile/orders")} className="bg-blue-800">Orders</button>
    )
}