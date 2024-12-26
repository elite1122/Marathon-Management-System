import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "../context/AuthContext";

const Register = () => {
    const { createNewUser, signInWithGoogle } = useContext(AuthContext);
    // console.log("AuthContext:", createNewUser, signInWithGoogle);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Function to validate password
    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasValidLength = password.length >= 6;

        if (!hasUppercase) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasLowercase) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!hasValidLength) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form Data
        const form = new FormData(e.target);
        const name = form.get("name");
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");

        // Validate password
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        // Reset error if password is valid
        setError("");

        // Create new user
        createNewUser(email, password, name, photo)
            .then(() => {
                e.target.reset();
                toast.success("Registration Successful");
                navigate("/");
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Registration Successful");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handlePasswordVisibilityToggle = (e) => {
        e.preventDefault(); // Prevent form submission
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card w-full max-w-lg shrink-0 shadow-2xl p-10">
                <h2 className="text-3xl font-bold text-center">Register Your Account</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            className="input input-bordered bg-white text-black"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            className="input input-bordered bg-white text-black"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="photo url"
                            name="photo"
                            className="input input-bordered bg-white text-black"
                            required
                        />
                    </div>

                    <div className="form-control relative">
                        <label className="label">
                            <span className="">Password</span>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            name="password"
                            className="input input-bordered bg-white text-black"
                            required
                        />
                        <button
                            onClick={handlePasswordVisibilityToggle}
                            className="btn btn-xs absolute right-2 top-12 bg-white text-black"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {error && (
                            <p className="text-red-500 mt-2 text-sm">{error}</p>
                        )}
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                <p className="text-center font-semibold">
                    Already Have An Account?{" "}
                    <span className="text-blue-600">
                        <Link to="/login">Login</Link>
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

export default Register;
