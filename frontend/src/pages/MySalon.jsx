import React, { useEffect, useState } from "react";

import {
    getMySalons,
    createSalon,
    updateSalon
} from "../api/salonApi";

import {
    getStaffBySalon,
    createStaff,
    deleteStaff
} from "../api/staffApi";

import {
    getServicesBySalon,
    createService,
    deleteService
} from "../api/serviceApi";

import { registerUser } from "../api/authApi";
import { useToast } from "../components/Toast";

const emptySalonForm = {
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    image: null
};


const emptyStaffForm = {
    username: "",
    email: "",
    phone: "",
    password: "",
    designation: "Stylist",
    bio: "",
    experience_years: 0,
    image: null
};


const emptyServiceForm = {
    name: "",
    description: "",
    price: "",
    duration: 30,
    image: null
};


function MySalon() {

    // =====================================================
    // SALON STATES
    // =====================================================
    const { success, error: showError, warning, info} = useToast();


    const [salons, setSalons] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showSalonForm, setShowSalonForm] = useState(false);

    const [editingSalon, setEditingSalon] = useState(null);

    const [salonForm, setSalonForm] = useState({
        ...emptySalonForm
    });

    const [message, setMessage] = useState("");


    // =====================================================
    // STAFF STATES
    // =====================================================

    const [staffBySalon, setStaffBySalon] = useState({});

    const [showStaffForm, setShowStaffForm] = useState(null);

    const [staffForm, setStaffForm] = useState({
        ...emptyStaffForm
    });

    const [staffLoading, setStaffLoading] = useState(false);


    // =====================================================
    // SERVICE STATES
    // =====================================================

    const [servicesBySalon, setServicesBySalon] = useState({});

    const [showServiceForm, setShowServiceForm] = useState(null);

    const [serviceForm, setServiceForm] = useState({
        ...emptyServiceForm
    });

    const [serviceLoading, setServiceLoading] = useState(false);


    // =====================================================
    // LOAD SALONS WHEN PAGE OPENS
    // =====================================================

    useEffect(() => {

        fetchMySalons();

    }, []);


    // =====================================================
    // LOAD MY SALONS
    // =====================================================

    const fetchMySalons = async () => {

        try {

            setLoading(true);

            const data = await getMySalons();

            console.log(
                "MY SALONS API RESPONSE:",
                data
            );


            // Handle both:
            // { results: [...] }
            // and
            // [...]

            const salonList = Array.isArray(data)
                ? data
                : data?.results || [];


            console.log(
                "SALON LIST:",
                salonList
            );


            setSalons(salonList);


            // Load staff and services
            // for every salon

            salonList.forEach((salon) => {

                fetchStaff(salon.id);

                fetchServices(salon.id);

            });


        } catch (error) {

            console.error(
                "ERROR LOADING SALONS:",
                error
            );

            console.error(
                "BACKEND RESPONSE:",
                error.response?.data
            );

            setSalons([]);

            setMessage(
                "Failed to load salons."
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // LOAD STAFF
    // =====================================================

    const fetchStaff = async (salonId) => {

        try {

            const data =
                await getStaffBySalon(salonId);


            const staffList = Array.isArray(data)
                ? data
                : data?.results || [];


            setStaffBySalon((previous) => ({

                ...previous,

                [salonId]: staffList

            }));


        } catch (error) {

            console.error(
                `ERROR LOADING STAFF FOR SALON ${salonId}:`,
                error
            );


            setStaffBySalon((previous) => ({

                ...previous,

                [salonId]: []

            }));

        }
    };


    // =====================================================
    // LOAD SERVICES
    // =====================================================

    const fetchServices = async (salonId) => {

        try {

            const data =
                await getServicesBySalon(salonId);


            const serviceList = Array.isArray(data)
                ? data
                : data?.results || [];


            setServicesBySalon((previous) => ({

                ...previous,

                [salonId]: serviceList

            }));


        } catch (error) {

            console.error(
                `ERROR LOADING SERVICES FOR SALON ${salonId}:`,
                error
            );


            setServicesBySalon((previous) => ({

                ...previous,

                [salonId]: []

            }));

        }
    };


    // =====================================================
    // SALON FORM CHANGE
    // =====================================================

    const handleSalonChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setSalonForm((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // =====================================================
    // ADD NEW SALON
    // =====================================================

    const handleAddSalon = () => {

        setEditingSalon(null);

        setSalonForm({
            ...emptySalonForm
        });

        setMessage("");

        setShowSalonForm(true);

    };


    // =====================================================
    // EDIT SALON
    // =====================================================

    const handleEditSalon = (salon) => {

        setEditingSalon(salon);


        setSalonForm({

            name: salon.name || "",

            description:
                salon.description || "",

            phone:
                salon.phone || "",

            email:
                salon.email || "",

            address:
                salon.address || "",

            city:
                salon.city || "",

            state:
                salon.state || "",

            pincode:
                salon.pincode || "",

            // Important:
            // don't replace existing image
            // unless a new image is selected

            image: null

        });


        setMessage("");

        setShowSalonForm(true);

    };


    // =====================================================
    // CREATE / UPDATE SALON
    // =====================================================

    const handleSalonSubmit = async (event) => {

        event.preventDefault();

        setMessage("");


        try {

            // ---------------------------------------------
            // Create FormData
            // ---------------------------------------------

            const formData = new FormData();


            formData.append(
                "name",
                salonForm.name
            );

            formData.append(
                "description",
                salonForm.description
            );

            formData.append(
                "phone",
                salonForm.phone
            );

            formData.append(
                "email",
                salonForm.email
            );

            formData.append(
                "address",
                salonForm.address
            );

            formData.append(
                "city",
                salonForm.city
            );

            formData.append(
                "state",
                salonForm.state
            );

            formData.append(
                "pincode",
                salonForm.pincode
            );


            // ---------------------------------------------
            // Add image only if selected
            // ---------------------------------------------

            if (salonForm.image) {

                formData.append(
                    "image",
                    salonForm.image
                );

            }


            // ---------------------------------------------
            // UPDATE
            // ---------------------------------------------

            if (editingSalon) {

                const updatedSalon =
                    await updateSalon(
                        editingSalon.id,
                        formData
                    );


                console.log(
                    "UPDATED SALON:",
                    updatedSalon
                );


                success(
                    "Salon updated successfully."
                );

            }


            // ---------------------------------------------
            // CREATE
            // ---------------------------------------------

            else {

                const newSalon =
                    await createSalon(formData);


                console.log(
                    "NEWLY CREATED SALON:",
                    newSalon
                );


                success(
                    "Salon created successfully."
                );

            }


            // ---------------------------------------------
            // Reset form
            // ---------------------------------------------

            setSalonForm({
                ...emptySalonForm
            });

            setEditingSalon(null);

            setShowSalonForm(false);


            // ---------------------------------------------
            // IMPORTANT:
            // Wait for the updated salon list
            // ---------------------------------------------

            await fetchMySalons();


        } catch (error) {

            console.error(
                "SALON SAVE ERROR:",
                error
            );

            console.error(
                "BACKEND RESPONSE:",
                error.response?.data
            );


            if (error.response?.data) {

                showError(
                    JSON.stringify(
                        error.response.data
                    )
                );

            } else {

                showError(
                    "Failed to save salon."
                );

            }

        }

    };


    // =====================================================
    // CANCEL SALON FORM
    // =====================================================

    const handleCancelSalon = () => {

        setShowSalonForm(false);

        setEditingSalon(null);

        setSalonForm({
            ...emptySalonForm
        });

        setMessage("");

    };


    // =====================================================
    // STAFF FORM CHANGE
    // =====================================================

    const handleStaffChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setStaffForm((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // =====================================================
    // SHOW STAFF FORM
    // =====================================================

    const handleShowStaffForm = (salonId) => {

        setShowStaffForm(salonId);

        setStaffForm({
            ...emptyStaffForm
        });

        setMessage("");

    };


    // =====================================================
    // CANCEL STAFF
    // =====================================================

    const handleCancelStaff = () => {

        setShowStaffForm(null);

        setStaffForm({
            ...emptyStaffForm
        });

    };


    // =====================================================
    // CREATE STAFF
    // =====================================================

    const handleCreateStaff = async (
        event,
        salon
    ) => {

        event.preventDefault();

        setStaffLoading(true);

        setMessage("");


        try {

            // ---------------------------------------------
            // STEP 1: CREATE USER
            // ---------------------------------------------

            const userData = {

                username:
                    staffForm.username,

                email:
                    staffForm.email,

                phone:
                    staffForm.phone,

                password:
                    staffForm.password,

                role: "staff"

            };


            console.log(
                "CREATING STAFF USER:",
                userData
            );


            const user =
                await registerUser(userData);


            console.log(
                "CREATED USER:",
                user
            );


            // ---------------------------------------------
            // STEP 2: CREATE STAFF PROFILE
            // ---------------------------------------------

            const staffData =
                new FormData();


            staffData.append(
                "user",
                user.id
            );

            staffData.append(
                "salon",
                salon.id
            );

            staffData.append(
                "designation",
                staffForm.designation
            );

            staffData.append(
                "bio",
                staffForm.bio
            );

            staffData.append(
                "experience_years",
                Number(
                    staffForm.experience_years
                )
            );

            staffData.append(
                "is_active",
                true
            );


            if (staffForm.image) {

                staffData.append(
                    "image",
                    staffForm.image
                );

            }


            await createStaff(
                staffData
            );


            // ---------------------------------------------
            // SUCCESS
            // ---------------------------------------------

            setMessage(
                `${staffForm.username} added successfully!`
            );


            setStaffForm({
                ...emptyStaffForm
            });

            setShowStaffForm(null);


            await fetchStaff(
                salon.id
            );


        } catch (error) {

            console.error(
                "ADD STAFF ERROR:",
                error
            );

            console.error(
                "BACKEND RESPONSE:",
                error.response?.data
            );


            showError(
                error.response?.data
                    ? JSON.stringify(
                        error.response.data
                    )
                    : "Failed to add staff."
            );


        } finally {

            setStaffLoading(false);

        }

    };


    // =====================================================
    // DELETE STAFF
    // =====================================================

    const handleDeleteStaff = async (
        staffId,
        salonId
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this staff?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            await deleteStaff(
                staffId
            );


            showError(
                "Staff deleted successfully."
            );


            await fetchStaff(
                salonId
            );


        } catch (error) {

            console.error(
                "DELETE STAFF ERROR:",
                error
            );


            showError(
                "Failed to delete staff."
            );

        }

    };


    // =====================================================
    // SERVICE FORM CHANGE
    // =====================================================

    const handleServiceChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setServiceForm((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // =====================================================
    // SHOW SERVICE FORM
    // =====================================================

    const handleShowServiceForm = (
        salonId
    ) => {

        setShowServiceForm(salonId);

        setServiceForm({
            ...emptyServiceForm
        });

        setMessage("");

    };


    // =====================================================
    // CANCEL SERVICE
    // =====================================================

    const handleCancelService = () => {

        setShowServiceForm(null);

        setServiceForm({
            ...emptyServiceForm
        });

    };


    // =====================================================
    // CREATE SERVICE
    // =====================================================

    const handleCreateService = async (
        event,
        salon
    ) => {

        event.preventDefault();

        setServiceLoading(true);

        setMessage("");


        try {

            const serviceData =
                new FormData();


            serviceData.append(
                "salon",
                salon.id
            );

            serviceData.append(
                "name",
                serviceForm.name
            );

            serviceData.append(
                "description",
                serviceForm.description
            );

            serviceData.append(
                "price",
                Number(
                    serviceForm.price
                )
            );

            serviceData.append(
                "duration",
                Number(
                    serviceForm.duration
                )
            );

            serviceData.append(
                "is_active",
                true
            );


            if (serviceForm.image) {

                serviceData.append(
                    "image",
                    serviceForm.image
                );

            }


            console.log(
                "CREATING SERVICE"
            );


            await createService(
                serviceData
            );


            success(
                `${serviceForm.name} added successfully!`
            );


            setServiceForm({
                ...emptyServiceForm
            });

            setShowServiceForm(null);


            await fetchServices(
                salon.id
            );


        } catch (error) {

            console.error(
                "ADD SERVICE ERROR:",
                error
            );

            console.error(
                "BACKEND RESPONSE:",
                error.response?.data
            );


            showError(
                error.response?.data
                    ? JSON.stringify(
                        error.response.data
                    )
                    : "Failed to add service."
            );


        } finally {

            setServiceLoading(false);

        }

    };


    // =====================================================
    // DELETE SERVICE
    // =====================================================

    const handleDeleteService = async (
        serviceId,
        salonId
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this service?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            await deleteService(
                serviceId
            );


            showError(
                "Service deleted successfully."
            );


            await fetchServices(
                salonId
            );


        } catch (error) {

            console.error(
                "DELETE SERVICE ERROR:",
                error
            );

            showError(
                "Failed to delete service."
            );

        }

    };


    // =====================================================
    // PROFESSIONAL DASHBOARD UI
    // =====================================================

    const imageUrl = (image) => {
        if (!image) return "";
        return image.startsWith("http") ? image : `https://glowbook-backend.onrender.com${image}`;
    };

    if (loading) {
        return (
            <div className="salon-page">
                <style>{salonStyles}</style>
                <div className="salon-loading">
                    <div className="loading-spinner" />
                    <h3>Loading your salons...</h3>
                    <p>Please wait while we prepare your dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="salon-page">
            <style>{salonStyles}</style>

            <div className="salon-shell">
                <header className="page-header">
                    <div>
                        <div className="eyebrow">SALON MANAGEMENT</div>
                        <h1>My Salons</h1>
                        <p>Manage your salon, team and services from one place.</p>
                    </div>
                    <button className="primary-btn" onClick={handleAddSalon}>
                        <span>＋</span> Add New Salon
                    </button>
                </header>

                {message && (
                    <div className="dashboard-message">
                        <span>✓</span>{message}
                    </div>
                )}

                {showSalonForm && (
                    <div className="modal-backdrop">
                        <div className="modal-card salon-form-modal">
                            <div className="modal-header">
                                <div>
                                    <div className="eyebrow">SALON DETAILS</div>
                                    <h2>{editingSalon ? "Edit Salon" : "Add New Salon"}</h2>
                                </div>
                                <button className="icon-btn" onClick={handleCancelSalon} aria-label="Close">×</button>
                            </div>

                            <form onSubmit={handleSalonSubmit}>
                                <div className="form-grid">
                                    {[
                                        ["name", "Salon Name", "text", true],
                                        ["phone", "Phone", "text", false],
                                        ["email", "Email", "email", false],
                                        ["address", "Address", "text", false],
                                        ["city", "City", "text", false],
                                        ["state", "State", "text", false],
                                        ["pincode", "Pincode", "text", false],
                                    ].map(([name, label, type, required]) => (
                                        <div className={name === "address" ? "field full" : "field"} key={name}>
                                            <label>{label}</label>
                                            <input
                                                type={type}
                                                name={name}
                                                value={salonForm[name]}
                                                onChange={handleSalonChange}
                                                required={required}
                                                placeholder={`Enter ${label.toLowerCase()}`}
                                            />
                                        </div>
                                    ))}

                                    <div className="field full">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            rows="3"
                                            value={salonForm.description}
                                            onChange={handleSalonChange}
                                            placeholder="Tell customers what makes your salon special..."
                                        />
                                    </div>

                                    <div className="field full">
                                        <label>Salon Image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={(event) => setSalonForm((previous) => ({ ...previous, image: event.target.files?.[0] || null }))}
                                        />
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button type="button" className="secondary-btn" onClick={handleCancelSalon}>Cancel</button>
                                    <button type="submit" className="primary-btn">
                                        {editingSalon ? "Save Changes" : "Create Salon"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {salons.length === 0 ? (
                    <div className="empty-dashboard">
                        <div className="empty-icon">✦</div>
                        <h2>No salons yet</h2>
                        <p>Create your first salon to start managing your staff and services.</p>
                        <button className="primary-btn" onClick={handleAddSalon}>Create Your Salon</button>
                    </div>
                ) : (
                    <div className="salon-list">
                        {salons.map((salon) => {
                            const staff = staffBySalon[salon.id] || [];
                            const services = servicesBySalon[salon.id] || [];

                            return (
                                <section className="salon-card" key={salon.id}>
                                    <div className="salon-hero">
                                        <div className="salon-cover">
                                            {salon.image ? (
                                                <img src={imageUrl(salon.image)} alt={salon.name} />
                                            ) : (
                                                <div className="cover-placeholder"><span>✦</span></div>
                                            )}
                                            <div className="cover-gradient" />
                                            <div className="salon-hero-content">
                                                <div className="status-pill"><span /> Active</div>
                                                <h2>{salon.name}</h2>
                                                <p>{salon.description || "Your salon profile and management workspace"}</p>
                                            </div>
                                        </div>

                                        <div className="salon-info-panel">
                                            <div className="info-item">
                                                <span className="info-icon">⌖</span>
                                                <div><small>Location</small><strong>{[salon.city, salon.state].filter(Boolean).join(", ") || "Not available"}</strong></div>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-icon">☎</span>
                                                <div><small>Phone</small><strong>{salon.phone || "Not available"}</strong></div>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-icon">✉</span>
                                                <div><small>Email</small><strong>{salon.email || "Not available"}</strong></div>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-icon">⌂</span>
                                                <div><small>Address</small><strong>{salon.address || "Not available"}{salon.pincode ? ` · ${salon.pincode}` : ""}</strong></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="salon-toolbar">
                                        <div className="stats-row">
                                            <div className="stat"><strong>{staff.length}</strong><span>Team members</span></div>
                                            <div className="stat"><strong>{services.length}</strong><span>Services</span></div>
                                            <div className="stat"><strong>{services.length ? `₹${services.reduce((sum, item) => sum + Number(item.price || 0), 0).toLocaleString("en-IN")}` : "₹0"}</strong><span>Service value</span></div>
                                        </div>
                                        <button className="secondary-btn" onClick={() => handleEditSalon(salon)}>Edit Salon</button>
                                    </div>

                                    <div className="management-section">
                                        <div className="section-heading">
                                            <div className="section-title-wrap">
                                                <div className="section-icon">♙</div>
                                                <div><h3>Staff</h3><p>Your salon team</p></div>
                                            </div>
                                            <button className="outline-btn" onClick={() => handleShowStaffForm(salon.id)}>＋ Add Staff</button>
                                        </div>

                                        {showStaffForm === salon.id && (
                                            <div className="inline-form">
                                                <div className="inline-form-title"><h4>Add Staff Member</h4><button className="icon-btn small" onClick={handleCancelStaff}>×</button></div>
                                                <form onSubmit={(event) => handleCreateStaff(event, salon)}>
                                                    <div className="form-grid compact">
                                                        {[
                                                            ["username", "Username", "text", true],
                                                            ["email", "Email", "email", true],
                                                            ["phone", "Phone", "text", false],
                                                            ["password", "Password", "password", true],
                                                            ["designation", "Designation", "text", false],
                                                            ["experience_years", "Experience (years)", "number", false],
                                                        ].map(([name, label, type, required]) => (
                                                            <div className="field" key={name}>
                                                                <label>{label}</label>
                                                                <input type={type} name={name} value={staffForm[name]} onChange={handleStaffChange} required={required} min={type === "number" ? "0" : undefined} />
                                                            </div>
                                                        ))}
                                                        <div className="field full"><label>Bio</label><textarea name="bio" rows="2" value={staffForm.bio} onChange={handleStaffChange} placeholder="Short professional bio" /></div>
                                                        <div className="field full"><label>Staff Image</label><input type="file" accept="image/*" onChange={(event) => setStaffForm((previous) => ({ ...previous, image: event.target.files?.[0] || null }))} /></div>
                                                    </div>
                                                    <div className="form-actions"><button type="button" className="secondary-btn" onClick={handleCancelStaff}>Cancel</button><button type="submit" className="primary-btn" disabled={staffLoading}>{staffLoading ? "Adding..." : "Add Staff Member"}</button></div>
                                                </form>
                                            </div>
                                        )}

                                        {staff.length === 0 ? (
                                            <div className="section-empty"><div>♙</div><span>No team members yet</span><small>Add stylists, barbers or beauticians to your salon.</small></div>
                                        ) : (
                                            <div className="staff-grid">
                                                {staff.map((member) => (
                                                    <article className="staff-card" key={member.id}>
                                                        <div className="staff-top">
                                                            <div className="avatar">
                                                                {member.image ? <img src={imageUrl(member.image)} alt="" /> : (member.username?.charAt(0) || "S").toUpperCase()}
                                                            </div>
                                                            <button className="delete-icon" onClick={() => handleDeleteStaff(member.id, salon.id)} title="Delete staff">⌫</button>
                                                        </div>
                                                        <h4>{member.username}</h4>
                                                        <span className="role-badge">{member.designation || "Staff"}</span>
                                                        {member.bio && <p>{member.bio}</p>}
                                                        <div className="experience">✦ {member.experience_years || 0} years experience</div>
                                                    </article>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="management-section services-section">
                                        <div className="section-heading">
                                            <div className="section-title-wrap">
                                                <div className="section-icon service">✦</div>
                                                <div><h3>Services</h3><p>What your salon offers</p></div>
                                            </div>
                                            <button className="outline-btn" onClick={() => handleShowServiceForm(salon.id)}>＋ Add Service</button>
                                        </div>

                                        {showServiceForm === salon.id && (
                                            <div className="inline-form">
                                                <div className="inline-form-title"><h4>Add Service</h4><button className="icon-btn small" onClick={handleCancelService}>×</button></div>
                                                <form onSubmit={(event) => handleCreateService(event, salon)}>
                                                    <div className="form-grid compact">
                                                        <div className="field"><label>Service Name</label><input type="text" name="name" value={serviceForm.name} onChange={handleServiceChange} placeholder="Hair Cut" required /></div>
                                                        <div className="field"><label>Price (₹)</label><input type="number" name="price" min="0" value={serviceForm.price} onChange={handleServiceChange} placeholder="500" required /></div>
                                                        <div className="field"><label>Duration (minutes)</label><input type="number" name="duration" min="1" value={serviceForm.duration} onChange={handleServiceChange} required /></div>
                                                        <div className="field full"><label>Description</label><textarea name="description" rows="2" value={serviceForm.description} onChange={handleServiceChange} placeholder="Describe this service..." /></div>
                                                        <div className="field full"><label>Service Image</label><input type="file" accept="image/*" onChange={(event) => setServiceForm((previous) => ({ ...previous, image: event.target.files?.[0] || null }))} /></div>
                                                    </div>
                                                    <div className="form-actions"><button type="button" className="secondary-btn" onClick={handleCancelService}>Cancel</button><button type="submit" className="primary-btn" disabled={serviceLoading}>{serviceLoading ? "Adding..." : "Add Service"}</button></div>
                                                </form>
                                            </div>
                                        )}

                                        {services.length === 0 ? (
                                            <div className="section-empty"><div>✦</div><span>No services yet</span><small>Add your first service with pricing and duration.</small></div>
                                        ) : (
                                            <div className="services-grid">
                                                {services.map((service) => (
                                                    <article className="service-card" key={service.id}>
                                                        {service.image ? <img className="service-image" src={imageUrl(service.image)} alt={service.name} /> : <div className="service-image-placeholder">✦</div>}
                                                        <div className="service-content">
                                                            <div className="service-title-row">
                                                                <h4>{service.name}</h4>
                                                                <button className="delete-icon" onClick={() => handleDeleteService(service.id, salon.id)} title="Delete service">⌫</button>
                                                            </div>
                                                            <p>{service.description || "Professional salon service"}</p>
                                                            <div className="service-bottom">
                                                                <strong>₹{Number(service.price || 0).toLocaleString("en-IN")}</strong>
                                                                <span>◷ {service.duration} min</span>
                                                            </div>
                                                        </div>
                                                    </article>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

const salonStyles = `
    .salon-page { min-height:100vh; background:linear-gradient(135deg,#f7f4ff 0%,#fff8fb 52%,#f6fbfa 100%); color:#201b38; padding:42px 24px 70px; }
    .salon-shell { max-width:1320px; margin:0 auto; }
    .page-header { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; margin-bottom:28px; }
    .eyebrow { color:#7d3fc1; font-size:11px; font-weight:800; letter-spacing:.16em; margin-bottom:7px; }
    .page-header h1 { margin:0; font-size:38px; line-height:1.05; letter-spacing:-.03em; }
    .page-header p { margin:10px 0 0; color:#756d82; font-size:15px; }
    .primary-btn,.secondary-btn,.outline-btn { border:0; border-radius:12px; padding:12px 18px; font-weight:750; font-size:14px; cursor:pointer; transition:.2s ease; }
    .primary-btn { color:#fff; background:linear-gradient(135deg,#7d32d1,#d5227f); box-shadow:0 9px 22px rgba(125,50,209,.2); }
    .primary-btn:hover { transform:translateY(-1px); box-shadow:0 12px 28px rgba(125,50,209,.27); }
    .primary-btn:disabled { opacity:.6; cursor:not-allowed; transform:none; }
    .secondary-btn { background:#fff; color:#342c4a; border:1px solid #e8e2ef; }
    .secondary-btn:hover { background:#faf8fc; }
    .outline-btn { background:#fff; color:#6d2ab4; border:1px solid #dbc9ec; }
    .outline-btn:hover { background:#f8f2ff; }
    .dashboard-message { background:#effbf5; color:#18744c; border:1px solid #cceedd; border-radius:13px; padding:13px 16px; margin-bottom:20px; font-weight:650; }
    .dashboard-message span { margin-right:8px; }
    .salon-list { display:grid; gap:28px; }
    .salon-card { background:rgba(255,255,255,.92); border:1px solid #ece7f2; border-radius:26px; box-shadow:0 18px 55px rgba(46,29,75,.08); overflow:hidden; }
    .salon-hero { padding:18px; display:grid; grid-template-columns:minmax(0,1.35fr) minmax(320px,.65fr); gap:18px; }
    .salon-cover { min-height:310px; border-radius:20px; overflow:hidden; position:relative; background:#ece5f7; }
    .salon-cover img { width:100%; height:100%; min-height:310px; object-fit:cover; display:block; }
    .cover-placeholder { min-height:310px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#e9def8,#fce7f1); font-size:54px; color:#8a55c4; }
    .cover-gradient { position:absolute; inset:0; background:linear-gradient(0deg,rgba(20,15,34,.75),transparent 58%); }
    .salon-hero-content { position:absolute; left:24px; right:24px; bottom:22px; color:#fff; }
    .salon-hero-content h2 { margin:9px 0 5px; font-size:32px; letter-spacing:-.025em; }
    .salon-hero-content p { margin:0; max-width:620px; color:rgba(255,255,255,.84); font-size:14px; }
    .status-pill { display:inline-flex; align-items:center; gap:7px; padding:6px 10px; background:rgba(255,255,255,.16); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.25); border-radius:999px; font-size:12px; font-weight:750; }
    .status-pill span { width:7px; height:7px; border-radius:50%; background:#50e29a; }
    .salon-info-panel { border:1px solid #eee8f4; border-radius:20px; padding:10px; background:#fbfaff; display:grid; grid-template-columns:1fr; align-content:center; }
    .info-item { display:flex; gap:13px; padding:15px 14px; border-bottom:1px solid #eee9f3; }
    .info-item:last-child { border-bottom:0; }
    .info-icon { width:38px; height:38px; border-radius:11px; display:grid; place-items:center; background:#f0e8ff; color:#7135ad; font-size:16px; flex:0 0 auto; }
    .info-item small { display:block; color:#9a92a5; font-size:11px; font-weight:700; margin-bottom:4px; }
    .info-item strong { display:block; color:#302841; font-size:13px; line-height:1.4; word-break:break-word; }
    .salon-toolbar { display:flex; justify-content:space-between; align-items:center; gap:20px; padding:16px 24px; border-top:1px solid #eee9f3; border-bottom:1px solid #eee9f3; background:#fff; }
    .stats-row { display:flex; gap:34px; }
    .stat { display:flex; flex-direction:column; }
    .stat strong { font-size:20px; color:#241d3b; }
    .stat span { color:#91899b; font-size:11px; margin-top:2px; }
    .management-section { padding:26px 24px 30px; }
    .services-section { border-top:1px solid #eee9f3; background:linear-gradient(180deg,#fff,#fcfbff); }
    .section-heading { display:flex; align-items:center; justify-content:space-between; gap:20px; margin-bottom:18px; }
    .section-title-wrap { display:flex; align-items:center; gap:12px; }
    .section-icon { width:42px; height:42px; border-radius:13px; display:grid; place-items:center; background:#eee6ff; color:#6f37a9; font-size:19px; }
    .section-icon.service { background:#fff0f8; color:#c52d77; }
    .section-title-wrap h3 { margin:0; font-size:20px; letter-spacing:-.01em; }
    .section-title-wrap p { margin:3px 0 0; color:#958da0; font-size:12px; }
    .staff-grid,.services-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:15px; }
    .staff-card { border:1px solid #ece7f1; border-radius:18px; padding:18px; background:#fff; transition:.2s ease; }
    .staff-card:hover,.service-card:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(52,31,79,.08); }
    .staff-top,.service-title-row { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
    .avatar { width:52px; height:52px; border-radius:15px; background:linear-gradient(135deg,#e9defb,#fde5f0); color:#6e35a8; display:grid; place-items:center; font-size:20px; font-weight:800; overflow:hidden; }
    .avatar img { width:100%; height:100%; object-fit:cover; }
    .staff-card h4,.service-card h4 { margin:15px 0 7px; font-size:17px; }
    .role-badge { display:inline-block; padding:5px 9px; border-radius:8px; background:#f5f0fb; color:#6c4a88; font-size:11px; font-weight:750; }
    .staff-card p,.service-card p { color:#7e768a; font-size:12px; line-height:1.55; margin:12px 0; }
    .experience { margin-top:15px; padding-top:13px; border-top:1px solid #f0ecf3; color:#71687d; font-size:11px; font-weight:650; }
    .delete-icon { border:0; width:32px; height:32px; border-radius:9px; background:#fff2f2; color:#dc3b43; cursor:pointer; font-weight:800; }
    .delete-icon:hover { background:#ffe3e3; }
    .service-card { overflow:hidden; border:1px solid #ece7f1; border-radius:18px; background:#fff; transition:.2s ease; }
    .service-image,.service-image-placeholder { width:100%; height:125px; display:block; object-fit:cover; }
    .service-image-placeholder { display:grid; place-items:center; background:linear-gradient(135deg,#f0e9ff,#ffeaf3); color:#8b4fc0; font-size:30px; }
    .service-content { padding:16px; }
    .service-title-row h4 { margin:0; }
    .service-title-row .delete-icon { flex:0 0 auto; }
    .service-bottom { display:flex; align-items:center; justify-content:space-between; margin-top:16px; }
    .service-bottom strong { color:#7a31c0; font-size:18px; }
    .service-bottom span { padding:6px 9px; border-radius:8px; background:#f7f4f9; color:#7d7485; font-size:11px; font-weight:700; }
    .section-empty { border:1px dashed #ddd4e7; border-radius:17px; padding:28px; text-align:center; color:#8e8598; background:#fcfbfd; }
    .section-empty div { width:42px; height:42px; margin:0 auto 10px; border-radius:13px; display:grid; place-items:center; background:#f0e8ff; color:#7743a8; }
    .section-empty span { display:block; color:#4a4256; font-size:14px; font-weight:750; }
    .section-empty small { display:block; margin-top:4px; font-size:11px; }
    .inline-form { margin:0 0 20px; padding:20px; border:1px solid #dfd2eb; border-radius:18px; background:#faf7fd; }
    .inline-form-title,.modal-header { display:flex; justify-content:space-between; align-items:flex-start; gap:15px; margin-bottom:18px; }
    .inline-form-title h4,.modal-header h2 { margin:0; }
    .icon-btn { border:0; background:#f4f0f7; color:#62596e; width:38px; height:38px; border-radius:10px; font-size:22px; cursor:pointer; }
    .icon-btn.small { width:30px; height:30px; font-size:18px; }
    .form-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:15px; }
    .form-grid.compact { gap:13px; }
    .field.full { grid-column:1/-1; }
    .field label { display:block; font-size:12px; color:#5e5668; font-weight:750; margin:0 0 7px; }
    .field input,.field textarea { width:100%; box-sizing:border-box; border:1px solid #ddd5e5; border-radius:11px; background:#fff; padding:11px 12px; font:inherit; font-size:13px; color:#2f2940; outline:none; }
    .field textarea { resize:vertical; }
    .field input:focus,.field textarea:focus { border-color:#a46bcf; box-shadow:0 0 0 3px rgba(164,107,207,.1); }
    .form-actions,.modal-actions { display:flex; justify-content:flex-end; gap:10px; margin-top:18px; }
    .modal-backdrop { position:fixed; inset:0; z-index:1000; background:rgba(26,20,38,.48); backdrop-filter:blur(5px); display:flex; align-items:center; justify-content:center; padding:20px; }
    .modal-card { width:min(780px,100%); max-height:90vh; overflow:auto; background:#fff; border-radius:24px; padding:26px; box-shadow:0 30px 90px rgba(26,18,42,.28); }
    .modal-header { align-items:center; }
    .empty-dashboard { padding:80px 24px; border:1px solid #ebe4f0; border-radius:24px; background:#fff; text-align:center; box-shadow:0 15px 45px rgba(46,29,75,.06); }
    .empty-icon { width:64px; height:64px; display:grid; place-items:center; margin:0 auto 16px; border-radius:20px; background:#eee5ff; color:#7539b2; font-size:27px; }
    .empty-dashboard h2 { margin:0; }
    .empty-dashboard p { color:#857d90; margin:8px auto 20px; max-width:460px; font-size:14px; }
    .salon-loading { min-height:70vh; display:grid; place-items:center; align-content:center; text-align:center; color:#62596e; }
    .salon-loading h3 { margin:15px 0 5px; color:#29213e; }
    .salon-loading p { margin:0; font-size:13px; }
    .loading-spinner { width:38px; height:38px; border:4px solid #e8def2; border-top-color:#8338bd; border-radius:50%; animation:spin .8s linear infinite; }
    @keyframes spin { to { transform:rotate(360deg); } }
    @media (max-width:1050px) { .salon-hero { grid-template-columns:1fr; } .staff-grid,.services-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
    @media (max-width:700px) { .salon-page { padding:24px 12px 50px; } .page-header { align-items:stretch; flex-direction:column; } .page-header h1 { font-size:31px; } .primary-btn { width:100%; } .salon-toolbar { align-items:stretch; flex-direction:column; } .stats-row { justify-content:space-between; gap:10px; } .management-section { padding:22px 16px; } .section-heading { align-items:flex-start; flex-direction:column; } .outline-btn { width:100%; } .staff-grid,.services-grid,.form-grid { grid-template-columns:1fr; } .field.full { grid-column:auto; } .salon-cover,.salon-cover img,.cover-placeholder { min-height:240px; } .salon-hero { padding:12px; } .salon-hero-content h2 { font-size:26px; } .modal-card { padding:20px; border-radius:18px; } }
`;

export default MySalon;
