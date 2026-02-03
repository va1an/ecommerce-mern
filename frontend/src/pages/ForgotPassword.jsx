import Input from "../components/Input";
import { useState } from "react";
import { Mail } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const { data } = await forgotPassword(email);
            toast.success("Reset link sent to your email!");
            console.log(data.resetLink);
            navigate('/login');
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to send email");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-500 to-gray-400">
            <div className="bg-cardBackground w-full max-w-md md:max-w-lg rounded-lg p-5">
                <h1 className="font-inter font-bold text-2xl text-textPrimary text-center mb-3">Forgot Your Password?</h1>
                <p className="font-inter text-textSecondary text-center mb-3">Enter you email address and we'll send you a link to reset your password.</p>

                <form action={handleSubmit} className="space-y-3">
                    <Input value={email} placeholder={"Email address"} label={"Email"} onChange={(e) => setEmail(e.target.value)} icon={<Mail size={18} />} />
                    <Button buttonName={"Send reset link"} />
                </form>

                <p className="text-center mt-10 font-inter text-textSecondary">Remembered your password? <Link to={"/login"} className="text-blue-900 hover:underline">Login</Link></p>
                <Link to={"/"} className="text-blue-900 hover:underline mt-5 flex justify-center">Back to home</Link>
            </div>
        </div>
    )
}