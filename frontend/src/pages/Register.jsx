import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import "./Register.css";
import { useToast } from "../components/Toast";

const Register = () => {
    const navigate = useNavigate();

    const {success,error: showError} = useToast();
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        role: "customer",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await registerUser(formData);

            success("Registration successful");
            navigate("/login");
        } catch (err) {
            console.error(err);
            

            if (err.response?.data) {
                const data = err.response.data;

                if (typeof data === "object") {
                    const messages = Object.values(data)
                        .flat()
                        .join(" ");

                    setError(messages || "Registration failed.");
                } else {
                    showError("Registration failed");
                }
            } else {
                setError("Unable to connect to the server.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">

                {/* Left Side */}
                <div className="register-brand-section">
                    <div className="register-brand-content">

                        <div className="register-logo">
                            ✨
                        </div>

                        <span className="register-small-title">
                            WELCOME TO GLOWBOOK
                        </span>

                        <h1>
                            Your beauty journey
                            <br />
                            starts here.
                        </h1>

                        <p>
                            Create your GlowBook account and discover
                            amazing salons, talented stylists and
                            effortless beauty appointments.
                        </p>

                        <div className="register-benefits">

                            <div className="benefit-item">
                                <span>✓</span>
                                <div>
                                    <strong>Discover salons</strong>
                                    <small>
                                        Find salons that match your style.
                                    </small>
                                </div>
                            </div>

                            <div className="benefit-item">
                                <span>✓</span>
                                <div>
                                    <strong>Book easily</strong>
                                    <small>
                                        Choose your preferred date and time.
                                    </small>
                                </div>
                            </div>

                            <div className="benefit-item">
                                <span>✓</span>
                                <div>
                                    <strong>Manage bookings</strong>
                                    <small>
                                        Keep all your appointments in one place.
                                    </small>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="register-form-section">
                    <div className="register-form-wrapper">

                        <div className="register-heading">
                            <span>CREATE ACCOUNT</span>

                            <h2>Get started</h2>

                            <p>
                                Fill in your details to create your account.
                            </p>
                        </div>

                        {error && (
                            <div className="register-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Username */}
                            <div className="register-form-group">
                                <label htmlFor="username">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            {/* Email + Phone */}
                            <div className="register-row">

                                <div className="register-form-group">
                                    <label htmlFor="email">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email address"
                                        required
                                    />
                                </div>

                                <div className="register-form-group">
                                    <label htmlFor="phone">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone number"
                                    />
                                </div>

                            </div>

                            {/* Password */}
                            <div className="register-form-group">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    minLength="8"
                                    required
                                />

                                <small className="password-hint">
                                    Use at least 8 characters.
                                </small>
                            </div>

                            {/* Account Type */}
                            <div className="register-form-group">
                                <label htmlFor="role">
                                    Account Type
                                </label>

                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="customer">
                                        Customer
                                    </option>

                                    <option value="salon_owner">
                                        Salon Owner
                                    </option>

                                    <option value="salon_manager">
                                        Salon Manager
                                    </option>
                                </select>
                            </div>

                            {/* Terms */}
                            <div className="terms-check">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                />

                                <label htmlFor="terms">
                                    I agree to the terms and conditions.
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="register-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create Account →"}
                            </button>

                        </form>

                        <div className="register-divider">
                            <span>OR</span>
                        </div>

                        <p className="login-link-text">
                            Already have an account?{" "}
                            <Link to="/login">
                                Sign in
                            </Link>
                        </p>

                        <Link to="/" className="register-back-home">
                            ← Back to GlowBook
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;