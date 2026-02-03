import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../api/auth";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    async function handleSubmit() {
        try {
            if (password !== confirmPassword) {
                return toast.error("New password and confirm password did not match");
            }

            await resetPassword(token, password);
            toast.success("Password reset successful!");
            navigate("/login");
        }
        catch (error) {
            toast.error("Reset password failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-500 to-gray-400">
            <div className="bg-cardBackground w-full max-w-md md:max-w-lg rounded-lg p-5">
                <h1 className="font-inter font-bold text-2xl text-textPrimary text-center mb-3">Reset Your Password?</h1>
                <p className="font-inter text-textSecondary text-center mb-3">Enter new password below to reset your account password.</p>

                <form action={handleSubmit} className="space-y-3">
                    <Input value={password} placeholder={"New password"} label={"New password"} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} icon={<Lock size={18} />} rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />} onRightIconClick={() => setShowPassword((prev) => !prev)} />
                    <Input value={confirmPassword} placeholder={"Confirm password"} label={"Confirm password"} onChange={(e) => setConfirmPassword(e.target.value)} type={showConfirmPassword ? "text" : "password"} icon={<Lock size={18} />} rightIcon={showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />} onRightIconClick={() => setShowConfirmPassword((prev) => !prev)} />
                    <Button buttonName={"Reset password"} />
                </form>

                <Link to={"/"} className="text-blue-900 hover:underline mt-5 flex justify-center">Back to home</Link>
            </div>
        </div>
    )
}