import { useState } from "react";

const WorkoutBuilder = ({ selectedExercises, onRemoveExercise, onSubmitWorkout, error, successMessage }) => {
    const [workoutName, setWorkoutName] = useState("");
    const [workoutType, setWorkoutType] = useState("");
    const [workoutLevel, setWorkoutLevel] = useState("");
    const [formError, setFormError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!workoutName) {
            setFormError("Add workout name");
            return;
        }
        if (!workoutType) {
            setFormError("Select workout type");
            return;
        }
        if (!workoutLevel) {
            setFormError("Select workout level");
            return;
        }

        const workoutDetails = {
            workoutName,
            workoutType,
            workoutLevel,
            exercises: selectedExercises
        };

        onSubmitWorkout(workoutDetails);
        setWorkoutName("");
        setWorkoutType("");
        setWorkoutLevel("");
        setFormError("");
    };

    return (
        <div className="w-full flex flex-col bg-gray-900/40 border border-orange-500/30 p-5 m-5 rounded-lg shadow-lg min-h-[300px]">
            <div className="flex flex-row mb-4 justify-center items-center gap-2">
                <input
                    value={workoutName}
                    className="border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 p-3 w-full focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                    onChange={(e) => setWorkoutName(e.target.value)}
                    type="text"
                    name="workoutName"
                    placeholder="Workout name..."
                />
                <select
                    className="border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 p-3 w-full focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                    name="workoutType"
                    value={workoutType}
                    onChange={(e) => setWorkoutType(e.target.value)}
                >
                    <option value="" disabled hidden>Workout Type</option>
                    <option value="Push">Push</option>
                    <option value="Pull">Pull</option>
                    <option value="Legs">Legs</option>
                    <option value="Full Body">Full Body</option>
                    <option value="Cardio">Cardio</option>
                </select>
                <select
                    className="border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 p-3 w-full focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                    name="level"
                    value={workoutLevel}
                    onChange={(e) => setWorkoutLevel(e.target.value)}
                >
                    <option value="" disabled hidden>Workout Level</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="text-white min-w-44 bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all duration-300 transform hover:scale-105"
                >
                    Add Workout
                </button>
            </div>

            <div className="w-full items-center flex flex-col">
                <div className="w-full space-y-2 max-h-96 overflow-y-auto pr-2">
                    {selectedExercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            className="w-full bg-gradient-to-r from-orange-600/80 to-orange-500/60 border border-orange-500/50 rounded-lg shadow-md flex flex-row justify-between items-center"
                        >
                            <div className="p-3 text-white text-left montserrat-text">
                                <strong>{exercise.name}</strong> - Reps: {exercise.reps_low} - {exercise.reps_max} /
                                Sets: {exercise.sets} / Weight: {exercise.weight}
                            </div>
                            <button
                                onClick={() => onRemoveExercise(exercise)}
                                className="text-white font-bold montserrat-text mr-5 hover:text-red-300 transition-colors px-3 py-1"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <div className="w-full flex justify-center mt-4">
                    {(formError || error) && (
                        <p className="text-red-400 montserrat-text bg-red-500/10 px-4 py-2 rounded-full">
                            {formError || error}
                        </p>
                    )}
                    {successMessage && (
                        <p className="text-green-400 montserrat-text bg-green-500/10 px-4 py-2 rounded-full">
                            {successMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkoutBuilder;
