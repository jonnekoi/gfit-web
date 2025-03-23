import { useState } from "react";
import ButtonNoHover from "../../../buttons/ButtonNoHover.jsx";

const ExerciseSearch = ({ exercises, onSelectExercise, onAddNewExercise }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="w-full flex flex-wrap justify-center bg-gray-900/40 border border-orange-500/30 p-5 m-5 rounded-lg shadow-lg min-h-[300px]">
            <div className="w-full max-h-12 flex space-x-4 justify-center m-2">
                <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 w-full p-3 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                />
                <ButtonNoHover
                    onClick={onAddNewExercise}
                    text="Add Exercise">
                </ButtonNoHover>
            </div>
          <div className="w-full flex flex-wrap justify-center mt-4">
            {filteredExercises.map((exercise) => (
                <button
                    onClick={() => onSelectExercise(exercise)}
                    key={exercise.id}
                    className="m-2 text-white p-3 text-center montserrat-text border border-orange-500/60 bg-gray-800/40 rounded-lg w-32 h-24 hover:bg-orange-500/20 transition-colors flex items-center justify-center"
                >
                  <span
                      className="overflow-hidden text-sm">{exercise.name}</span>
                </button>
            ))}
          </div>
        </div>
    );
};

export default ExerciseSearch;
