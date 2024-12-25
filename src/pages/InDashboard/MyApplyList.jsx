import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyApplyList = () => {
    const [appliedMarathons, setAppliedMarathons] = useState([]);
    const [filteredMarathons, setFilteredMarathons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentMarathon, setCurrentMarathon] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        additionalInfo: '',
    });
    const { user } = useAuth();

    // Fetch all applied marathons
    useEffect(() => {
        fetch(`http://localhost:5000/registerMarathon?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setAppliedMarathons(data);
                setFilteredMarathons(data); // Initialize filtered data
            });
    }, [user.email]);

    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter marathons based on the search query
        setFilteredMarathons(
            appliedMarathons.filter((marathon) =>
                marathon.marathonTitle.toLowerCase().includes(query)
            )
        );
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
                fetch(`http://localhost:5000/registerMarathon/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'The registration has been deleted.', 'success');
                            const updatedMarathons = appliedMarathons.filter(
                                (marathon) => marathon._id !== id
                            );
                            setAppliedMarathons(updatedMarathons);
                            setFilteredMarathons(updatedMarathons);
                        }
                    });
            }
        });
    };

    const handleUpdateClick = (marathon) => {
        setCurrentMarathon(marathon);
        setFormData({
            firstName: marathon.firstName || '',
            lastName: marathon.lastName || '',
            contactNumber: marathon.contactNumber || '',
            additionalInfo: marathon.additionalInfo || '',
        });
        setShowModal(true);
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const updatedInfo = {
            ...formData,
            marathonTitle: currentMarathon.marathonTitle,
            marathonStartDate: currentMarathon.startDate,
        };

        fetch(`http://localhost:5000/registerMarathon/${currentMarathon._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Updated!', 'The registration details have been updated.', 'success');
                    const updatedMarathons = appliedMarathons.map((marathon) =>
                        marathon._id === currentMarathon._id
                            ? { ...marathon, ...updatedInfo }
                            : marathon
                    );
                    setAppliedMarathons(updatedMarathons);
                    setFilteredMarathons(updatedMarathons);
                    setShowModal(false);
                }
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold text-center mb-4">My Apply List</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Marathon Title"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="input input-bordered w-full"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-w-min">
                <table className="table-auto w-full border border-gray-200 text-center">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">Marathon Title</th>
                            <th className="px-4 py-2 border">Start Date</th>
                            <th className="px-4 py-2 border">Contact Number</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMarathons.map((marathon, index) => (
                            <tr key={marathon._id}>
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{marathon.marathonTitle}</td>
                                <td className="px-4 py-2 border">{new Date(marathon.startDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border">{marathon.contactNumber}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handleUpdateClick(marathon)}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(marathon._id)}
                                        className="btn btn-sm btn-danger ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredMarathons.length === 0 && (
                    <p className="text-center mt-4">No marathons found!</p>
                )}
            </div>

            {/* Modal for Update */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Update Registration</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            {/* Marathon Title */}
                            <div className="form-control">
                                <label className="label">Marathon Title</label>
                                <input
                                    type="text"
                                    value={currentMarathon.marathonTitle}
                                    readOnly
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Start Date */}
                            <div className="form-control">
                                <label className="label">Start Date</label>
                                <input
                                    type="text"
                                    value={new Date(currentMarathon.startDate).toLocaleDateString()}
                                    readOnly
                                    className="input input-bordered"
                                />
                            </div>

                            {/* First Name */}
                            <div className="form-control">
                                <label className="label">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div className="form-control">
                                <label className="label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="form-control">
                                <label className="label">Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Additional Info */}
                            <div className="form-control">
                                <label className="label">Additional Info</label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered"
                                />
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-secondary mr-2"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplyList;
