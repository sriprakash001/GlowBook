import React, { createContext, useContext, useState } from "react";
import "./Toast.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({
            message,
            type,
        });

        setTimeout(() => {
            setToast(null);
        }, 4000);
    };

    const success = (message) => {
        showToast(message, "success");
    };

    const error = (message) => {
        showToast(message, "error");
    };

    const warning = (message) => {
        showToast(message, "warning");
    };

    const info = (message) => {
        showToast(message, "info");
    };

    return (
        <ToastContext.Provider
            value={{
                success,
                error,
                warning,
                info,
            }}
        >
            {children}

            {toast && (
                <div className={`toast toast-${toast.type}`}>
                    <div className="toast-icon">
                        {toast.type === "success" && "✓"}
                        {toast.type === "error" && "!"}
                        {toast.type === "warning" && "!"}
                        {toast.type === "info" && "i"}
                    </div>

                    <div className="toast-content">
                        <div className="toast-title">
                            {toast.type === "success" && "Success!"}
                            {toast.type === "error" && "Something went wrong!"}
                            {toast.type === "warning" && "Warning!"}
                            {toast.type === "info" && "Information"}
                        </div>

                        <div className="toast-message">
                            {toast.message}
                        </div>
                    </div>

                    <button
                        className="toast-close"
                        onClick={() => setToast(null)}
                    >
                        ×
                    </button>
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};