import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="home-hero">
                <div className="container">
                    <div className="row align-items-center min-vh-75">

                        {/* Left Content */}
                        <div className="col-lg-6 text-center text-lg-start">
                            <span className="hero-badge">
                                ✨ Beauty made simple
                            </span>

                            <h1 className="hero-title">
                                Your beauty.
                                <br />
                                <span>Your stylist.</span>
                                <br />
                                Your time.
                            </h1>

                            <p className="hero-description">
                                Discover the best salons and talented stylists
                                near you. Book your next beauty appointment
                                quickly and easily with GlowBook.
                            </p>

                            <div className="hero-buttons">
                                <Link to="/salons" className="btn btn-glow">
                                    Explore Salons →
                                </Link>

                                <Link to="/register" className="btn btn-outline-glow">
                                    Get Started
                                </Link>
                            </div>

                            <div className="hero-stats">
                                <div>
                                    <h4>100+</h4>
                                    <p>Salons</p>
                                </div>

                                <div>
                                    <h4>500+</h4>
                                    <p>Stylists</p>
                                </div>

                                <div>
                                    <h4>10K+</h4>
                                    <p>Bookings</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Image / Design */}
                        <div className="col-lg-6 mt-5 mt-lg-0">
                            <div className="hero-image-wrapper">
                                <div className="hero-circle"></div>

                                <div className="hero-card main-card">
                                    <div className="beauty-icon">💇‍♀️</div>
                                    <h3>Find your perfect style</h3>
                                    <p>
                                        Choose a salon, pick your stylist and
                                        book your appointment.
                                    </p>
                                </div>

                                <div className="floating-card floating-card-one">
                                    ⭐ 4.9
                                    <small>Top Rated</small>
                                </div>

                                <div className="floating-card floating-card-two">
                                    📅
                                    <small>Easy Booking</small>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">

                    <div className="section-heading text-center">
                        <span>WHY GLOWBOOK?</span>
                        <h2>Everything you need for your beauty day</h2>
                        <p>
                            A simple way to discover salons, choose services
                            and manage your appointments.
                        </p>
                    </div>

                    <div className="row g-4">

                        {/* Feature 1 */}
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    🔍
                                </div>

                                <h4>Find the Right Salon</h4>

                                <p>
                                    Explore salons and discover the services
                                    that match your beauty needs.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    💇
                                </div>

                                <h4>Choose Your Stylist</h4>

                                <p>
                                    Find experienced stylists and choose the
                                    professional you trust.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    📅
                                </div>

                                <h4>Book with Ease</h4>

                                <p>
                                    Select your preferred date and time and
                                    confirm your appointment in seconds.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-box text-center">
                        <span>READY FOR YOUR NEXT LOOK?</span>

                        <h2>
                            Your perfect beauty appointment
                            is just a click away.
                        </h2>

                        <p>
                            Discover amazing salons and book your appointment
                            with GlowBook today.
                        </p>

                        <Link to="/salons" className="btn btn-light btn-lg">
                            Explore Salons →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;