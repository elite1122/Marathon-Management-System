import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Marathons from "../pages/Marathons";
import Dashboard from "../pages/Dashboard";
import AddMarathon from "../pages/InDashboard/AddMarathon";
import ErrorPage from "../shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element:<Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/marathons',
            element: <PrivateRoute><Marathons></Marathons></PrivateRoute>
        },
        {
            path: '/dashboard',
            element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            children: [
                {
                    path: '/dashboard/addMarathon',
                    element: <PrivateRoute><AddMarathon></AddMarathon></PrivateRoute>
                }
            ]
        },
    ]
  },
]);

export default router;