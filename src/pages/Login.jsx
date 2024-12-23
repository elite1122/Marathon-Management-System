import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "../context/AuthContext";


const Login = () => {
    const { userLogin, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;

        userLogin(email, password)
            .then(() => {
                form.reset();
                toast.success("Login Successful");
                // Navigate to the intended route or default to home
                const redirectTo = location.state?.from?.pathname || "/";
                navigate(redirectTo, { replace: true });
            })
            .catch((error) => {
                // Display the actual error message
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Login Successful");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card w-full max-w-lg shadow-2xl p-10">
                <h2 className="text-3xl font-bold text-center">Login Your Account</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="">Password</span>
                        </label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="input input-bordered bg-white text-black"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="btn btn-xs absolute right-2 top-12 bg-white text-black"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <label className="label">
                            <p
                                className="label-text-alt link link-hover text-black"
                            >
                                Forgot password?
                            </p>
                        </label>
                    </div>

                    {/* Login Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>

                {/* Register and Google Sign-In */}
                <p className="text-center font-semibold mt-4">
                    Don't Have An Account?{" "}
                    <span className="text-blue-600">
                        <Link to="/register">Register</Link>
                    </span>
                </p>
                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-ghost text-base flex items-center justify-center gap-2 mt-4"
                >
                    <FcGoogle />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
