import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { setAccessToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const { fetchCart } = useCart();

    async function handleSubmit() {
        try {
            const res = await loginUser({ email, password });
            const loggedInUser = res.data.user;
            login(loggedInUser, res.data.accessToken);
            setAccessToken(res.data.accessToken);
            fetchCart();
            if (loggedInUser.role === 'admin') {
                navigate('/admin/dashboard');
            }
            else {
                navigate('/')
            }
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
                    <h2 className="font-inter text-2xl font-bold text-center">Login</h2>
                    <p className="font-inter text-textSecondary mt-2 text-center">Welcome back! Please login to your account</p>
                    <form action={handleSubmit} className="space-y-3 mt-3 mb-5">
                        <Input label={"Email"} placeholder={"Email address"} icon={<Mail size={18} />} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label={"Password"} placeholder={"Password"} icon={<Lock size={18} />} value={password} onChange={(e) => setPassword(e.target.value)} rightIcon={showPassword ? <EyeOff /> : <Eye />} type={showPassword ? "text" : "password"} onRightIconClick={() => setShowPassword((prev) => !prev)} />
                        <Button buttonName={"Login"} />
                    </form>
                    <Link to={"/forgot-password"} className="font-inter text-primaryButton flex justify-end hover:underline">Forgot password?</Link>
                    <p className="font-inter text-textSecondary mt-5 text-center">Don't have an account? <Link to={"/register"} className="text-primaryButton hover:underline">Signup</Link></p>
                </div>
            </div>
        </div>
    );
}
