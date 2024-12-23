import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const MarathonsInHome = () => {
    const [marathons, setMarathons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch running campaigns (limited to 6 by the backend)
        fetch('http://localhost:5000/marathonsInHome')
            .then((res) => res.json())
            .then((data) => setMarathons(data))
            .catch((err) => console.error('Error fetching marathons:', err));
    }, []);

    return (
        <div className="container mx-auto py-10 w-11/12">
            <h1 className="text-4xl font-bold text-center mb-6">Marathons</h1>
            {marathons.length === 0 ? (
                <p className="text-center">No marathons found!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marathons.map((marathon) => (
                        <div
                            key={marathon._id}
                            className="card shadow-xl pt-5"
                            data-tooltip-id={`tooltip-${marathon._id}`} // Unique ID for each tooltip
                            data-tooltip-content={`Registration deadline: ${marathon.endRegistrationDate}`}
                        >
                            <figure className='h-64 px-6'>
                                <img
                                    src={marathon.marathonImage}
                                    alt={marathon.marathonTitle}
                                    className="w-full h-full rounded-lg"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title dark:text-gray-300">{marathon.MarathonTitle}</h2>
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
                            <Tooltip id={`tooltip-${marathon._id}`} place="top" effect="solid" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MarathonsInHome;