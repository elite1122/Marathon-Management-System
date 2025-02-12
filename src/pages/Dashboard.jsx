import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="">
            {/* Toggle Button */}
            <button
                className="flex btn btn-outline border-none text-gray-700 mt-4 ml-4 text-xl font-bold"
                onClick={toggleDrawer}
            >
                {isDrawerOpen ? '-' : '+'}
            </button>

            <div className={`drawer ${isDrawerOpen ? 'drawer-open' : ''}`}>
                {/* Drawer container */}
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} readOnly />
                <div className="drawer-content flex flex-col py-4">
                    {/* Page content here */}
                    <Outlet />
                </div>
                <div className={`drawer-side ${isDrawerOpen ? '' : 'hidden sm:block'}`}>
                    {/* Sidebar */}
                    <label
                        htmlFor="dashboard-drawer"
                        className="drawer-overlay sm:hidden"
                        onClick={toggleDrawer}
                    ></label>

                    <ul className="menu p-4 w-64 bg-base-200 text-black dark:bg-gray-800 dark:text-white">
                        <li>
                            <Link to="/dashboard/addMarathon" onClick={toggleDrawer}>
                                Add Marathon
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myMarathonList" onClick={toggleDrawer}>
                                My Marathon List
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myApplyList" onClick={toggleDrawer}>
                                My Apply List
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
