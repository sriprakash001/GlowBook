import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const CustomerLayout = () => {
    return (
        <div className="min-vh-100 bg-light">

            {/* Navigation */}
            <Navbar />

            {/* Page Content */}
            <main className="container py-4">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <p className="mb-0">
                    © 2026 GlowBook. All rights reserved.
                </p>
            </footer>

        </div>
    );
};

export default CustomerLayout;