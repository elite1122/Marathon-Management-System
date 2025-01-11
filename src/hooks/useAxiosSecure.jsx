import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL: 'https://marathon-management-system-server-alpha.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            // console.log('api response error status', error.status);
            if (error.status === 401 || error.status === 403) {
                logOut()
                    .then(() => {
                        // redirect to the login page
                        navigate('/login');
                    })
                    .catch(err =>(err))
            }
            return Promise.reject(error);
        })
    }, [])

    return axiosInstance;
};

export default useAxiosSecure;
