// import api from "./axios";


// // Get all salons
// export const getSalons = async () => {
//     const response = await api.get("/salons/");
//     return response.data;
// };


// // Get logged-in owner's salon
// export const getMySalon = async () => {
//     const response = await api.get("/salons/my-salon/");
//     return response.data;
// };


// // Create salon
// export const createSalon = async (data) => {
//     const response = await api.post("/salons/", data);
//     return response.data;
// };


// // Get salon by ID
// export const getSalonById = async (id) => {
//     const response = await api.get(`/salons/${id}/`);
//     return response.data;
// };


// // Update salon
// export const updateSalon = async (id, data) => {
//     const response = await api.put(
//         `/salons/${id}/`,
//         data
//     );

//     return response.data;
// };
// ```javascript

// import api from "./axios";

// // Get all salons
// export const getSalons = async () => {
//     const response = await api.get("/salons/");
//     return response.data;
// };

// // Get logged-in owner's salon
// export const getMySalon = async () => {
//     const response = await api.get("/salons/my-salon/");
//     return response.data;
// };

// // Create salon
// export const createSalon = async (data) => {
//     const response = await api.post("/salons/", data);
//     return response.data;
// };

// // Get salon by ID
// export const getSalonById = async (id) => {
//     const response = await api.get(`/salons/${id}/`);
//     return response.data;
// };

// // Update salon
// export const updateSalon = async (id, data) => {
//     const response = await api.put(`/salons/${id}/`, data);
//     return response.data;
// };


import api from "./axios";


// ------------------------------------
// Get all salons
// ------------------------------------

export const getSalons = async () => {

    const response = await api.get(
        "/salons/"
    );

    return response.data;
};


// ------------------------------------
// Get all salons owned by current user
// ------------------------------------

export const getMySalons = async () => {

    const response = await api.get(
        "/salons/my-salons/"
    );

    return response.data;
};


// ------------------------------------
// Create salon
// ------------------------------------

export const createSalon = async (data) => {

    const response = await api.post(
        "/salons/",
        data
    );

    return response.data;
};


// ------------------------------------
// Get salon by ID
// ------------------------------------

export const getSalonById = async (id) => {

    const response = await api.get(
        `/salons/${id}/`
    );

    return response.data;
};


// ------------------------------------
// Update salon
// ------------------------------------

export const updateSalon = async (id, data) => {

    const response = await api.put(
        `/salons/${id}/`,
        data
    );

    return response.data;
};


