import { useEffect, useState } from "react";
import WorkoutSelector from "./addWorkoutToClientComponents/WorkoutSelector.jsx";
import ExerciseTable from "./addWorkoutToClientComponents/ExerciseTable.jsx";
import WorkoutDescription from "./addWorkoutToClientComponents/WorkoutDescription.jsx";
import ModalFooter from "./addWorkoutToClientComponents/ModalFooter.jsx";
import ErrorMessage from "./addWorkoutToClientComponents/ErrorMessage.jsx";

const URL = "http://localhost:3000/v1";

const AddWorkoutToClientModal = ({ userId, close }) => {
    const token = sessionStorage.getItem('token');
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedExercises, setEditedExercises] = useState([]);
    const [errortext, setErrortext] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [workoutDescription, setWorkoutDescription] = useState("");

    const fetchWorkouts = async () => {
        try {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            };
            const response = await fetch(URL + "/workouts", fetchOptions);
            const data = await response.json();

            const workoutsArray = Object.entries(data).map(([key, value]) => ({
                workout_name: key,
                ...value,
            }));

            setWorkouts(workoutsArray);
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleWorkoutChange = (event) => {
        const workoutName = event.target.value;
        const workout = workouts.find(w => w.workout_name === workoutName);
        setSelectedWorkout(workout);
        setErrortext("");
        if (workout) {
            setEditedExercises(workout.exercises || []);
            setWorkoutDescription(workout.description || "");
        }
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
        if (!isEditMode && selectedWorkout) {
            setEditedExercises(selectedWorkout.exercises || []);
        }
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

    const handleSave = async () => {
        try {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: userId,
                    workout_id: selectedWorkout.workout_id,
                    exercises: editedExercises,
                    workout_day: selectedDay,
                    description: workoutDescription
                }),
            };
            const response = await fetch(URL + '/clients/workout/client', fetchOptions);
            if (response.status === 409) {
                setErrortext("That workout already exists for this day, edit it instead.");
                return;
            }

            setSelectedWorkout({ ...selectedWorkout, exercises: editedExercises });
            setIsEditMode(false);
            //TODO: WHEN ADDED NEED TO REFRESH THE WORKOUT CALENDER TO SHOW THE ADDED WORKOUT
            close();
        } catch (error) {
            console.error("Error saving exercises:", error);
        }
    };

    const addNewExercise = () => {
        const newExercise = {
            exercise_name: "Name",
            low_reps: 0,
            max_reps: 0,
            weight: 0,
            sets: 0,
            descrip: ""
        };

        setEditedExercises([...editedExercises, newExercise]);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto p-4">
            <div className="bg-gray-900/90 text-white p-6 rounded-xl w-full max-w-6xl shadow-2xl border border-orange-500/30 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold montserrat-text bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                        Add Workout
                    </h3>
                </div>

                <WorkoutSelector
                    workouts={workouts}
                    handleWorkoutChange={handleWorkoutChange}
                    handleDayChange={handleDayChange}
                />

                {selectedWorkout && (
                    <div className="overflow-y-auto flex-grow" style={{ maxHeight: "calc(90vh - 240px)" }}>
                        <h3 className="text-xl font-bold montserrat-text mb-3 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent sticky top-0 bg-gray-900/90 py-2">
                            Exercises
                        </h3>

                        <ExerciseTable
                            exercises={editedExercises}
                            isEditMode={isEditMode}
                            handleInputChange={handleInputChange}
                            addNewExercise={addNewExercise}
                        />

                        <WorkoutDescription
                            isEditMode={isEditMode}
                            workoutDescription={workoutDescription}
                            setWorkoutDescription={setWorkoutDescription}
                        />
                    </div>
                )}

                <ModalFooter
                    selectedWorkout={selectedWorkout}
                    isEditMode={isEditMode}
                    toggleEditMode={toggleEditMode}
                    handleSave={handleSave}
                    close={close}
                />

                {errortext && <ErrorMessage message={errortext} />}
            </div>
        </div>
    );
};

export default AddWorkoutToClientModal;
