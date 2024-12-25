import React from 'react';
import Banner from './InHome/Banner';
import MarathonsInHome from './InHome/MarathonsInHome';
import UpcomingMarathon from './InHome/UpcomingMarathon';
import InspirationalJourneys from './InHome/InspirationalJourneys';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MarathonsInHome></MarathonsInHome>
            <UpcomingMarathon></UpcomingMarathon>
            <InspirationalJourneys></InspirationalJourneys>
        </div>
    );
};

export default Home;