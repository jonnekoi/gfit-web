import { useState } from "react";
import ActionButtons from "./editClientWorkoutModalComponents/ActionButtons.jsx";
import WorkoutDescription from "./editClientWorkoutModalComponents/WorkoutDescription.jsx";
import ExerciseTable from "./editClientWorkoutModalComponents/ExerciseTable.jsx";
import {saveWorkout} from "./editClientWorkoutModalComponents/WorkoutService.js";
import WorkoutHeader from "./editClientWorkoutModalComponents/WorkoutHeader.jsx";

const EditClientWorkoutModal = ({ workout, userId, closeModal }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedExercises, setEditedExercises] = useState(workout.exercises || []);
    const [selectedDay, setSelectedDay] = useState(workout.day);
    const [exercises, setExercises] = useState(workout.exercises);
    const [workoutDescription, setWorkoutDescription] = useState(workout.description || "");

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
        if (!isEditMode) {
            setEditedExercises([...exercises]);
        }
    };

    const handleSave = async () => {
        const savedWorkout = {
            client_id: userId,
            workout_id: workout.id,
            exercises: editedExercises,
            workout_day: selectedDay,
        };

        const success = await saveWorkout(savedWorkout);
        if (success) {
            setIsEditMode(false);
            setExercises([...editedExercises]);
        }
    };

    const addNewExercise = () => {
        const newExercise = {
            name: "New Name",
            low_reps: 0,
            max_reps: 0,
            weight: "0",
            sets: 0,
            descrip: ""
        };

        setExercises([...exercises, newExercise]);
        setEditedExercises([...editedExercises, newExercise]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedExercises = [...editedExercises];
        if (field === "low_reps" || field === "max_reps" || field === "sets" || field === "weight") {
            updatedExercises[index][field] = Number(value);
        } else {
            updatedExercises[index][field] = value;
        }

        setEditedExercises(updatedExercises);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto p-4">
            <div className="bg-gray-900/90 text-white p-6 rounded-xl w-full max-w-6xl shadow-2xl border border-orange-500/30 flex flex-col max-h-[90vh]">
                <WorkoutHeader
                    workout={workout}
                    isEditMode={isEditMode}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    closeModal={closeModal}
                />

                <div className="overflow-y-auto flex-grow" style={{maxHeight: "calc(90vh - 180px)"}}>
                    <h3 className="text-xl font-bold montserrat-text mb-3 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent sticky top-0 bg-gray-900/90 py-2">
                        Exercises
                    </h3>

                    <ExerciseTable
                        exercises={isEditMode ? editedExercises : exercises}
                        isEditMode={isEditMode}
                        handleInputChange={handleInputChange}
                        addNewExercise={addNewExercise}
                    />

                    <WorkoutDescription
                        isEditMode={isEditMode}
                        workout={workout}
                        workoutDescription={workoutDescription}
                        setWorkoutDescription={setWorkoutDescription}
                    />
                </div>

                <ActionButtons
                    isEditMode={isEditMode}
                    toggleEditMode={toggleEditMode}
                    handleSave={handleSave}
                    closeModal={closeModal}
                />
            </div>
        </div>
    );
};

export default EditClientWorkoutModal;
