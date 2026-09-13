import api from "./axios";

export const registerUser = async (userData) => {
    const response = await api.post("/auth/register/", userData);
    return response.data;
};

export const loginUser = async (loginData) => {
    const response = await api.post("/auth/login/", loginData);

    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get("/auth/me/");
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};