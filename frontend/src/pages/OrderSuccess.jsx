import { useNavigate } from "react-router-dom"

export default function OrderSuccess() {
    const navigate = useNavigate();
    return (
        <div className="text-center p-20">
            <h1 className="font-inter font-bold text-3xl text-green-600">Order Placed Successfully</h1>
            <button onClick={() => navigate("/")} className="bg-primaryButton hover:bg-primaryHover mt-20 px-6 py-3 font-inter text-white rounded-lg cursor-pointer">Back to home</button>
        </div>
    )
}