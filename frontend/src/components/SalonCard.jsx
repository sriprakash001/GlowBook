// import React from "react";
// import { Link } from "react-router-dom";
// import { getImageUrl } from "../utils/imageUrl";

// const SalonCard = ({ salon }) => {

//     return (
//         <div className="card h-100 shadow-sm">

//             {salon.image ? (
//                 <img
//                     src={getImageUrl(salon.image)}
//                     className="card-img-top"
//                     alt={salon.name}
//                     style={{
//                         height: "220px",
//                         objectFit: "cover",
//                     }}
//                 />
//             ) : (
//                 <div
//                     className="bg-light d-flex justify-content-center align-items-center"
//                     style={{ height: "220px" }}
//                 >
//                     <span className="text-muted">
//                         No Image
//                     </span>
//                 </div>
//             )}

//             <div className="card-body">

//                 <h5 className="card-title">
//                     {salon.name}
//                 </h5>

//                 <p className="card-text text-muted">
//                     {salon.description}
//                 </p>

//                 <p className="mb-2">
//                     <strong>Location:</strong>{" "}
//                     {salon.city}, {salon.state}
//                 </p>

//                 <Link
//                     to={`/salons/${salon.id}`}
//                     className="btn btn-primary"
//                 >
//                     View Salon
//                 </Link>

//             </div>
//         </div>
//     );
// };

// export default SalonCard;
import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";
import "../styles/salon.css";

const SalonCard = ({ salon }) => {
    return (
        <div className="salon-card">
            {/* Salon Image */}
            <div className="salon-card-image">
                {salon.image ? (
                    <img
                        src={getImageUrl(salon.image)}
                        alt={salon.name}
                    />
                ) : (
                    <div className="salon-no-image">
                        <span>✦</span>
                        <p>No Image</p>
                    </div>
                )}

                <div className="salon-image-badge">
                    ✨ Salon
                </div>
            </div>

            {/* Content */}
            <div className="salon-card-body">
                <h3>{salon.name}</h3>

                <p className="salon-description">
                    {salon.description}
                </p>

                <div className="salon-location">
                    <span className="location-icon">⌖</span>
                    <span>
                        {salon.city}, {salon.state}
                    </span>
                </div>

                <Link
                    to={`/salons/${salon.id}`}
                    className="salon-view-btn"
                >
                    View Salon
                    <span>→</span>
                </Link>
            </div>
        </div>
    );
};

export default SalonCard;