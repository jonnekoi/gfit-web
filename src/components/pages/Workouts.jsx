import {useState} from "react";
import AllWorkouts from "../workoutComponents/AllWorkouts.jsx";
import CreateWorkout from "../workoutComponents/CreateWorkout.jsx";

const Workouts = () => {
    const [activeSection, setActiveSection] = useState(null);

    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? null : section));
        console.log(activeSection);
    };

    return (
        <div className="flex w-full flex-col items-center">
            <nav className="space-x-5 mt-5">
                {["All Workouts", "Craft Workouts"].map((section) => (
                    section === "Craft Workouts" ? (
                        <button
                            key={section}
                            className="text-white font-bold bg-orange-500 montserrat-text text-1xl border border-orange-500 p-2 rounded"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    ) : (
                        <button
                            key={section}
                            className="text-white font-bold montserrat-text text-1xl border border-orange-500 p-2 rounded hover:border-orange-300"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    )
                ))}
            </nav>
            <div className="flex justify-center mt-5 w-full">
                {activeSection === "All Workouts" && (<AllWorkouts/>)}
                {activeSection === "Craft Workouts" && (<CreateWorkout/>)}
            </div>
        </div>
    )
}

export default Workouts;
