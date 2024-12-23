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
            element: <Marathons></Marathons>
        },
        {
            path: '/dashboard',
            element: <Dashboard></Dashboard>,
            children: [
                {
                    path: '/dashboard/addMarathon',
                    element: <AddMarathon></AddMarathon>
                }
            ]
        },
    ]
  },
]);

export default router;