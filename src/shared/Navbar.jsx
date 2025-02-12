import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import logo from '../assets/gomarathon.png'

const Navbar = ({ isDarkMode, handleToggleTheme }) => {
    const { user, logOut, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg"></span></div>;
    }

    return (
        <div className={`shadow-md sticky top-0 z-50 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className="flex justify-between w-11/12 mx-auto items-center py-3 flex-wrap">
                {/* Logo */}
                <div className="bg-none">
                    <Link to={'/'}>
                        <img
                            className="w-16 h-12 btn"
                            src={logo}
                            alt="" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex space-x-4 font-semibold">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-blue-500 font-bold" : ""
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/marathons"
                        className={({ isActive }) =>
                            isActive ? "text-blue-500 font-bold" : ""
                        }
                    >
                        All Marathons
                    </NavLink>

                    {user && (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500 font-bold" : ""
                                }
                            >
                                Dashboard
                            </NavLink>
                        </>
                    )}
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? "text-blue-500 font-bold" : ""
                        }
                    >
                        Contact Us
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "text-blue-500 font-bold" : ""
                        }
                    >
                        About Us
                    </NavLink>
                </div>

                {/* User Profile & Conditional Buttons */}
                <div className="flex items-center space-x-4">
                    <header className="flex justify-end p-4">
                        <label className="swap swap-rotate">
                            {/* Hidden Checkbox */}
                            <input type="checkbox" className="theme-controller" checked={isDarkMode} onChange={handleToggleTheme} />

                            {/* Sun Icon */}
                            <svg
                                className="swap-off h-8 w-8 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* Moon Icon */}
                            <svg
                                className="swap-on h-8 w-8 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>

                    </header>
                    {user?.photoURL ? (
                        <div className="relative group flex items-center gap-2">
                            <div
                                tabIndex="0"
                                role="button"
                                className="btn btn-ghost btn-circle avatar group"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        referrerPolicy="no-referrer"
                                        alt="User Avatar"
                                        src={user.photoURL}
                                    />
                                </div>
                                {/* Hover Display */}
                                <span className="absolute hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-sm px-4 py-1 rounded-md -bottom-10 left-1/2 transform -translate-x-1/2 w-max">
                                    {user.displayName}
                                </span>
                            </div>
                            <button
                                onClick={logOut}
                                className="hidden lg:flex btn btn-outline text-gray-700 dark:text-white"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "hidden lg:flex btn btn-primary text-white"
                                        : "hidden lg:flex btn btn-outline text-gray-700 dark:text-white"
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive
                                        ? "hidden lg:flex btn btn-primary text-white"
                                        : "hidden lg:flex btn btn-outline text-gray-700 dark:text-white"
                                }
                            >
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden dropdown dropdown-end">
                    <button tabIndex="0" className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                    <ul
                        tabIndex="0"
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
                    >
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500 font-bold" : ""
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/marathons"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500 font-bold" : ""
                                }
                            >
                                All Marathons
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        isActive ? "text-blue-500 font-bold" : ""
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500 font-bold" : ""
                                }
                            >
                                Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500 font-bold" : ""
                                }
                            >
                                About Us
                            </NavLink>
                        </li>
                        {!user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            isActive ? "text-blue-500 font-bold" : ""
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) =>
                                            isActive ? "text-blue-500 font-bold" : ""
                                        }
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button onClick={logOut} className="btn btn-sm btn-outline ">
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
