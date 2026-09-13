import React, {
    useEffect,
    useState
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    createAppointment
} from "../api/appointmentApi";

import {
    getStaffBySalon
} from "../api/staffApi";

import StaffCard from "../components/StaffCard";

import {
    useToast
} from "../components/Toast";


const Booking = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const {
        success,
        error: showError
    } = useToast();


    const salon = location.state?.salon;
    const service = location.state?.service;


    const [staff, setStaff] = useState([]);

    const [selectedStaff, setSelectedStaff] =
        useState(null);


    const [formData, setFormData] = useState({

        appointment_date: "",
        start_time: "",
        end_time: "",
        customer_note: ""

    });


    const [loadingStaff, setLoadingStaff] =
        useState(true);


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState("");


    useEffect(() => {

        if (!salon) {
            return;
        }


        const fetchStaff = async () => {

            try {

                const data =
                    await getStaffBySalon(
                        salon.id
                    );


                setStaff(
                    data.results || data
                );


            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load stylists."
                );


            } finally {

                setLoadingStaff(false);

            }

        };


        fetchStaff();

    }, [salon]);


    if (!salon || !service) {

        return (

            <div className="alert alert-warning">

                Please select a service
                before booking.

            </div>

        );

    }


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };


    const handleSelectStaff = (staffMember) => {

        setSelectedStaff(
            staffMember
        );

        setError("");

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!selectedStaff) {

            setError(
                "Please select a stylist."
            );

            return;

        }


        setLoading(true);


        try {

            await createAppointment({

                salon: salon.id,

                service: service.id,

                staff: selectedStaff.id,

                appointment_date:
                    formData.appointment_date,

                start_time:
                    formData.start_time,

                end_time:
                    formData.end_time,

                customer_note:
                    formData.customer_note

            });


            // Toast message instead of browser alert
            success(
                "Appointment booked successfully!"
            );


            navigate(
                "/my-bookings"
            );


        } catch (error) {

            console.error(error);


            const errorMessage =
                error.response?.data
                    ? JSON.stringify(
                        error.response.data
                    )
                    : "Booking failed.";


            setError(errorMessage);

            // Toast error message
            showError(errorMessage);

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="row justify-content-center">

            <div className="col-md-9">

                <div className="card shadow-sm">

                    <div className="card-body p-4">

                        <h2 className="mb-3">
                            Book Appointment
                        </h2>


                        <div className="alert alert-light">

                            <strong>
                                Salon:
                            </strong>{" "}

                            {salon.name}

                            <br />

                            <strong>
                                Service:
                            </strong>{" "}

                            {service.name}

                            <br />

                            <strong>
                                Price:
                            </strong>{" "}

                            ₹{service.price}

                            <br />

                            <strong>
                                Duration:
                            </strong>{" "}

                            {service.duration}
                            {" "}minutes

                        </div>


                        {error && (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )}


                        <h4 className="mb-3">

                            Choose Your Stylist

                        </h4>


                        {loadingStaff ? (

                            <p>
                                Loading stylists...
                            </p>

                        ) : staff.length === 0 ? (

                            <div className="alert alert-warning">

                                No stylists are
                                currently available
                                at this salon.

                            </div>

                        ) : (

                            <div className="row g-4 mb-4">

                                {staff.map(
                                    (staffMember) => (

                                        <div
                                            className="col-md-6 col-lg-4"
                                            key={
                                                staffMember.id
                                            }
                                        >

                                            <StaffCard
                                                staff={
                                                    staffMember
                                                }
                                                onSelect={
                                                    handleSelectStaff
                                                }
                                            />

                                        </div>

                                    )
                                )}

                            </div>

                        )}


                        {selectedStaff && (

                            <div className="alert alert-success">

                                <strong>
                                    Selected Stylist:
                                </strong>{" "}

                                {
                                    selectedStaff.username ||
                                    selectedStaff.user?.username ||
                                    "Stylist"
                                }

                            </div>

                        )}


                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="mb-3">

                                <label className="form-label">

                                    Appointment Date

                                </label>


                                <input
                                    type="date"
                                    name="appointment_date"
                                    className="form-control"
                                    value={
                                        formData.appointment_date
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Start Time

                                    </label>


                                    <input
                                        type="time"
                                        name="start_time"
                                        className="form-control"
                                        value={
                                            formData.start_time
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        End Time

                                    </label>


                                    <input
                                        type="time"
                                        name="end_time"
                                        className="form-control"
                                        value={
                                            formData.end_time
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>

                            </div>


                            <div className="mb-3">

                                <label className="form-label">

                                    Note

                                </label>


                                <textarea
                                    name="customer_note"
                                    className="form-control"
                                    rows="3"
                                    value={
                                        formData.customer_note
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={
                                    loading ||
                                    !selectedStaff
                                }
                            >

                                {loading
                                    ? "Booking..."
                                    : "Confirm Booking"}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Booking;