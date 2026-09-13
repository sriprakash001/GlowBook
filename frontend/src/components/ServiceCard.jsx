import React from "react";
import { getImageUrl } from "../utils/imageUrl";
import "../styles/salon.css";

const ServiceCard = ({ service, onBook }) => {
    return (
        <div className="service-card">

            {/* Image */}
            <div className="service-card-image">
                {service.image ? (
                    <img
                        src={getImageUrl(service.image)}
                        alt={service.name}
                    />
                ) : (
                    <div className="service-no-image">
                        <span>✂</span>
                    </div>
                )}

                <div className="service-duration">
                    {service.duration} min
                </div>
            </div>

            {/* Content */}
            <div className="service-card-body">

                <h3>{service.name}</h3>

                <p className="service-description">
                    {service.description}
                </p>

                <div className="service-bottom">

                    <div className="service-price">
                        <small>Starting from</small>
                        <strong>₹{service.price}</strong>
                    </div>

                    <button
                        className="service-book-btn"
                        onClick={() => onBook(service)}
                    >
                        Book Now
                        <span>→</span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ServiceCard;