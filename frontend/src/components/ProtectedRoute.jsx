import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/authApi";

const ProtectedRoute = ({ children, allowedRoles }) => {

    const token = localStorage.getItem("access_token");

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!token) {
            setLoading(false);
            return;
        }

        getCurrentUser()
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Unable to get current user:", error);
                setLoading(false);
            });

    }, [token]);


    // Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }


    // Wait for user information
    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }


    // User couldn't be loaded
    if (!user) {
        return <Navigate to="/login" replace />;
    }


    // Check role
    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        // Customer trying to access owner page
        if (user.role === "customer") {
            return <Navigate to="/salons" replace />;
        }

        // Owner trying to access customer page
        if (user.role === "salon_owner" || user.role === "salon_manager") {
            return <Navigate to="/my-salon" replace />;
        }

        return <Navigate to="/" replace />;
    }


    return children;
};

export default ProtectedRoute;