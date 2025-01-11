import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

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
    const [loading, setLoading] = useState(false); // Loading state
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch all applied marathons
    useEffect(() => {
        setLoading(true); // Start loading
        axiosSecure
            .get(`/registerMarathon?email=${user.email}`)
            .then((res) => {
                setAppliedMarathons(res.data);
                setFilteredMarathons(res.data); // Initialize filtered data
            })
            .catch((error) => {
                console.error('Error fetching marathons:', error);
            })
            .finally(() => {
                setLoading(false); // End loading
            });
    }, [user.email, axiosSecure]);

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
                setLoading(true); // Start loading
                axiosSecure
                    .delete(`/registerMarathon/${id}`)
                    .then((res) => {
                        if (res.status >= 200 && res.status < 300) {
                            Swal.fire('Deleted!', 'The registration has been deleted.', 'success');
                            return axiosSecure.get(`/registerMarathon?email=${user.email}`);
                        } else {
                            throw new Error('Failed to delete registration');
                        }
                    })
                    .then((res) => {
                        setAppliedMarathons(res.data);
                        setFilteredMarathons(res.data);
                    })
                    .catch((error) => {
                        console.error('Error deleting registration:', error);
                        Swal.fire('Error', 'Failed to delete the registration. Please try again.', 'error');
                    })
                    .finally(() => {
                        setLoading(false); // End loading
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
        setLoading(true); // Start loading
        const updatedInfo = {
            ...formData,
            marathonTitle: currentMarathon.marathonTitle,
            marathonStartDate: currentMarathon.startDate,
        };

        axiosSecure
            .put(`/registerMarathon/${currentMarathon._id}`, updatedInfo)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
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
            })
            .catch((error) => {
                console.error('Error updating registration:', error);
                Swal.fire('Error', 'Failed to update registration. Please try again.', 'error');
            })
            .finally(() => {
                setLoading(false); // End loading
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container mx-auto py-10 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-4">My Apply List</h1>

            {/* Show loading indicator */}
            {loading && <div className="flex justify-center items-center"><span className="loading loading-bars loading-lg"></span></div>}

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
            <div className="overflow-x-auto">
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
                {!loading && filteredMarathons.length === 0 && (
                    <p className="text-center mt-4">No marathons found!</p>
                )}
            </div>

            {/* Modal for Update */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Update Registration</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            {/* Form fields */}
                            {/* Similar to the code shared */}
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
