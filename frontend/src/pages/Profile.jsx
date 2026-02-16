import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";

export default function Profile() {
    return (
        <div className="max-w-7xl mx-auto p-6 flex gap-6">
            <ProfileSidebar />
            <div className="flex-1 bg-white rounded-lg p-6 shadow">
                <Outlet />
            </div>
        </div>
    )
}