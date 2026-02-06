import api from "./axios";

export const getCart = () => {
    return api.get("/cart");
}

export const updateCartItem = (productId, quantity) => {
    return api.put(`/cart/update/${productId}`, { quantity })
}

export const removeCartItem = (productId) => {
    return api.delete(`/cart/remove/${productId}`);
}