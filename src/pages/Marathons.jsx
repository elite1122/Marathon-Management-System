import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Marathons = () => {

    const [marathons, setMarathons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/marathons')
            .then((res) => res.json())
            .then((data) => setMarathons(data))
            .catch((err) => console.error('Error fetching marathons:', err));
    }, []);

    return (
        <div className="container mx-auto py-10 w-11/12 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">All Marathons</h1>
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
                                    src={marathon.MarathonImage}
                                    alt={marathon.MarathonTitle}
                                    className="w-full h-full rounded-lg"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title dark:text-gray-300">{marathon.MarathonTitle}</h2>
                                <p className="text-sm dark:text-gray-400">{marathon.Location}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-secondary">
                                        Registration Start: {new Date(marathon.StartRegistrationDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-secondary">
                                        Registration End: {new Date(marathon.EndRegistrationDate).toLocaleDateString()}
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