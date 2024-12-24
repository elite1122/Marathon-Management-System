import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AddMarathon from './InDashboard/AddMarathon';
import MyMarathonList from './InDashboard/myMarathonList';
import MyApplyList from './InDashboard/MyApplyList';

const Dashboard = () => {
    return (
        <div className="drawer drawer-open">
            {/* Drawer container */}
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col py-4">
                {/* Page content here */}
                <Outlet />
            </div>
            <div className="drawer-side">
                {/* Sidebar */}
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <ul className="menu p-4 w-max bg-base-200 text-base-content">
                    <li>
                        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                    </li>
                    <li>
                        <Link to="/dashboard/addMarathon">Add Marathon</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/myMarathonList">My Marathon List</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/myApplyList">My Apply List</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
