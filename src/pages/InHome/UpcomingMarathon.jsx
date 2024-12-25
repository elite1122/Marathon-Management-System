import React from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const marathonsData = [
    {
        id: 1,
        title: 'Jhenaidah City Run Marathon',
        location: 'Jhenaidah, Bangladesh',
        startDate: 'February 2025',
        image: 'https://i.ibb.co.com/7yNGJy5/jhenaidah.png',
    },
    {
        id: 2,
        title: 'Beachside Dash',
        location: 'Kuakata, Bangladesh',
        startDate: 'March 2025',
        image: 'https://i.ibb.co.com/ZMH0Tx8/kuakata.png',
    },
    {
        id: 3,
        title: 'Mountain Adventure Run',
        location: 'Bandarban, Bangladesh',
        startDate: 'April 2025',
        image: 'https://i.ibb.co.com/1rn55ZJ/Bandarban-1.png',
    },
    {
        id: 4,
        title: 'Jessore Special  Marathon',
        location: 'Jessore, Bangladesh',
        startDate: 'May 2025',
        image: 'https://i.ibb.co.com/5TscfPX/Jessore.png',
    },
    {
        id: 5,
        title: 'Khulna National Day Run',
        location: 'Khulna, Bangladesh',
        startDate: 'March, 2025',
        image: 'https://i.ibb.co.com/ykYWh1b/khulna.png',
    },
    {
        id: 6,
        title: 'Magura Charity Run',
        location: 'Magura, Bangladesh',
        startDate: 'June 2025',
        image: 'https://i.ibb.co.com/pZh7kRm/magura.png',
    },
];

const handleLearnMore = () => {
    toast.info('Not Available Now. Coming Soon');
}

const UpcomingMarathon = () => {
    // Randomly select six marathons from the array
    const randomMarathons = marathonsData.sort(() => 0.5 - Math.random()).slice(0, 6);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold text-center mb-12">Upcoming Marathons</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {randomMarathons.map((marathon) => (
                    <div key={marathon.id} className="card shadow-lg">
                        <figure className="h-48">
                            <img src={marathon.image} alt={marathon.title} className="w-full h-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{marathon.title}</h2>
                            <p>{marathon.location}</p>
                            <p>
                                <span className="font-semibold">Probably starts in</span>{' '}
                                <span className='text-red-700'>{marathon.startDate}</span>
                            </p>
                            <button
                                onClick={handleLearnMore}
                                className="btn btn-primary mt-4"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingMarathon;
