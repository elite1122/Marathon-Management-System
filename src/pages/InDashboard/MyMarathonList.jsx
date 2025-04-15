import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyMarathonList = () => {
    const [marathons, setMarathons] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedMarathon, setSelectedMarathon] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    // States for dates in the update form
    const [startRegistrationDate, setStartRegistrationDate] = useState(null);
    const [endRegistrationDate, setEndRegistrationDate] = useState(null);
    const [marathonStartDate, setMarathonStartDate] = useState(null);

    useEffect(() => {
        setLoading(true); // Start loading
        axiosSecure.get(`/marathons?email=${user.email}`)
            .then((res) => setMarathons(res.data))
            .catch((err) => console.error("Error fetching marathons:", err))
            .finally(() => setLoading(false)); // End loading
    }, [user.email]);

    const handleUpdate = (marathon) => {
        setSelectedMarathon(marathon); // Open the update modal
        // Initialize date states with selected marathon's data
        setStartRegistrationDate(new Date(marathon.startRegistrationDate));
        setEndRegistrationDate(new Date(marathon.endRegistrationDate));
        setMarathonStartDate(new Date(marathon.marathonStartDate));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true); // Start loading
                fetch(`https://marathon-management-system-server-alpha.vercel.app/marathons/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'The marathon has been deleted.', 'success');
                            setMarathons(marathons.filter((marathon) => marathon._id !== id));
                        }
                    })
                    .catch((err) => console.error("Error deleting marathon:", err))
                    .finally(() => setLoading(false)); // End loading
            }
        });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        const updatedMarathon = {
            marathonTitle: e.target.marathonTitle.value,
            startRegistrationDate: startRegistrationDate,
            endRegistrationDate: endRegistrationDate,
            marathonStartDate: marathonStartDate,
            location: e.target.location.value,
            runningDistance: e.target.runningDistance.value,
            description: e.target.description.value,
            marathonImage: e.target.marathonImage.value,
        };

        fetch(`https://marathon-management-system-server-alpha.vercel.app/marathons/${selectedMarathon._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMarathon),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Success', 'Marathon updated successfully!', 'success');
                    setMarathons(marathons.map((marathon) =>
                        marathon._id === selectedMarathon._id ? { ...marathon, ...updatedMarathon } : marathon
                    ));
                } else {
                    Swal.fire('Error', 'Failed to update marathon', 'error');
                }
                setSelectedMarathon(null); // Close the modal
            })
            .catch((error) => {
                console.error("Error updating marathon:", error);
                Swal.fire('Error', 'An error occurred while updating the marathon', 'error');
            })
            .finally(() => setLoading(false)); // End loading
    };

    return (
        <div className="container mx-auto py-10 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-4">My Marathons</h1>

            {loading ? (
                <div className="flex justify-center items-center"><span className="loading loading-bars loading-lg"></span></div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-200 text-center">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">#</th>
                                <th className="px-4 py-2 border">Title</th>
                                <th className="px-4 py-2 border">Location</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marathons.map((marathon, index) => (
                                <tr key={marathon._id}>
                                    <td className="px-4 py-2 border">{index + 1}</td>
                                    <td className="px-4 py-2 border">{marathon.marathonTitle}</td>
                                    <td className="px-4 py-2 border">{marathon.location}</td>
                                    <td className="px-4 py-2 border space-y-3">
                                        <div className='"flex flex-col lg:flex-row space-y-2 lg:space-y-0 justify-center"'>
                                            <button
                                                onClick={() => handleUpdate(marathon)}
                                                className="btn btn-warning mr-2"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(marathon._id)}
                                                className="btn btn-error"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {marathons.length === 0 && (
                        <p className="text-center mt-4">No marathons found!</p>
                    )}
                </div>
            )}

            {selectedMarathon && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setSelectedMarathon(null)} // Close modal on background click
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-3/5 max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <h2 className="font-bold text-lg dark:text-black mb-4">Update Marathon</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Marathon Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="marathonTitle"
                                    defaultValue={selectedMarathon.marathonTitle}
                                    className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Start Registration Date</span>
                                </label>
                                <DatePicker
                                    selected={startRegistrationDate}
                                    onChange={(date) => setStartRegistrationDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">End Registration Date</span>
                                </label>
                                <DatePicker
                                    selected={endRegistrationDate}
                                    onChange={(date) => setEndRegistrationDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Marathon Start Date</span>
                                </label>
                                <DatePicker
                                    selected={marathonStartDate}
                                    onChange={(date) => setMarathonStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={selectedMarathon.location}
                                    className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Running Distance</span>
                                </label>
                                <select
                                    name="runningDistance"
                                    defaultValue={selectedMarathon.runningDistance || "Select running distance"}
                                    className="select select-ghost bg-white text-black dark:bg-gray-800 dark:text-white"
                                >
                                    <option disabled>Select running distance</option>
                                    <option>25k</option>
                                    <option>10k</option>
                                    <option>3k</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    defaultValue={selectedMarathon.description}
                                    className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Marathon Image URL</span>
                                </label>
                                <input
                                    type="url"
                                    name="marathonImage"
                                    defaultValue={selectedMarathon.marathonImage}
                                    className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary w-max mx-auto">Update Marathon</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyMarathonList;
