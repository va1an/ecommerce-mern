import api from "./axios"

export const getMyOrders = () => {
    return api.get("/order/my-orders");
}

export const getOrderById = (id) => {
    return api.get(`/order/${id}`);
}