import React from 'react';

const InspirationalJourneys = () => {
    return (
        <div className="contributor-stories py-10 rounded-2xl">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Inspirational Marathon Journeys</h2>
                <p className="text-lg text-gray-600 mx-auto mb-6 dark:text-gray-400">
                    Discover heartwarming stories of determination, passion, and giving back to the community through marathons.
                </p>
                <div className="flex justify-between gap-6 w-full">
                    <div className="p-6 rounded-lg shadow-md flex-1">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Rasheduzzaman Elite"
                                    src="https://i.ibb.co/zmGN20L/1652934627991.jpg"
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Rasheduzzaman Elite</h3>
                        <p className="dark:text-gray-400 text-justify">“Elite ran his first marathon to raise funds for local orphanages. Despite being new to running, his determination and consistent training led his to complete the event and raise over $10,000 for his cause.”</p>
                    </div>
                    <div className="p-6 rounded-lg shadow-md flex-1">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Zion Mezba"
                                    src="https://i.ibb.co/MsfvTPt/65642391.jpg"
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Zion Mezba</h3>
                        <p className="dark:text-gray-400 text-justify">“After battling depression, Zion found solace in running. He now shares his story to promote mental health awareness and helps others find strength through marathons.”</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InspirationalJourneys;