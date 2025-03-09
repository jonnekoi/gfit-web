import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";;
import ClientWorkouts from "./ClientWorkouts.jsx";
import ClientOverview from "./ClientOverview.jsx";
import ClientMeals from "./ClientMeals.jsx";


const url = "http://localhost:3000/v1"

const ClientDetails = () => {
    const { clientId} = useParams();
    const [clientData, setClientData] = useState(null);
    const [activeSection, setActiveSection] = useState("Overview");
    const [profilePicture, setProfilePicture] = useState('');
    const [clientWeights, setClientWeights] = useState(null);
    const [notWeightData, setNotWeightData] = useState(false);
    const token = sessionStorage.getItem('token');


    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? prevSection : section));
        console.log(activeSection);
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
            const response = await fetch(url + `/clients/${clientId}` , fetchOptions);
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
        return <div></div>
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
        <>
            <div className="w-full">
                <div className="väribg flex flex-row w-full justify-between border-b">
                    <div className="flex flex-row items-center space-x-7">
                        <img src={profilePicture} alt="profile" className="rounded-full w-44 h-44 m-3"/>
                        <h1 className="michroma-regular font-bold text-white text-3xl">{clientData.FirstName} {clientData.LastName}</h1>
                        {notWeightData && (
                            <p></p>
                        )}
                        <p className="montserrat-text font-semibold text-white text-2xl">{lastWeight}</p>
                        <p className="montserrat-text font-semibold text-white text-2xl">{clientData.targetWeight}</p>
                        <p className="montserrat-text font-semibold text-2xl text-orange-500">{weightDifferenceAmount}</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <nav className="space-x-5 mr-5">
                            {["Overview", "Workouts", "Meals", "Chat"].map((section) => (
                                <button
                                    key={section}
                                    className="text-white font-bold bg-orange-500 montserrat-text text-1xl border min-w-48 border-orange-500 p-2 rounded"
                                    onClick={() => handleSectionClick(section)}>{section}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                        <div className="flex w-full justify-center mt-5">
                            {activeSection === "Overview" && (<ClientOverview client={clientData}/>)}
                            {activeSection === "Workouts" && (<ClientWorkouts exercises={clientData.workouts}/>)}
                            {activeSection === "Meals" && (<ClientMeals/>)}
                        </div>
                </div>
            </div>
        </>
    )
}

export default ClientDetails;

