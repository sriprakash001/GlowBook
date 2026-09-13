import api from "./axios";

// Get staff by salon
export const getStaffBySalon = async (salonId) => {
    const response = await api.get(`/staff/?salon=${salonId}`);
    return response.data;
};

// Create staff
export const createStaff = async (staffData) => {
    const response = await api.post("/staff/", staffData);
    return response.data;
};

// Update staff
export const updateStaff = async (staffId, staffData) => {
    const response = await api.patch(
        `/staff/${staffId}/`,
        staffData
    );
    return response.data;
};

// Delete staff
export const deleteStaff = async (staffId) => {
    const response = await api.delete(`/staff/${staffId}/`);
    return response.data;
};

// Working hours
export const getWorkingHours = async (staffId) => {
    const response = await api.get(
        `/working-hours/?staff=${staffId}`
    );
    return response.data;
};

// Staff leaves
export const getStaffLeaves = async (staffId) => {
    const response = await api.get(
        `/staff-leaves/?staff=${staffId}`
    );
    return response.data;
};