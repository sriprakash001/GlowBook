import React, { useEffect, useState } from "react";
import { getSalons } from "../api/salonApi";
import SalonCard from "../components/SalonCard";
import Loading from "../components/Loading";
import "../styles/salon.css";

const SalonList = () => {

    const [salons, setSalons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchSalons = async () => {

            try {

                const data = await getSalons();

                setSalons(data.results || data);

            } catch (error) {

                setError("Unable to load salons.");

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

        fetchSalons();

    }, []);

    if (loading) {
        return <Loading text="Loading salons..." />;
    }

    return (
        <div>

            <h2 className="mb-4">
                Find Salons
            </h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row g-4">

                {salons.length > 0 ? (

                    salons.map((salon) => (
                        <div
                            className="col-md-6 col-lg-4"
                            key={salon.id}
                        >
                            <SalonCard salon={salon} />
                        </div>
                    ))

                ) : (

                    <div className="text-center">
                        <p className="text-muted">
                            No salons available.
                        </p>
                    </div>

                )}

            </div>

        </div>
    );
};

export default SalonList;