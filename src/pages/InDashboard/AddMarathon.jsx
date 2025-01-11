import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const AddMarathon = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // State variables for the dates
    const [startRegistrationDate, setStartRegistrationDate] = useState(null);
    const [endRegistrationDate, setEndRegistrationDate] = useState(null);
    const [marathonStartDate, setMarathonStartDate] = useState(null);

    const handleAddMarathon = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());

        // Append the dates and additional fields
        initialData.startRegistrationDate = startRegistrationDate;
        initialData.endRegistrationDate = endRegistrationDate;
        initialData.marathonStartDate = marathonStartDate;
        initialData.createdAt = new Date(); 
        initialData.totalRegistrationCount = 0; 
        initialData.creatorName = user.displayName;
        initialData.creatorEmail = user.email;

        fetch("https://marathon-management-system-server-alpha.vercel.app/marathons", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(initialData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Marathon has been added.",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    // Clear form and state
                    e.target.reset();
                    setStartRegistrationDate(null);
                    setEndRegistrationDate(null);
                    setMarathonStartDate(null);

                    // Navigate to "My Marathon List"
                    navigate("/dashboard/myMarathonList");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to add marathon",
                        text: "Something went wrong!",
                    });
                }
            })
            .catch((error) => {
                console.error("Error adding marathon:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Could not add the marathon. Please try again later.",
                });
            });
    };

    return (
        <div>
            <h2 className="text-2xl md:text-4xl font-bold text-center">Create Marathon</h2>
            <form onSubmit={handleAddMarathon} className="card-body">
                {/* Marathon Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Marathon Title</span>
                    </label>
                    <input
                        type="text"
                        name="marathonTitle"
                        placeholder="Enter marathon title"
                        className="input input-bordered"
                        required
                    />
                </div>

                {/* Start Registration Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Start Registration Date</span>
                    </label>
                    <DatePicker
                        selected={startRegistrationDate} // Bind to state
                        onChange={(date) => setStartRegistrationDate(date)} // Update state
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Enter start registration date"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* End Registration Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">End Registration Date</span>
                    </label>
                    <DatePicker
                        selected={endRegistrationDate} // Bind to state
                        onChange={(date) => setEndRegistrationDate(date)} // Update state
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Enter end registration date"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Marathon Start Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Marathon Start Date</span>
                    </label>
                    <DatePicker
                        selected={marathonStartDate} // Bind to state
                        onChange={(date) => setMarathonStartDate(date)} // Update state
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Enter marathon start date"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter location"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Running Distance */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Running Distance</span>
                    </label>
                    <select
                        name="runningDistance"
                        defaultValue="Select running distance"
                        className="select select-ghost w-full"
                    >
                        <option disabled>Select running distance</option>
                        <option>25k</option>
                        <option>10k</option>
                        <option>3k</option>
                    </select>
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        className="input input-bordered"
                        required
                    />
                </div>

                {/* Marathon Image URL */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Marathon Image URL</span>
                    </label>
                    <input
                        type="url"
                        name="marathonImage"
                        placeholder="Marathon Image URL"
                        className="input input-bordered"
                        required
                    />
                </div>

                {/* Create Marathon Button */}
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Create Marathon</button>
                </div>
            </form>
        </div>
    );
};

export default AddMarathon;
