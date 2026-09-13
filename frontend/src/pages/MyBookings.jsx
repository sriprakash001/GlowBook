// import React, { useEffect, useState } from "react";

// import {
//     getAppointments,
//     cancelAppointment,
// } from "../api/appointmentApi";

// import Loading from "../components/Loading";


// const MyBookings = () => {

//     const [appointments, setAppointments] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ============================
//     // Get appointments
//     // ============================

//     const fetchAppointments = async () => {

//         try {

//             setLoading(true);

//             setError("");

//             const data = await getAppointments();

//             setAppointments(
//                 data.results || data
//             );

//         } catch (error) {

//             console.error(
//                 "Failed to load appointments:",
//                 error
//             );

//             setError(
//                 "Unable to load appointments."
//             );

//             setAppointments([]);

//         } finally {

//             setLoading(false);

//         }
//     };


//     // ============================
//     // Load when page opens
//     // ============================

//     useEffect(() => {

//         fetchAppointments();

//     }, []);


//     // ============================
//     // Cancel appointment
//     // ============================

//     const handleCancel = async (id) => {

//         const confirmCancel = window.confirm(
//             "Are you sure you want to cancel this appointment?"
//         );

//         if (!confirmCancel) {
//             return;
//         }


//         try {

//             await cancelAppointment(id);

//             await fetchAppointments();

//         } catch (error) {

//             console.error(
//                 "Failed to cancel appointment:",
//                 error
//             );

//             alert(
//                 "Unable to cancel appointment."
//             );

//         }
//     };


//     // ============================
//     // Loading
//     // ============================

//     if (loading) {

//         return (
//             <Loading
//                 text="Loading bookings..."
//             />
//         );

//     }


//     // ============================
//     // Page
//     // ============================

//     return (

//         <div>

//             <h2 className="mb-4">
//                 My Bookings
//             </h2>


//             {/* Error */}

//             {error && (

//                 <div className="alert alert-danger">

//                     {error}

//                 </div>

//             )}


//             {/* Only show empty message
//                 when API succeeded */}

//             {!error && appointments.length === 0 && (

//                 <div className="alert alert-info">

//                     You don't have any appointments yet.

//                 </div>

//             )}


//             {/* Appointments */}

//             {!error && appointments.length > 0 && (

//                 <div className="row g-4">

//                     {appointments.map(
//                         (appointment) => (

//                             <div
//                                 className="col-md-6"
//                                 key={appointment.id}
//                             >

//                                 <div className="card shadow-sm">

//                                     <div className="card-body">

//                                         <h5>
//                                             Appointment #
//                                             {appointment.id}
//                                         </h5>


//                                         <p>

//                                             <strong>
//                                                 Date:
//                                             </strong>{" "}

//                                             {
//                                                 appointment.appointment_date
//                                             }

//                                         </p>


//                                         <p>

//                                             <strong>
//                                                 Time:
//                                             </strong>{" "}

//                                             {
//                                                 appointment.start_time
//                                             }

//                                             {" - "}

//                                             {
//                                                 appointment.end_time
//                                             }

//                                         </p>


//                                         <p>

//                                             <strong>
//                                                 Status:
//                                             </strong>{" "}

//                                             <span className="badge bg-primary">

//                                                 {
//                                                     appointment.status
//                                                 }

//                                             </span>

//                                         </p>


//                                         {appointment.status !==
//                                             "cancelled" && (

//                                             <button
//                                                 className="btn btn-outline-danger"
//                                                 onClick={() =>
//                                                     handleCancel(
//                                                         appointment.id
//                                                     )
//                                                 }
//                                             >

//                                                 Cancel

//                                             </button>

//                                         )}

//                                     </div>

//                                 </div>

//                             </div>

//                         )
//                     )}

//                 </div>

//             )}

//         </div>

//     );

// };


// export default MyBookings;

import React, { useEffect, useState } from "react";

import {
    getAppointments,
    cancelAppointment,
} from "../api/appointmentApi";

import Loading from "../components/Loading";

import "./CustomerBooking.css";

