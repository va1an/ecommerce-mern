import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimPassword, setShowConfirmPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            if (password !== confirmPassword) {
                return toast.error("Password and confirm password did not match");
            }
            const res = await registerUser({ name, email, password });
            login(res.data.user, res.data.accessToken);
            navigate('/')
        }
        catch (error) {
            console.log(error.response?.data);
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="relative hidden md:block">
                <img
                    src="/login-bg.png"
                    alt="E-commerce background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/15" />
            </div>

            <div className="flex items-center justify-center bg-background">
                <div className="w-full max-w-md p-8">
                    <h2 className="font-inter text-2xl font-bold text-center">Register</h2>
                    <p className="font-inter text-textSecondary mt-2 text-center">Create a new account to start shopping</p>
                    <form action={handleSubmit} className="space-y-3 mt-3 mb-5">
                        <Input label={"Name"} placeholder={"Name"} icon={<User size={18} />} value={name} onChange={(e) => setName(e.target.value)} />
                        <Input label={"Email"} placeholder={"Email address"} icon={<Mail size={18} />} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label={"Password"} placeholder={"Password"} icon={<Lock size={18} />} value={password} onChange={(e) => setPassword(e.target.value)} rightIcon={showPassword ? <EyeOff /> : <Eye />} type={showPassword ? "text" : "password"} onRightIconClick={() => setShowPassword((prev) => !prev)} />
                        <Input label={"Confirm Password"} placeholder={"Confirm Password"} icon={<Lock size={18} />} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} rightIcon={showConfrimPassword ? <EyeOff /> : <Eye />} type={showConfrimPassword ? "text" : "password"} onRightIconClick={() => setShowConfirmPassword((prev) => !prev)} />
                        <Button buttonName={"Register"} />
                    </form>
                    <p className="mt-5 font-inter text-textSecondary text-center">Already have an account? <Link to={'/login'} className="text-primaryButton hover:underline">Login</Link></p>
                </div>
            </div>
        </div>
    )
}