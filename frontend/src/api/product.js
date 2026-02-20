import api from "./axios";

export const getAllProducts = (category, pageNumber = 1, search = "") => {
    let url = `/product/all-products?page=${pageNumber}&limit=10`;

    if (category) {
        url += `&category=${category}`;
    }

    if (search) {
        url += `&search=${search}`;
    }
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