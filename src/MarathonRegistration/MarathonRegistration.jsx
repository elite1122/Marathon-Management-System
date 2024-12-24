import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate, useLocation, useLoaderData } from "react-router-dom";

const MarathonRegistration = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { _id, marathonTitle, marathonStartDate } = useLoaderData();

    const [marathonDetails, setMarathonDetails] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");

    useEffect(() => {
        if (location.state) {
            setMarathonDetails(location.state);
        }
    }, [location.state]);

    const handleRegisterMarathon = (e) => {
        e.preventDefault();
    
        // Prepare the registration data
        const registrationData = {
            email: user.email,
            firstName,
            lastName,
            contactNumber,
            additionalInfo,
            marathonTitle: marathonTitle,
            startDate: marathonStartDate,
            marathonId: _id, // Include marathonId in the registration payload
        };
    
        fetch("http://localhost:5000/registerMarathon", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(registrationData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully registered for the marathon!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
    
                    // Redirect to dashboard after registration
                    navigate("/dashboard/myApplyList");
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Failed to register for the marathon.",
                        showConfirmButton: true,
                    });
                }
            })
            .catch((error) => {
                console.error("Error during registration:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "An error occurred during registration.",
                    showConfirmButton: true,
                });
            });
    };
    

    return (
        <div>
            <h2 className="text-3xl font-bold text-center pt-8">Register for Marathon</h2>
            <form onSubmit={handleRegisterMarathon} className="card-body">
                {/* Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="input input-bordered"
                    />
                </div>

                {/* Marathon Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Marathon Title</span>
                    </label>
                    <input
                        type="text"
                        value={marathonTitle || ""}
                        readOnly
                        className="input input-bordered"
                    />
                </div>

                {/* Start Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Start Date</span>
                    </label>
                    <input
                        type="text"
                        value={marathonStartDate || ""}
                        readOnly
                        className="input input-bordered"
                    />
                </div>

                {/* First Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">First Name</span>
                    </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        className="input input-bordered"
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Last Name</span>
                    </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        className="input input-bordered"
                        required
                    />
                </div>

                {/* Contact Number */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Contact Number</span>
                    </label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Enter your contact number"
                        className="input input-bordered"
                        required
                    />
                </div>

                {/* Additional Info */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Additional Info</span>
                    </label>
                    <textarea
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder="Enter any additional information"
                        className="textarea textarea-bordered"
                    />
                </div>

                {/* Register Button */}
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
};

export default MarathonRegistration;
