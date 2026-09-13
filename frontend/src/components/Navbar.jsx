// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getCurrentUser } from "../api/authApi";

// const Navbar = () => {
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);

//     const token = localStorage.getItem("access_token");

//     useEffect(() => {
//         if (!token) {
//             setUser(null);
//             return;
//         }

//         getCurrentUser()
//             .then((data) => {
//                 console.log("Current user:", data);
//                 setUser(data);
//             })
//             .catch((error) => {
//                 console.error("Error getting current user:", error);
//                 setUser(null);
//             });
//     }, [token]);

//     const handleLogout = () => {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");

//         setUser(null);

//         navigate("/login");
//     };

//     const isCustomer = user?.role === "customer";

//     const isSalonManager =
//         user?.role === "salon_owner" ||
//         user?.role === "salon_manager";

//     const isStaff = user?.role === "staff";

//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//             <div className="container">

//                 {/* LOGO */}
//                 <Link
//                     className="navbar-brand fw-bold"
//                     to="/"
//                 >
//                     GlowBook
//                 </Link>

//                 {/* MOBILE TOGGLE */}
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarContent"
//                     aria-controls="navbarContent"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 {/* NAVBAR CONTENT */}
//                 <div
//                     className="collapse navbar-collapse"
//                     id="navbarContent"
//                 >

//                     {/* LEFT MENU */}
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">

//                         {/* HOME - EVERYONE */}
//                         <li className="nav-item">
//                             <Link
//                                 className="nav-link"
//                                 to="/"
//                             >
//                                 Home
//                             </Link>
//                         </li>


//                         {/* CUSTOMER MENU */}
//                         {isCustomer && (
//                             <>
//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         to="/salons"
//                                     >
//                                         Salons
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         to="/my-bookings"
//                                     >
//                                         My Bookings
//                                     </Link>
//                                 </li>
//                             </>
//                         )}


//                         {/* SALON OWNER + SALON MANAGER MENU */}
//                         {isSalonManager && (
//                             <li className="nav-item">
//                                 <Link
//                                     className="nav-link"
//                                     to="/my-salon"
//                                 >
//                                     My Salon
//                                 </Link>
//                             </li>
//                         )}

//                         {/* STAFF MENU */}
//                         {isStaff && (
//                             <li className="nav-item">
//                                 <Link
//                                     className="nav-link"
//                                     to="/staff-appointments"
//                                 >
//                                     My Appointments
//                                 </Link>
//                             </li>
//                         )}

//                     </ul>

                

//                     {/* RIGHT MENU */}
//                     <ul className="navbar-nav mb-2 mb-lg-0">

//                         {!token ? (
//                             <>
//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         to="/login"
//                                     >
//                                         Login
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         to="/register"
//                                     >
//                                         Register
//                                     </Link>
//                                 </li>
//                             </>
//                         ) : (
//                             <>
//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         to="/profile"
//                                     >
//                                         Profile
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <button
//                                         type="button"
//                                         className="btn btn-link nav-link"
//                                         onClick={handleLogout}
//                                     >
//                                         Logout
//                                     </button>
//                                 </li>
//                             </>
//                         )}

//                     </ul>

//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/authApi";

const Navbar = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            setUser(null);
            return;
        }

        getCurrentUser()
            .then((data) => {
                console.log("Current user:", data);
                setUser(data);
            })
            .catch((error) => {
                console.error(
                    "Error getting current user:",
                    error
                );

                setUser(null);
            });
    }, [token]);


    // ========================================
    // Close mobile menu
    // ========================================

    const closeMenu = () => {
        setMenuOpen(false);
    };


    // ========================================
    // Logout
    // ========================================

    const handleLogout = () => {

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        setUser(null);
        setMenuOpen(false);

        navigate("/login");
    };


    // ========================================
    // Roles
    // ========================================

    const isCustomer =
        user?.role === "customer";

    const isSalonManager =
        user?.role === "salon_owner" ||
        user?.role === "salon_manager";

    const isStaff =
        user?.role === "staff";


    return (
        <nav className="navbar navbar-expand-lg navbar-dark">

            <div className="container">


                {/* =================================
                    LOGO
                ================================= */}

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                    onClick={closeMenu}
                >
                    ✨ GlowBook
                </Link>


                {/* =================================
                    MOBILE TOGGLE
                ================================= */}

                <button
                    type="button"
                    className="navbar-toggler"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >

                    <span className="navbar-toggler-icon"></span>

                </button>


                {/* =================================
                    NAVBAR CONTENT
                ================================= */}

                <div
                    className={`collapse navbar-collapse ${
                        menuOpen ? "show" : ""
                    }`}
                >

                    {/* =================================
                        LEFT MENU
                    ================================= */}

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">


                        {/* HOME */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                                onClick={closeMenu}
                            >
                                Home
                            </Link>

                        </li>


                        {/* =================================
                            CUSTOMER MENU
                        ================================= */}

                        {isCustomer && (
                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/salons"
                                        onClick={closeMenu}
                                    >
                                        💇 Salons
                                    </Link>

                                </li>


                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/my-bookings"
                                        onClick={closeMenu}
                                    >
                                        📅 My Bookings
                                    </Link>

                                </li>

                            </>
                        )}


                        {/* =================================
                            OWNER + MANAGER
                        ================================= */}

                        {isSalonManager && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/my-salon"
                                    onClick={closeMenu}
                                >
                                    🏪 My Salon
                                </Link>

                            </li>

                        )}


                        {/* =================================
                            STAFF
                        ================================= */}

                        {isStaff && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/staff-appointments"
                                    onClick={closeMenu}
                                >
                                    📅 My Appointments
                                </Link>

                            </li>

                        )}

                    </ul>


                    {/* =================================
                        RIGHT MENU
                    ================================= */}

                    <ul className="navbar-nav mb-2 mb-lg-0">


                        {/* =================================
                            NOT LOGGED IN
                        ================================= */}

                        {!token ? (

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/login"
                                        onClick={closeMenu}
                                    >
                                        Login
                                    </Link>

                                </li>


                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/register"
                                        onClick={closeMenu}
                                    >
                                        Register
                                    </Link>

                                </li>

                            </>

                        ) : (

                            /* =================================
                               LOGGED IN
                            ================================= */

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/profile"
                                        onClick={closeMenu}
                                    >
                                        👤 Profile
                                    </Link>

                                </li>


                                <li className="nav-item">

                                    <button
                                        type="button"
                                        className="btn btn-link nav-link"
                                        onClick={
                                            handleLogout
                                        }
                                    >
                                        Logout
                                    </button>

                                </li>

                            </>

                        )}

                    </ul>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;