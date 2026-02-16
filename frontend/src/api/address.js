import api from "./axios"

export const getAddresses = () => {
    return api.get("/address/all-addresses");
}

export const createAddress = (data) => {
    return api.post("/address/add", data);
}

export const updateAddress = (id, data) => {
    return api.put(`/address/update/${id}`, data);
}

export const deleteAddress = (id) => {
    return api.delete(`/address/delete/${id}`);
}