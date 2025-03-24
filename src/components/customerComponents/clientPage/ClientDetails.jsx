import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientWorkouts from "./ClientWorkouts.jsx";
import ClientOverview from "./ClientOverview.jsx";
import ClientMeals from "./ClientMeals.jsx";
import Button from "../../../buttons/Button.jsx";

const url = "http://localhost:3000/v1";

const ClientDetails = () => {
    const { clientId } = useParams();
    const [clientData, setClientData] = useState(null);
    const [activeSection, setActiveSection] = useState("Overview");
    const [profilePicture, setProfilePicture] = useState(null);
    const [clientWeights, setClientWeights] = useState(null);
    const [notWeightData, setNotWeightData] = useState(false);
    const token = sessionStorage.getItem('token');

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };

    const fetchProfilePicture = async (clientId) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + token,
            }
        }
        try {
            // TODO: NEED TO ADD PROFILEPICTURE FILE PATH or NAME TO DATABASE (or something like that)AND GET IT THERE INSTEAD OF DOING IT LIKE THIS
            const response = await fetch(url + '/users/profilePicture/' + clientId + '-profile.jpg', fetchOptions);
            if (!response.ok) {
                throw new Error('Profile picture not found');
            }
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setProfilePicture(imageUrl);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchClientWeights = async (id) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + token,
            }
        };
        try {
            const response = await fetch(url + "/clients/weight/" + id, fetchOptions);
            const data = await response.json();
            setClientWeights(data);
            if (data.length === 0) {
                setNotWeightData(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchClient = async () => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + token,
            }
        };
        try {
            const response = await fetch(url + `/clients/${clientId}`, fetchOptions);
            const data = await response.json();
            setClientData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchClient();
        fetchProfilePicture(clientId);
        fetchClientWeights(clientId);
    }, []);

    if (!clientData) {
        return <div className="w-full text-center py-8 text-white">Loading...</div>;
    }

    const sortedWeights = clientWeights ? clientWeights.sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

    let lastWeight = null;
    let differenceWeight = null;
    let weightTargetDifference = null;
    let weightDifferenceAmount = null;

    if (sortedWeights.length > 0) {
        lastWeight = sortedWeights[sortedWeights.length - 1].weight;
        differenceWeight = lastWeight - clientData.targetWeight;
        weightTargetDifference = Math.abs(differenceWeight).toFixed(2);
        weightDifferenceAmount = (differenceWeight > 0 ? "+ " : "- ") + weightTargetDifference + " kg";
    }

    return (
        <div className="w-full">
            <div className="väribg flex flex-col md:flex-row w-full justify-between p-4">
                <div className="flex flex-col md:flex-row items-center md:space-x-4 lg:space-x-7 mb-4 md:mb-0">
                    <img
                        src={profilePicture}
                        alt="profile"
                        className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 m-2 border-2 border-orange-500"
                    />

                    <div className="flex flex-col items-center md:items-start mt-3 md:mt-0">
                        <h1 className="michroma-regular font-bold text-white text-xl sm:text-2xl md:text-3xl text-center md:text-left">
                            {clientData.FirstName} {clientData.LastName}
                        </h1>

                        <div className="flex flex-row justify-center md:justify-start gap-3 sm:space-x-3 md:space-x-5 mt-3">
                            <p className="montserrat-text font-semibold text-white text-lg sm:text-xl md:text-2xl">
                                {lastWeight || "0.00"}
                            </p>
                            <p className="montserrat-text font-semibold text-white text-lg sm:text-xl md:text-2xl">
                                {clientData.targetWeight || 0.00}
                            </p>
                            <p className="montserrat-text font-semibold text-lg sm:text-xl md:text-2xl text-orange-500">
                                {weightDifferenceAmount || "+/- 0.00"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end md:flex-col">
                    <nav className="flex flex-wrap justify-center gap-2 md:space-x-2 lg:space-x-5 md:mr-5">
                        {["Overview", "Workouts", "Nutrition", "Chat"].map((section) => (
                            <Button
                                text={section}
                                key={section}
                                onClick={() => handleSectionClick(section)}
                            >
                                {section}
                            </Button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="flex w-full justify-center px-4 mt-4 sm:px-6 md:px-8 lg:m-10">
                    {activeSection === "Overview" && (<ClientOverview client={clientData} />)}
                    {activeSection === "Workouts" && (<ClientWorkouts exercises={clientData.workouts} userId={clientId} />)}
                    {activeSection === "Nutrition" && (<ClientMeals userId={clientId} />)}
                </div>
            </div>
        </div>
    );
};

export default ClientDetails;
