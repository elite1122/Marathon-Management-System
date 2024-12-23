import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <div className="text-center p-10 bg-white rounded-lg shadow-lg max-w-lg">
            <h2 className="text-9xl font-extrabold text-purple-600 mb-4">404</h2>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h3>
            <p className="text-gray-600 mb-8">
                The page you are looking for doesn’t exist or has been moved. Please check the URL or go back to the homepage.
            </p>
            <Link to="/" className="px-6 py-3 text-white bg-purple-600 font-semibold rounded-lg hover:bg-purple-700">
                Go to Homepage
            </Link>
        </div>
    </div>
    );
};

export default ErrorPage;