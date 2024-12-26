import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const DynamicTitle = () => {
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        // Define titles for static routes
        const routeTitles = {
            "/": "Home | Go Marathon",
            "/marathons": "All Marathons | Go Marathon",
            "/dashboard": "Dashboard | Go Marathon",
            "/dashboard/addMarathon": "Add Marathon | Go Marathon",
            "/dashboard/myMarathonList": "My Marathon List | Go Marathon",
            "/dashboard/myApplyList": "My Apply List | Go Marathon",
        };

        let currentTitle = "Go Marathon"; // Default title

        // Handle dynamic routes
        if (location.pathname.startsWith("/marathons/") && id) {
            currentTitle = `Marathon Details | Go Marathon Marathon ID: ${id}`;
        } else if (location.pathname.startsWith("/registerMarathon/") && id) {
            currentTitle = `Register Marathon | Go Marathon Marathon ID: ${id}`;
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
