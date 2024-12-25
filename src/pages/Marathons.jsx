import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Marathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc'); // Default sort order
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/marathons?sort=${sortOrder}`)
            .then((res) => res.json())
            .then((data) => setMarathons(data))
            .catch((err) => console.error('Error fetching marathons:', err));
    }, [sortOrder]); // Re-fetch data when sortOrder changes

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <div className="container mx-auto py-10 w-11/12 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">All Marathons</h1>

            {/* Sorting Options */}
            <div className="flex justify-end mb-4">
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="select select-bordered w-max border-blue-400"
                >
                    <option value="desc">Newest to Oldest</option>
                    <option value="asc">Oldest to Newest</option>
                </select>
            </div>

            {marathons.length === 0 ? (
                <p className="text-center">No marathons found!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marathons.map((marathon) => (
                        <div
                            key={marathon._id}
                            className="card shadow-xl pt-5"
                        >
                            <figure className='h-64 px-6'>
                                <img
                                    src={marathon.marathonImage}
                                    alt={marathon.marathonTitle}
                                    className="w-full h-full rounded-lg"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title dark:text-gray-300">{marathon.marathonTitle}</h2>
                                <p className="text-sm dark:text-gray-400">{marathon.location}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-secondary">
                                        Registration Start: {new Date(marathon.startRegistrationDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-secondary">
                                        Registration End: {new Date(marathon.endRegistrationDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    className="btn btn-primary w-full mt-4"
                                    onClick={() => navigate(`/marathons/${marathon._id}`)}
                                >
                                    See More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Marathons;
