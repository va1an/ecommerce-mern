import api from "./axios";

export const getCategories = () => {
    return api.get("/category/all-categories");
}

export const createCategory = (data) => {
    return api.post("/category/create", data);
}

export const updateCategory = (id, data) => {
    return api.put(`/category/update/${id}`, data);
}

export const toggleCategory = (id) => {
    return api.patch(`/category/toggle/${id}`);
}

export const deleteCategory = (id) => {
    return api.delete(`/category/delete/${id}`);
}