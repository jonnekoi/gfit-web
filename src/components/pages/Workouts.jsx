import {useState} from "react";
import AllWorkouts from "../workoutComponents/AllWorkouts.jsx";
import CreateWorkout from "../workoutComponents/CreateWorkout.jsx";
import WorkOutData from "../workoutComponents/WorkOutData.jsx";

const Workouts = () => {
    const [activeSection, setActiveSection] = useState("All Workouts");

    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? prevSection : section));
    };

    return (
        <div className="w-full justify-center flex flex-col items-center border-t">
            <nav className="space-x-5 mt-5">
                {["All Workouts", "Data", "Craft Workouts"].map((section) => (
                        <button
                            key={section}
                            className="text-white min-w-44 bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    )
                )}
            </nav>
            <div className="flex w-full justify-center mt-5">
                {activeSection === "All Workouts" && (<AllWorkouts/>)}
                {activeSection === "Craft Workouts" && (<CreateWorkout/>)}
                {activeSection === "Data" && (<WorkOutData/>)}
            </div>
        </div>
    )
}

export default Workouts;
