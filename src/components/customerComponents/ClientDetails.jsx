import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";;
import ClientWorkouts from "./clientPage/ClientWorkouts.jsx";
import ClientOverview from "./clientPage/ClientOverview.jsx";
import ClientMeals from "./clientPage/ClientMeals.jsx";

const url = "http://localhost:3000/v1"

const ClientDetails = () => {
    const { clientId} = useParams();
    const [clientData, setClientData] = useState(null);
    const [activeSection, setActiveSection] = useState("Overview");

    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? null : section));
        console.log(activeSection);
    };

    const fetchClient = async () => {
        try {
            const response = await fetch(url + `/clients/${clientId}`);
            const data = await response.json();
            setClientData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchClient();
    }, [clientId]);

    if (!clientData) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-full justify-center flex flex-col items-center">
            <nav className="space-x-5 mt-5">
                {["Overview", "Workouts", "Meals"].map((section) => (
                    section === "Craft Meal" ? (
                        <button
                            key={section}
                            className="text-white font-bold bg-orange-500 montserrat-text text-1xl border min-w-48 border-orange-500 p-2 rounded"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    ) : (
                        <button
                            key={section}
                            className="text-white font-bold montserrat-text text-1xl border border-orange-500 p-2 min-w-48 rounded hover:border-orange-300"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    )
                ))}
            </nav>
            <div className="flex justify-center mt-5">
                {activeSection === "Overview" && (<ClientOverview client={clientData}/>)}
                {activeSection === "Workouts" && (<ClientWorkouts exercises={clientData.workouts}/>)}
                {activeSection === "Meals" && (<ClientMeals/>)}
            </div>
        </div>
    )
}

export default ClientDetails;

