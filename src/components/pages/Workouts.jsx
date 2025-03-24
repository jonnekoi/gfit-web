import { useState } from "react";
import AllWorkouts from "../workoutComponents/AllWorkouts.jsx";
import CreateWorkout from "../workoutComponents/CreateWorkout.jsx";
import WorkOutData from "../workoutComponents/WorkOutData.jsx";
import Button from "../../buttons/Button.jsx";

const Workouts = () => {
  const [activeSection, setActiveSection] = useState("All Workouts");
  const [error, setError] = useState("");

  const handleSectionClick = (section) => {
    setError("");
    setActiveSection(section);
  };

  const sections = ["All Workouts", "Data", "Craft Workouts"];

  return (
      <div className="w-full max-w-6xl flex flex-col items-center px-4">
        <nav className="flex flex-wrap justify-end gap-2 mt-5 w-full">
          {sections.map((section) => (
              <Button
                  key={section}
                  text={section}
                  active={activeSection === section}
                  onClick={() => handleSectionClick(section)}
              />
          ))}
        </nav>

        {error && (
            <div className="w-full mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-center font-bold bruno-ace-sc-regular text-lg md:text-xl">
                {error}
              </p>
            </div>
        )}

        <div className="flex w-full justify-center mt-5">
          {activeSection === "All Workouts" && <AllWorkouts />}
          {activeSection === "Craft Workouts" && <CreateWorkout />}
          {activeSection === "Data" && <WorkOutData />}
        </div>
      </div>
  );
}

export default Workouts;
