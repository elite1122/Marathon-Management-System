import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg"></span></div>;
    }

    return (
        <div className='shadow-md sticky top-0 z-50 transition-colors duration-300 bg-white text-black'>
            <div className="flex justify-between w-11/12 mx-auto items-center py-3 flex-wrap">
                {/* Logo */}
                <div>
                    <Link to={'/'}>
                        <button className="btn btn-ghost text-xl text-green-400">
                            Marathon
                        </button>
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
                        Marathons
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
                </div>

                {/* User Profile & Conditional Buttons */}
                <div className="flex items-center space-x-4">
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
                                Marathons
                            </NavLink>
                        </li>

                        <li>
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
