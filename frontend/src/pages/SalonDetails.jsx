import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSalonById } from "../api/salonApi";
import { getServicesBySalon } from "../api/serviceApi";
import Loading from "../components/Loading";
import ServiceCard from "../components/ServiceCard";
import { getImageUrl } from "../utils/imageUrl";
import "../styles/salon.css";

const SalonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [salon, setSalon] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSalonDetails = async () => {
            try {
                const salonData = await getSalonById(id);
                const serviceData = await getServicesBySalon(id);

                console.log("Salon Details:", salonData);
                console.log("Services:", serviceData);

                setSalon(salonData);
                setServices(serviceData.results || serviceData);
            } catch (err) {
                console.error("Salon details error:", err);
                setError("Failed to load salon details.");
            } finally {
                setLoading(false);
            }
        };

        fetchSalonDetails();
    }, [id]);

    const handleBook = (service) => {
        navigate("/booking", {
            state: {
                salon,
                service,
            },
        });
    };

    if (loading) {
        return <Loading text="Loading salon details..." />;
    }

    if (error) {
        return (
            <div className="salon-page">
                <div className="salon-error">
                    {error}
                </div>
            </div>
        );
    }

    if (!salon) {
        return (
            <div className="salon-page">
                <div className="salon-warning">
                    Salon not found.
                </div>
            </div>
        );
    }

    return (
        <div className="salon-page">

            {/* =========================
                SALON HERO
            ========================= */}

            <section className="salon-hero">

                <div className="salon-hero-image">

                    {salon.image ? (
                        <img
                            src={getImageUrl(salon.image)}
                            alt={salon.name}
                        />
                    ) : (
                        <div className="salon-hero-placeholder">
                            <span>✦</span>
                            <p>No Salon Image</p>
                        </div>
                    )}

                    <div className="salon-hero-overlay" />

                    <div className="salon-hero-content">
                        <span className="salon-tag">
                            ✨ BEAUTY & WELLNESS
                        </span>

                        <h1>{salon.name}</h1>

                        <div className="salon-hero-location">
                            <span>⌖</span>
                            {salon.city}, {salon.state}
                        </div>
                    </div>

                </div>

                {/* Salon information */}

                <div className="salon-info">

                    <div className="salon-introduction">
                        <span className="section-label">
                            ABOUT THE SALON
                        </span>

                        <p>
                            {salon.description}
                        </p>
                    </div>

                    <div className="salon-contact-grid">

                        <div className="salon-contact-item">
                            <div className="contact-icon">
                                ☎
                            </div>

                            <div>
                                <span>Phone</span>
                                <strong>
                                    {salon.phone || "Not available"}
                                </strong>
                            </div>
                        </div>

                        <div className="salon-contact-item">
                            <div className="contact-icon">
                                ✉
                            </div>

                            <div>
                                <span>Email</span>
                                <strong>
                                    {salon.email || "Not available"}
                                </strong>
                            </div>
                        </div>

                        <div className="salon-contact-item">
                            <div className="contact-icon">
                                ⌖
                            </div>

                            <div>
                                <span>Address</span>
                                <strong>
                                    {salon.address || "Not available"}
                                </strong>
                            </div>
                        </div>

                        <div className="salon-contact-item">
                            <div className="contact-icon">
                                #
                            </div>

                            <div>
                                <span>Pincode</span>
                                <strong>
                                    {salon.pincode || "Not available"}
                                </strong>
                            </div>
                        </div>

                    </div>
                </div>

            </section>


            {/* =========================
                SERVICES
            ========================= */}

            <section className="services-section">

                <div className="section-heading">

                    <div>
                        <span className="section-label">
                            WHAT WE OFFER
                        </span>

                        <h2>Our Services</h2>

                        <p>
                            Choose the perfect treatment for your
                            style and beauty needs.
                        </p>
                    </div>

                    <div className="service-count">
                        <strong>{services.length}</strong>
                        <span>Services</span>
                    </div>

                </div>


                {services.length === 0 ? (

                    <div className="empty-services">
                        <div>✂</div>
                        <h3>No services available</h3>
                        <p>
                            This salon hasn't added any services yet.
                        </p>
                    </div>

                ) : (

                    <div className="services-grid">

                        {services.map((service) => (

                            <ServiceCard
                                key={service.id}
                                service={service}
                                onBook={handleBook}
                            />

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
};

export default SalonDetails;