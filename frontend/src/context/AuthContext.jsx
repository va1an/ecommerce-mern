import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/auth";
import { setAccessToken, clearAccessToken, getAccessToken } from "../utils/token";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);
    }

    const logout = () => {
        setUser(null);
        clearAccessToken();
    }

    async function fetchMe() {
        const token = getAccessToken();

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await getMe();
            setUser(res.data.user);
        }
        catch (error) {
            clearAccessToken();
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);