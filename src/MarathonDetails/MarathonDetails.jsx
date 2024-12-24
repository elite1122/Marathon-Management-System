import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const MarathonDetails = () => {
    const { _id,
        marathonTitle,
        location,
        runningDistance,
        description,
        marathonImage,
        startRegistrationDate,
        endRegistrationDate,
        marathonStartDate,
        createdAt,
        totalRegistrationCount
    } = useLoaderData();

    const handleRegister = () => {

        // const currentDate = new Date();
        // const deadlineDate = new Date(deadline);

        // if (currentDate > deadlineDate) {
        //     Swal.fire({
        //         title: 'Registration Closed',
        //         text: 'The deadline for this registration has passed. Registration is no longer accepted.',
        //         icon: 'error',
        //         confirmButtonText: 'OK',
        //     });
        //     return;
        // }
    };

    return (
        <div className="container mx-auto py-10 w-full">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center mb-2 text-blue-500">{marathonTitle}</h1>
            <h1 className="text-base md:text-lg lg:text-xl font-bold text-center mb-6">Total Registration({totalRegistrationCount})</h1>
            <div className="flex flex-col items-start md:items-center gap-6 w-4/5 lg:w-2/5 mx-auto">
                <div className="w-full">
                    <img
                        src={marathonImage}
                        alt={marathonTitle}
                        className="rounded-2xl w-full object-cover"
                    />
                </div>
                <div className="w-full space-y-4">
                    <p className="text-gray-700 text-lg dark:text-gray-400">
                        <strong>Description: </strong>
                        {description}
                    </p>
                    <p className="text-gray-700 text-lg dark:text-gray-400">
                        <strong>Location: </strong>
                        {location}
                    </p>
                    <p className="text-gray-700 text-lg dark:text-gray-400">
                        <strong>Running Distance: </strong>{runningDistance}
                    </p>
                    <p className="text-gray-700 text-lg dark:text-gray-400">
                        <strong>Start Registration Date: </strong>{startRegistrationDate}
                    </p>
                    <p className="text-gray-700 text-lg dark:text-gray-400">
                        <strong>End Registration Date: </strong>{endRegistrationDate}
                    </p>
                    <p className="text-gray-700 text-lg pb-4 dark:text-gray-400">
                        <strong>Marathon Start Date: </strong>{marathonStartDate}
                    </p>
                    
                    <Link to={`/marathons/${_id}`}>
                        <button onClick={handleRegister} className="btn btn-primary w-full">
                            Registration Link
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MarathonDetails;