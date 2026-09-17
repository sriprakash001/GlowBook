
import api from "./axios";

// Get appointments
export const getAppointments = async () => {
    const response = await api.get("/appointments/");
    return response.data;
};

// Create appointment
export const createAppointment = async (appointmentData) => {
    const response = await api.post(
        "/appointments/",
        appointmentData
    );

    return response.data;
};

// Get appointment by ID
export const getAppointmentById = async (id) => {
    const response = await api.get(
        `/appointments/${id}/`
    );

    return response.data;
};

// Cancel appointment
export const cancelAppointment = async (id) => {
    const response = await api.post(
        `/appointments/${id}/cancel/`
    );

    return response.data;
};

// Update appointment status
export const updateAppointmentStatus = async (
    id,
    status
) => {
    const response = await api.post(
        `/appointments/${id}/update-status/`,
        {
            status: status,
        }
    );

    return response.data;
};

// Get availability
export const getAvailability = async (
    staffId,
    date
) => {
    const response = await api.get(
        `/availability/?staff=${staffId}&date=${date}`
    );

    return response.data;
};

