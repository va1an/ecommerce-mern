import { useAuth } from "../context/AuthContext"

export default function ProfileInfo() {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-inter font-bold">My Profile</h1>
            <div className="flex justify-around mt-10">
                <p className="font-inter ">Name:  <span>{user.name}</span></p>
                <p className="font-inter ">Email:  <span>{user.email}</span></p>
            </div>
        </div>
    )
}