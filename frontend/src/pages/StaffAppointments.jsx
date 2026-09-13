import React, { useEffect, useState } from "react";

import {
    getAppointments,
    updateAppointmentStatus,
} from "../api/appointmentApi";


const StaffAppointments = () => {

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [updatingId, setUpdatingId] = useState(null);


    // ========================================
    // Load staff appointments
    // ========================================

    const loadAppointments = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAppointments();

            setAppointments(data);

        } catch (error) {

            console.error(
                "Error loading appointments:",
                error
            );

            setError(
                error.response?.data?.detail ||
                "Unable to load appointments."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadAppointments();

    }, []);


    // ========================================
    // Update appointment status
    // ========================================

    const handleStatusUpdate = async (
        appointmentId,
        newStatus
    ) => {

        try {

            setUpdatingId(appointmentId);

            await updateAppointmentStatus(
                appointmentId,
                newStatus
            );

            // Reload appointments
            await loadAppointments();

        } catch (error) {

            console.error(
                "Error updating status:",
                error
            );

            alert(
                error.response?.data?.detail ||
                "Unable to update appointment status."
            );

        } finally {

            setUpdatingId(null);

        }

    };


    // ========================================
    // Loading
    // ========================================

    if (loading) {

        return (
            <div className="container mt-5">

                <div className="text-center">

                    <div
                        className="spinner-border"
                        role="status"
                    >
                    </div>

                    <p className="mt-2">
                        Loading appointments...
                    </p>

                </div>

            </div>
        );

    }


    // ========================================
    // Error
    // ========================================

    if (error) {

        return (
            <div className="container mt-5">

                <div className="alert alert-danger">

                    {error}

                </div>

                <button
                    className="btn btn-primary"
                    onClick={loadAppointments}
                >
                    Try Again
                </button>

            </div>
        );

    }


    return (

        <div className="container mt-4">

            {/* PAGE TITLE */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2>
                        My Appointments
                    </h2>

                    <p className="text-muted mb-0">
                        Manage appointments assigned to you.
                    </p>

                </div>

                <button
                    className="btn btn-outline-primary"
                    onClick={loadAppointments}
                >
                    Refresh
                </button>

            </div>


            {/* NO APPOINTMENTS */}

            {appointments.length === 0 ? (

                <div className="card shadow-sm">

                    <div className="card-body text-center py-5">

                        <h5>
                            No appointments found
                        </h5>

                        <p className="text-muted">
                            You don't have any assigned appointments yet.
                        </p>

                    </div>

                </div>

            ) : (


                <div className="row g-4">

                    {appointments.map(
                        (appointment) => (

                            <div
                                className="col-12"
                                key={appointment.id}
                            >

                                <div className="card shadow-sm">

                                    <div className="card-body">


                                        {/* HEADER */}

                                        <div className="d-flex justify-content-between align-items-start">

                                            <div>

                                                <h5 className="mb-1">

                                                    {
                                                        appointment.service_name
                                                    }

                                                </h5>

                                                <small className="text-muted">

                                                    Appointment #
                                                    {appointment.id}

                                                </small>

                                            </div>


                                            {/* STATUS */}

                                            <span
                                                className={
                                                    `badge ${
                                                        appointment.status === "pending"
                                                            ? "bg-warning text-dark"
                                                            : appointment.status === "confirmed"
                                                            ? "bg-primary"
                                                            : appointment.status === "completed"
                                                            ? "bg-success"
                                                            : appointment.status === "cancelled"
                                                            ? "bg-danger"
                                                            : "bg-secondary"
                                                    }`
                                                }
                                            >

                                                {
                                                    appointment.status
                                                        .replace(
                                                            "_",
                                                            " "
                                                        )
                                                        .toUpperCase()
                                                }

                                            </span>

                                        </div>


                                        <hr />


                                        {/* DETAILS */}

                                        <div className="row">

                                            {/* CUSTOMER */}

                                            <div className="col-md-4 mb-3">

                                                <strong>
                                                    Customer
                                                </strong>

                                                <div>
                                                    {
                                                        appointment.customer_username
                                                    }
                                                </div>

                                                <small className="text-muted">
                                                    {
                                                        appointment.customer_email
                                                    }
                                                </small>

                                            </div>


                                            {/* SALON */}

                                            <div className="col-md-4 mb-3">

                                                <strong>
                                                    Salon
                                                </strong>

                                                <div>
                                                    {
                                                        appointment.salon_name
                                                    }
                                                </div>

                                            </div>


                                            {/* STAFF */}

                                            <div className="col-md-4 mb-3">

                                                <strong>
                                                    Staff
                                                </strong>

                                                <div>
                                                    {
                                                        appointment.staff_username
                                                    }
                                                </div>

                                            </div>


                                            {/* DATE */}

                                            <div className="col-md-4 mb-3">

                                                <strong>
                                                    Date
                                                </strong>

                                                <div>

                                                    {new Date(
                                                        appointment.appointment_date
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}

                                                </div>

                                            </div>


                                            {/* TIME */}

                                            <div className="col-md-4 mb-3">

                                                <strong>
                                                    Time
                                                </strong>

                                                <div>

                                                    {appointment.start_time.substring(
                                                        0,
                                                        5
                                                    )}

                                                    {" - "}

                                                    {appointment.end_time.substring(
                                                        0,
                                                        5
                                                    )}

                                                </div>

                                            </div>


                                            {/* PRICE */}

                                            <div className="col-md-4 mb-3">

                                                <strong>
                                                    Price
                                                </strong>

                                                <div>
                                                    ₹
                                                    {
                                                        appointment.price
                                                    }
                                                </div>

                                            </div>

                                        </div>


                                        {/* CUSTOMER NOTE */}

                                        {appointment.customer_note && (

                                            <div className="alert alert-light border">

                                                <strong>
                                                    Customer Note:
                                                </strong>

                                                <div>
                                                    {
                                                        appointment.customer_note
                                                    }
                                                </div>

                                            </div>

                                        )}


                                        {/* ACTIONS */}

                                        <div className="mt-3">


                                            {/* PENDING */}

                                            {appointment.status ===
                                                "pending" && (

                                                <>

                                                    <button
                                                        className="btn btn-success me-2"
                                                        disabled={
                                                            updatingId ===
                                                            appointment.id
                                                        }
                                                        onClick={() =>
                                                            handleStatusUpdate(
                                                                appointment.id,
                                                                "confirmed"
                                                            )
                                                        }
                                                    >

                                                        {updatingId ===
                                                        appointment.id
                                                            ? "Updating..."
                                                            : "Confirm"}

                                                    </button>


                                                    <button
                                                        className="btn btn-danger"
                                                        disabled={
                                                            updatingId ===
                                                            appointment.id
                                                        }
                                                        onClick={() =>
                                                            handleStatusUpdate(
                                                                appointment.id,
                                                                "cancelled"
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>

                                                </>

                                            )}


                                            {/* CONFIRMED */}

                                            {appointment.status ===
                                                "confirmed" && (

                                                <>

                                                    <button
                                                        className="btn btn-success me-2"
                                                        disabled={
                                                            updatingId ===
                                                            appointment.id
                                                        }
                                                        onClick={() =>
                                                            handleStatusUpdate(
                                                                appointment.id,
                                                                "completed"
                                                            )
                                                        }
                                                    >
                                                        Complete
                                                    </button>


                                                    <button
                                                        className="btn btn-warning me-2"
                                                        disabled={
                                                            updatingId ===
                                                            appointment.id
                                                        }
                                                        onClick={() =>
                                                            handleStatusUpdate(
                                                                appointment.id,
                                                                "no_show"
                                                            )
                                                        }
                                                    >
                                                        No Show
                                                    </button>


                                                    <button
                                                        className="btn btn-danger"
                                                        disabled={
                                                            updatingId ===
                                                            appointment.id
                                                        }
                                                        onClick={() =>
                                                            handleStatusUpdate(
                                                                appointment.id,
                                                                "cancelled"
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>

                                                </>

                                            )}


                                            {/* COMPLETED */}

                                            {appointment.status ===
                                                "completed" && (

                                                <span className="text-success">
                                                    Appointment completed.
                                                </span>

                                            )}


                                            {/* CANCELLED */}

                                            {appointment.status ===
                                                "cancelled" && (

                                                <span className="text-danger">
                                                    Appointment cancelled.
                                                </span>

                                            )}


                                            {/* NO SHOW */}

                                            {appointment.status ===
                                                "no_show" && (

                                                <span className="text-secondary">
                                                    Customer marked as no-show.
                                                </span>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );

};


export default StaffAppointments;