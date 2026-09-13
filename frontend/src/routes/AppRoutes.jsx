// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Layout
// import CustomerLayout from "../layouts/CustomerLayout";

// // Components
// import ProtectedRoute from "../components/ProtectedRoute";

// // Pages
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import SalonList from "../pages/SalonList";
// import SalonDetails from "../pages/SalonDetails";
// import Booking from "../pages/Booking";
// import MyBookings from "../pages/MyBookings";
// import Profile from "../pages/Profile";
// import MySalon from "../pages/MySalon";


// const AppRoutes = () => {

//     return (

//         <Routes>

//             {/* Customer Layout */}
//             <Route element={<CustomerLayout />}>

//                 {/* Public Routes */}

//                 <Route
//                     path="/"
//                     element={<Home />}
//                 />

//                 <Route
//                     path="/login"
//                     element={<Login />}
//                 />

//                 <Route
//                     path="/register"
//                     element={<Register />}
//                 />

//                 <Route
//                     path="/salons"
//                     element={<SalonList />}
//                 />

//                 <Route
//                     path="/salons/:id"
//                     element={<SalonDetails />}
//                 />


//                 {/* Protected Routes */}

//                 <Route
//                     path="/booking"
//                     element={
//                         <ProtectedRoute>
//                             <Booking />
//                         </ProtectedRoute>
//                     }
//                 />

//                 <Route
//                     path="/my-bookings"
//                     element={
//                         <ProtectedRoute>
//                             <MyBookings />
//                         </ProtectedRoute>
//                     }
//                 />

//                 <Route
//                     path="/profile"
//                     element={
//                         <ProtectedRoute>
//                             <Profile />
//                         </ProtectedRoute>
//                     }
//                 />


//                 {/* Salon Manager */}
//                 <Route
//                     path="/my-salon"
//                     element={
//                         <ProtectedRoute>
//                             <MySalon />
//                         </ProtectedRoute>
//                     }
//                 />

//             </Route>

//         </Routes>

//     );
// };


// export default AppRoutes;
import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";


// Public pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";


// Customer pages
import SalonList from "../pages/SalonList";
import SalonDetails from "../pages/SalonDetails";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";


// Salon management pages
import MySalon from "../pages/MySalon";

// Common page
import Profile from "../pages/Profile";

// staff page
import StaffAppointments from "../pages/StaffAppointments";

const AppRoutes = () => {
    return (
        <Routes>

            {/* ================================================= */}
            {/* PUBLIC ROUTES */}
            {/* ================================================= */}

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />


            {/* ================================================= */}
            {/* CUSTOMER ROUTES */}
            {/* ================================================= */}

            <Route
                path="/salons"
                element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                        <SalonList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/salons/:id"
                element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                        <SalonDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/booking"
                element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                        <Booking />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/my-bookings"
                element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                        <MyBookings />
                    </ProtectedRoute>
                }
            />


            {/* ================================================= */}
            {/* SALON OWNER + SALON MANAGER ROUTES */}
            {/* ================================================= */}

            <Route
                path="/my-salon"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "salon_owner",
                            "salon_manager"
                        ]}
                    >
                        <MySalon />
                    </ProtectedRoute>
                }
            />

            {/* STAFF ROUTES */}

            <Route
                path="/staff-appointments"
                element={
                    <ProtectedRoute allowedRoles={["staff"]}>
                        <StaffAppointments />
                    </ProtectedRoute>
                }
            />

            {/* ================================================= */}
            {/* PROFILE - ALL LOGGED IN USERS */}
            {/* ================================================= */}

            <Route
                path="/profile"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "customer",
                            "salon_owner",
                            "salon_manager",
                            "staff",
                            "admin"
                        ]}
                    >
                        <Profile />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
};

export default AppRoutes;