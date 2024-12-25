import React from 'react';
import Banner from './InHome/Banner';
import MarathonsInHome from './InHome/MarathonsInHome';
import UpcomingMarathon from './InHome/UpcomingMarathon';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MarathonsInHome></MarathonsInHome>
            <UpcomingMarathon></UpcomingMarathon>
        </div>
    );
};

export default Home;