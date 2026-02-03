import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserProtectedRoutes() {
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to={"/"} replace />
}