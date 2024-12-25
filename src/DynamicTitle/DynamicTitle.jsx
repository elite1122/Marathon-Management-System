import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const DynamicTitle = () => {
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        // Define titles for static routes
        const routeTitles = {
            "/": "Home | Marathon Management",
            "/marathons": "All Marathons | Marathon Management",
            "/dashboard": "Dashboard | Marathon Management",
            "/dashboard/addMarathon": "Add Marathon | Marathon Management",
            "/dashboard/myMarathonList": "My Marathon List | Marathon Management",
            "/dashboard/myApplyList": "My Apply List | Marathon Management",
        };

        let currentTitle = "Marathon Management System"; // Default title

        // Handle dynamic routes
        if (location.pathname.startsWith("/marathons/") && id) {
            currentTitle = `Marathon Details | Marathon Management Marathon ID: ${id}`;
        } else if (location.pathname.startsWith("/registerMarathon/") && id) {
            currentTitle = `Register Marathon | Marathon Management Marathon ID: ${id}`;
        } else {
            // Handle static paths
            currentTitle = routeTitles[location.pathname] || currentTitle;
        }

        // Update the document title
        document.title = currentTitle;
    }, [location, id]);

    return null; // This component doesn't render anything
};

export default DynamicTitle;
