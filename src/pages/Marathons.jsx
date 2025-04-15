import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Marathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('desc');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`https://marathon-management-system-server-alpha.vercel.app/marathons?sort=${sortOrder}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('API Response:', data); // Debugging the response
                setMarathons(Array.isArray(data) ? data : []); // Ensure it's an array
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching marathons:', err);
                setMarathons([]); // Set to an empty array on error
                setLoading(false);
            });
    }, [sortOrder]);

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const calculateRemainingTime = (marathonStartDate) => {
        const now = new Date();
        const start = new Date(marathonStartDate);
        return Math.max((start - now) / 1000, 0);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 min-h-screen">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">All Marathons</h1>

            <div className="flex justify-end mb-4">
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="select select-bordered w-max border-blue-400 bg-white text-black dark:bg-gray-800 dark:text-white"
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
                        <div key={marathon._id} className="card shadow-xl pt-5">
                            <figure className="h-48 px-6">
                                <img
                                    src={marathon.marathonImage}
                                    alt={marathon.marathonTitle}
                                    className="w-full h-full rounded-lg"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title dark:text-gray-300">{marathon.marathonTitle}</h2>
                                <p className="text-sm dark:text-gray-400">{marathon.location}</p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-primary">
                                        <strong>Registration Start:</strong> {new Date(marathon.startRegistrationDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-secondary">
                                        <strong>Registration End:</strong> {new Date(marathon.endRegistrationDate).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-center">
                                    <CountdownCircleTimer
                                        isPlaying
                                        duration={calculateRemainingTime(marathon.marathonStartDate)}
                                        colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000', 0.33]]}
                                        size={120}
                                        onComplete={() => ({ shouldRepeat: false })}
                                    >
                                        {({ remainingTime }) => {
                                            const days = Math.floor(remainingTime / 86400);
                                            const hours = Math.floor((remainingTime % 86400) / 3600);
                                            const minutes = Math.floor((remainingTime % 3600) / 60);
                                            const seconds = remainingTime % 60;
                                            return (
                                                <div className="text-center">
                                                    <p className="text-lg font-semibold">{days}d</p>
                                                    <p className="text-sm">{hours}h {minutes}m {seconds}s</p>
                                                </div>
                                            );
                                        }}
                                    </CountdownCircleTimer>
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
