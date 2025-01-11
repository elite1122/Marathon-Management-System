import {
    createBrowserRouter,
    Navigate,
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
import MarathonDetails from "../MarathonDetails/MarathonDetails";
import MyMarathonList from "../pages/InDashboard/myMarathonList";
import MyApplyList from "../pages/InDashboard/MyApplyList";
import MarathonRegistration from "../MarathonRegistration/MarathonRegistration";
import ContactForm from "../pages/ContactForm/ContactForm";

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
                element: <Login></Login>
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
                path: 'marathons/:id',
                element: <PrivateRoute><MarathonDetails></MarathonDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://marathon-management-system-server-alpha.vercel.app/marathons/${params.id}`)
            },
            {
                path: '/registerMarathon/:id',
                element: <PrivateRoute><MarathonRegistration></MarathonRegistration></PrivateRoute>,
                loader: ({ params }) => fetch(`https://marathon-management-system-server-alpha.vercel.app/marathons/${params.id}`)
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        // Default route when visiting /dashboard
                        index: true,
                        element: <Navigate to="/dashboard/addMarathon" replace={true} />
                    },
                    {
                        path: '/dashboard/addMarathon',
                        element: <PrivateRoute><AddMarathon></AddMarathon></PrivateRoute>
                    },
                    {
                        path: '/dashboard/myMarathonList',
                        element: <PrivateRoute><MyMarathonList></MyMarathonList></PrivateRoute>
                    },
                    {
                        path: '/dashboard/myApplyList',
                        element: <PrivateRoute><MyApplyList></MyApplyList></PrivateRoute>
                    }
                ]
            },
            {
                path: '/contact',
                element: <ContactForm></ContactForm>
            }
        ]
    },
]);

export default router;