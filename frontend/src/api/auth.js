import api from "./axios";

export const registerUser = ({ name, email, password }) => {
    return api.post('/auth/register', { name, email, password });
}

export const loginUser = ({ email, password }) => {
    return api.post('/auth/login', { email, password });
}

export const getMe = () => {
    return api.get('/auth/me');
}

export const logoutUser = () => {
    return api.post('/auth/logout');
}

export const forgotPassword = (email) => {
    return api.post('/auth/forgot-password', { email });
}

export const resetPassword = (token, password) => {
    return api.post(`/auth/reset-password/${token}`, { password });
}