import api from "./axios";


// Get all services
export const getServices = async () => {

    const response = await api.get(
        "/services/"
    );

    return response.data;
};


// Get services by salon
export const getServicesBySalon = async (salonId) => {

    const response = await api.get(
        `/services/?salon=${salonId}`
    );

    return response.data;
};


// Create service
export const createService = async (data) => {

    const response = await api.post(
        "/services/",
        data
    );

    return response.data;
};


// Update service
export const updateService = async (id, data) => {

    const response = await api.patch(
        `/services/${id}/`,
        data
    );

    return response.data;
};


// Delete service
export const deleteService = async (id) => {

    const response = await api.delete(
        `/services/${id}/`
    );

    return response.data;
};