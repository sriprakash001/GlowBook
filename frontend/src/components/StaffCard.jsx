import React from "react";
import { getImageUrl } from "../utils/imageUrl";

const StaffCard = ({ staff, onSelect }) => {

    return (
        <div className="card h-100 shadow-sm">

            {staff.image ? (
                <img
                    src={getImageUrl(staff.image)}
                    className="card-img-top"
                    alt={staff.user?.username || "Staff"}
                    style={{
                        height: "220px",
                        objectFit: "cover",
                    }}
                />
            ) : (
                <div
                    className="bg-light d-flex justify-content-center align-items-center"
                    style={{ height: "220px" }}
                >
                    <span className="text-muted">
                        No Image
                    </span>
                </div>
            )}

            <div className="card-body">

                <h5 className="card-title">
                    {staff.username ||
                        staff.user?.username ||
                        "Stylist"}
                </h5>

                <p className="text-primary mb-2">
                    {staff.designation}
                </p>

                <p className="card-text text-muted">
                    {staff.bio}
                </p>

                <p className="mb-3">
                    <strong>
                        Experience:
                    </strong>{" "}
                    {staff.experience_years} years
                </p>

                {onSelect && (
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => onSelect(staff)}
                    >
                        Select Stylist
                    </button>
                )}

            </div>
        </div>
    );
};

export default StaffCard;