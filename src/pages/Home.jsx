import React from 'react';
import Banner from './InHome/Banner';
import MarathonsInHome from './InHome/MarathonsInHome';
import UpcomingMarathon from './InHome/UpcomingMarathon';
import InspirationalJourneys from './InHome/InspirationalJourneys';
import FrequentlyAskedQuestion from './InHome/FrequentlyAskedQuestion';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const { loading } = useAuth();
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg"></span></div>;
    }
    return (
        <div>
            <Banner></Banner>
            <MarathonsInHome></MarathonsInHome>
            <UpcomingMarathon></UpcomingMarathon>
            <InspirationalJourneys></InspirationalJourneys>
            <FrequentlyAskedQuestion></FrequentlyAskedQuestion>
        </div>
    );
};

export default Home;