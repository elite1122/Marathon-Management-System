import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../shared/Footer';
import DynamicTitle from '../DynamicTitle/DynamicTitle';

const MainLayout = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load theme from localStorage or default to light
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    // Toggle Theme Handler
    const handleToggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        if (!isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <div className="max-w-[1440px] mx-auto w-11/12">
                <DynamicTitle></DynamicTitle>
                <Navbar isDarkMode={isDarkMode} handleToggleTheme={handleToggleTheme}></Navbar>
                <Outlet></Outlet>
                <Footer isDarkMode={isDarkMode} handleToggleTheme={handleToggleTheme}></Footer>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>

    );
};

export default MainLayout;