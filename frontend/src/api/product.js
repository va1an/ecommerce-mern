import api from "./axios";

export const getAllProducts = (category) => {
    const url = category ? `/product/all-products?category=${category}` : "/product/all-products"
    return api.get(url);
}

export const deleteProduct = (id) => {
    return api.delete(`/product/delete/${id}`)
}

export const getProductById = (id) => {
    return api.get(`product/${id}`);
}

export const updateProduct = (id, data) => {
    return api.put(`/product/update/${id}`, data);
}

export const createProduct = (data) => {
    return api.post("/product/create", data);
}