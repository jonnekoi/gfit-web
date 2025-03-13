"use client";
import { useState, useEffect } from "react";
import {addExerciseApi, addWorkoutApi, fetchExercisesApi} from "./createWorkoutComponents/workoutAPI.js";
import ExerciseSearch from "./createWorkoutComponents/ExerciseSearch.jsx";
import AddExerciseForm from "./createWorkoutComponents/AddExerciseForm.jsx";
import ExerciseDetails from "./createWorkoutComponents/ExerciseDetails.jsx";
import WorkoutBuilder from "./createWorkoutComponents/WorkoutBuilder.jsx";

const CreateWorkout = () => {
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [addExercise, setAddExercise] = useState(false);
    const [error, setError] = useState("");
    const [workoutAddedText, setWorkoutAddedText] = useState("");
    const token = sessionStorage.getItem("token");

    const loadExercises = async () => {
        try {
            const data = await fetchExercisesApi(token);
            if (data && data.response && data.response.status === 403) {
                return;
            }
            setExercises(data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };



    useEffect(() => {
        loadExercises();
    }, []);

    if (!exercises) {
        return <p>Loading...</p>;
    }

    const handleMoveExercise = (exercise) => {
        setCurrentExercise(exercise);
        setAddExercise(false);
        setError("");
    };

    const handleAddToWorkout = (exerciseWithDetails) => {
        setExercises(exercises.filter((ex) => ex.id !== exerciseWithDetails.id));
        setSelectedExercises([...selectedExercises, exerciseWithDetails]);
        setCurrentExercise(null);
    };

    const handleCreateNewExercise = () => {
        setAddExercise(true);
        setCurrentExercise(null);
        setError("");
    };

    const handleAddNewExercise = async (newExercise) => {
        try {
            const response = await addExerciseApi(newExercise, token);
            if (response.status === 201) {
                setExercises((prevExercises) => [...prevExercises, newExercise]);
                setAddExercise(false);
            }
        } catch (error) {
            console.error("Error adding exercise:", error);
        }
    };

    const handleMoveBackToExercises = (exercise) => {
        if (!exercises.some(ex => ex.id === exercise.id)) {
            setExercises([...exercises, exercise]);
        }
        setSelectedExercises(selectedExercises.filter((ex) => ex.id !== exercise.id));
        setCurrentExercise(null);
    };

    const handleSubmitWorkout = async (workoutDetails) => {
        try {
            const response = await addWorkoutApi(workoutDetails, token);
            if (response.status === 201) {
                selectedExercises.forEach((exercise) => {
                    setExercises((prevExercises) => [...prevExercises, exercise]);
                });
                setSelectedExercises([]);
                setError("");
                setWorkoutAddedText("Workout added!");
            }
        } catch (error) {
            console.error("Error adding workout:", error);
            setError("Failed to add workout");
        }
    };

    return (
        <div className="flex w-full gap-5">
            <ExerciseSearch
                exercises={exercises}
                onSelectExercise={handleMoveExercise}
                onAddNewExercise={handleCreateNewExercise}
            />

            {addExercise && (
                <AddExerciseForm onSubmit={handleAddNewExercise} />
            )}

            {currentExercise && (
                <ExerciseDetails
                    exercise={currentExercise}
                    onAddToWorkout={handleAddToWorkout}
                    onMoveBack={handleMoveBackToExercises}
                />
            )}

            <WorkoutBuilder
                selectedExercises={selectedExercises}
                onRemoveExercise={handleMoveBackToExercises}
                onSubmitWorkout={handleSubmitWorkout}
                error={error}
                successMessage={workoutAddedText}
            />
        </div>
    );
};

export default CreateWorkout;
