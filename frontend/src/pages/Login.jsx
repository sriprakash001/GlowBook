import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
            await loginUser(formData);
            window.location.href = "/profile";
        } catch (err) {
            console.error(err);

            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">

                {/* Left Side */}
                <div className="login-brand-section">
                    <div className="login-brand-content">
                        <div className="login-logo">
                            ✨
                        </div>

                        <h1>Welcome back to GlowBook</h1>

                        <p>
                            Your beauty appointments are just a few clicks
                            away. Sign in and continue your beauty journey.
                        </p>

                        <div className="login-features">
                            <div>
                                <span>✓</span>
                                Discover amazing salons
                            </div>

                            <div>
                                <span>✓</span>
                                Choose your favorite stylist
                            </div>

                            <div>
                                <span>✓</span>
                                Manage your appointments
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="login-form-section">
                    <div className="login-form-wrapper">

                        <div className="login-heading">
                            <span>WELCOME BACK</span>
                            <h2>Sign in</h2>
                            <p>
                                Enter your details to access your account.
                            </p>
                        </div>

                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="login-options">
                                <label className="remember-me">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>

                    
                            </div>

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In →"}
                            </button>
                        </form>

                        <div className="login-divider">
                            <span>OR</span>
                        </div>

                        <p className="register-text">
                            Don't have an account?{" "}
                            <Link to="/register">
                                Create an account
                            </Link>
                        </p>

                        <Link to="/" className="back-home">
                            ← Back to GlowBook
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;