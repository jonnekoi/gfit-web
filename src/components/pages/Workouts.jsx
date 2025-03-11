import {useState} from "react";
import AllWorkouts from "../workoutComponents/AllWorkouts.jsx";
import CreateWorkout from "../workoutComponents/CreateWorkout.jsx";
import WorkOutData from "../workoutComponents/WorkOutData.jsx";
import Button from "../../buttons/Button.jsx";

const Workouts = () => {
    const [activeSection, setActiveSection] = useState("All Workouts");

    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? prevSection : section));
    };

    return (
        <div className="w-full justify-center flex flex-col items-center border-t">
            <nav className="space-x-5 mt-5">
                {["All Workouts", "Data", "Craft Workouts"].map((section) => (
                        <Button
                            text={section}
                            key={section}
                            onClick={() => handleSectionClick(section)}>{section}
                        </Button>
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
