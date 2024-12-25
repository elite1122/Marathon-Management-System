import React from 'react';
import Banner from './InHome/Banner';
import MarathonsInHome from './InHome/MarathonsInHome';
import UpcomingMarathon from './InHome/UpcomingMarathon';
import InspirationalJourneys from './InHome/InspirationalJourneys';
import FrequentlyAskedQuestion from './InHome/FrequentlyAskedQuestion';

const Home = () => {
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