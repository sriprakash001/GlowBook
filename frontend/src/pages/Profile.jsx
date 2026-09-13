import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";
import Loading from "../components/Loading";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getCurrentUser();

                console.log("CURRENT USER:", data);

                setUser(data);
            } catch (error) {
                console.error("Profile error:", error);
                setError("Unable to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <Loading text="Loading profile..." />;
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    if (!user) {
        return (
            <div className="alert alert-warning">
                User information not available.
            </div>
        );
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        {/* Profile Header */}
                        <div className="text-center mb-4">

                            <div
                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    fontSize: "40px",
                                    fontWeight: "600",
                                }}
                            >
                                {user.username
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>

                            <h2 className="mt-3 mb-1">
                                {user.username}
                            </h2>

                            <span className="badge bg-primary">
                                {user.role}
                            </span>

                        </div>

                        <hr />

                        {/* Username */}
                        <div className="mb-3">
                            <small className="text-muted">
                                Username
                            </small>

                            <div className="fw-semibold">
                                {user.username}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <small className="text-muted">
                                Email
                            </small>

                            <div className="fw-semibold">
                                {user.email}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="mb-3">
                            <small className="text-muted">
                                Phone
                            </small>

                            <div className="fw-semibold">
                                {user.phone || "Not provided"}
                            </div>
                        </div>

                        {/* Role */}
                        <div className="mb-3">
                            <small className="text-muted">
                                Account Type
                            </small>

                            <div className="fw-semibold text-capitalize">
                                {user.role?.replace("_", " ")}
                            </div>
                        </div>

                        {/* Email Verification */}
                        <div>
                            <small className="text-muted">
                                Email Verification
                            </small>

                            <div className="mt-1">
                                {user.is_email_verified ? (
                                    <span className="badge bg-success">
                                        Verified
                                    </span>
                                ) : (
                                    <span className="badge bg-warning text-dark">
                                        Not Verified
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Profile;