const MyBookings = () => {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ============================
    // Get appointments
    // ============================

    const fetchAppointments = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAppointments();

            setAppointments(
                data.results || data
            );

        } catch (error) {

            console.error(
                "Failed to load appointments:",
                error
            );

            setError(
                "Unable to load appointments."
            );

            setAppointments([]);

        } finally {

            setLoading(false);

        }
    };

    // ============================
    // Load when page opens
    // ============================

    useEffect(() => {

        fetchAppointments();

    }, []);

    // ============================
    // Cancel appointment
    // ============================

    const handleCancel = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmCancel) {
            return;
        }

        try {

            await cancelAppointment(id);

            await fetchAppointments();

        } catch (error) {

            console.error(
                "Failed to cancel appointment:",
                error
            );

            alert(
                "Unable to cancel appointment."
            );

        }
    };

    // ============================
    // Loading
    // ============================

    if (loading) {

        return (
            <Loading
                text="Loading bookings..."
            />
        );

    }

    // ============================
    // Page
    // ============================

    return (

        <div className="customer-bookings-page">

            <div className="bookings-container">

                {/* Page Header */}

                <div className="bookings-header">

                    <div>

                        <div className="bookings-eyebrow">
                            APPOINTMENTS
                        </div>

                        <h1>
                            My Bookings
                        </h1>

                        <p>
                            Manage your salon appointments
                            and booking details.
                        </p>

                    </div>

                    <div className="booking-count">

                        <span>
                            {appointments.length}
                        </span>

                        <small>
                            Total bookings
                        </small>

                    </div>

                </div>

                {/* Error */}

                {error && (

                    <div className="booking-alert booking-alert-error">

                        <span className="alert-icon">
                            !
                        </span>

                        <div>
                            <strong>
                                Something went wrong
                            </strong>

                            <p>
                                {error}
                            </p>
                        </div>

                    </div>

                )}

                {/* Empty */}

                {!error && appointments.length === 0 && (

                    <div className="empty-bookings">

                        <div className="empty-icon">
                            ✨
                        </div>

                        <h3>
                            No bookings yet
                        </h3>

                        <p>
                            You haven't made any appointments.
                            Your bookings will appear here.
                        </p>

                    </div>

                )}

                {/* Appointments */}

                {!error && appointments.length > 0 && (

                    <div className="booking-list">

                        {appointments.map(
                            (appointment) => {

                                const isCancelled =
                                    appointment.status === "cancelled";

                                return (

                                    <div
                                        className={`booking-card ${
                                            isCancelled
                                                ? "booking-cancelled"
                                                : ""
                                        }`}
                                        key={appointment.id}
                                    >

                                        {/* Top */}

                                        <div className="booking-card-top">

                                            <div className="booking-number">

                                                <div className="booking-icon">
                                                    📅
                                                </div>

                                                <div>

                                                    <span>
                                                        APPOINTMENT
                                                    </span>

                                                    <h3>
                                                        #{appointment.id}
                                                    </h3>

                                                </div>

                                            </div>

                                            <span
                                                className={`booking-status status-${String(
                                                    appointment.status
                                                ).toLowerCase()}`}
                                            >
                                                {appointment.status}
                                            </span>

                                        </div>

                                        {/* Details */}

                                        <div className="booking-details">

                                            <div className="booking-detail">

                                                <span className="detail-icon">
                                                    📆
                                                </span>

                                                <div>
                                                    <small>
                                                        DATE
                                                    </small>

                                                    <strong>
                                                        {
                                                            appointment.appointment_date
                                                        }
                                                    </strong>
                                                </div>

                                            </div>

                                            <div className="booking-detail">

                                                <span className="detail-icon">
                                                    🕐
                                                </span>

                                                <div>
                                                    <small>
                                                        TIME
                                                    </small>

                                                    <strong>
                                                        {
                                                            appointment.start_time
                                                        }
                                                        {" - "}
                                                        {
                                                            appointment.end_time
                                                        }
                                                    </strong>
                                                </div>

                                            </div>

                                        </div>

                                        {/* Bottom */}

                                        <div className="booking-card-bottom">

                                            <span className="booking-id">
                                                Booking ID: #
                                                {appointment.id}
                                            </span>

                                            {!isCancelled && (

                                                <button
                                                    className="cancel-booking-btn"
                                                    onClick={() =>
                                                        handleCancel(
                                                            appointment.id
                                                        )
                                                    }
                                                >
                                                    Cancel Appointment
                                                </button>

                                            )}

                                            {isCancelled && (

                                                <span className="cancelled-label">
                                                    Appointment cancelled
                                                </span>

                                            )}

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </div>

    );

};

export default MyBookings;