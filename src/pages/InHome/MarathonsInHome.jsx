import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import useAuth from '../../hooks/useAuth';

const MarathonsInHome = () => {
    const [marathons, setMarathons] = useState([]);
    const navigate = useNavigate();
    const { loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg"></span></div>;
    }

    useEffect(() => {
        // Fetch running campaigns (limited to 6 by the backend)
        fetch('https://marathon-management-system-server-alpha.vercel.app/marathonsInHome')
            .then((res) => res.json())
            .then((data) => setMarathons(data))
            .catch((err) => console.error('Error fetching marathons:', err));
    }, []);

    const calculateRemainingTime = (marathonStartDate) => {
        const now = new Date();
        const start = new Date(marathonStartDate);
        return Math.max((start - now) / 1000, 0); // Return remaining time in seconds
    };

    return (
        <div className="container mx-auto py-12">
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
                                <h2 className="card-title dark:text-gray-300">{marathon.marathonTitle}</h2>
                                <p className="text-sm dark:text-gray-400">{marathon.location}</p>
                                <div className="space-y-2 mt-4">
                                    <p className="">
                                        <strong>Registration Start:</strong> {new Date(marathon.startRegistrationDate).toLocaleDateString()}
                                    </p>
                                    <p className="">
                                        <strong>Registration End:</strong> {new Date(marathon.endRegistrationDate).toLocaleDateString()}
                                    </p>
                                </div>
                                {/* Countdown Timer */}
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
                            <Tooltip id={`tooltip-${marathon._id}`} place="top" effect="solid" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MarathonsInHome;