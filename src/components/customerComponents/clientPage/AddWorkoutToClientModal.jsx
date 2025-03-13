import { useEffect, useState } from "react";

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
            console.log("Workouts fetched:", workoutsArray);
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

    //TODO: WHEN ADDING A NEW EXERCISE TO USER WITHOUT EDITING IT, NOW NOT ADDING IT TO THE CLIENT

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
            const response = await fetch(URL + '/clients/workout/client/add', fetchOptions);
            if (response.status === 409) {
                setErrortext("Workout already exists. Edit it from the client page.");
                return;
            }
            setSelectedWorkout({ ...selectedWorkout, exercises: editedExercises });
            setIsEditMode(false);
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
                    <button
                        onClick={close}
                        className="text-gray-400 hover:text-white p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col space-y-4 mb-4">
                    <select
                        onChange={handleWorkoutChange}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                        <option value="">Select a workout</option>
                        {workouts.map((workout, index) => (
                            <option key={index} value={workout.workout_name}>{workout.workout_name}</option>
                        ))}
                    </select>
                    <select
                        onChange={handleDayChange}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                        <option value="">Select a day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>

                {selectedWorkout && (
                    <div className="overflow-y-auto flex-grow" style={{ maxHeight: "calc(90vh - 240px)" }}>
                        <h3 className="text-xl font-bold montserrat-text mb-3 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent sticky top-0 bg-gray-900/90 py-2">
                            Exercises
                        </h3>

                        <div className="rounded-lg border border-gray-700/50">
                            <table className="w-full text-white">
                                <thead className="sticky top-0 bg-gray-900/95">
                                <tr className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 text-lg font-medium">
                                    <th className="p-3 text-left">Exercise</th>
                                    {isEditMode ? (
                                        <>
                                            <th className="p-3 text-center">Reps Low</th>
                                            <th className="p-3 text-center">Reps Max</th>
                                        </>
                                    ) : (
                                        <th className="p-3 text-center">Reps</th>
                                    )}
                                    <th className="p-3 text-center">Weight</th>
                                    <th className="p-3 text-center">Sets</th>
                                    <th className="p-3 text-center">Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {editedExercises.map((exercise, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'} transition-colors`}
                                    >
                                        <td className="p-3 poppins-text font-medium text-orange-400">
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    value={exercise.exercise_name || ""}
                                                    onChange={(e) => handleInputChange(index, "exercise_name", e.target.value)}
                                                    className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Exercise name"
                                                />
                                            ) : (
                                                exercise.exercise_name
                                            )}
                                        </td>

                                        {isEditMode ? (
                                            <>
                                                <td className="p-3">
                                                    <input
                                                        type="number"
                                                        value={exercise.low_reps || 0}
                                                        onChange={(e) => handleInputChange(index, "low_reps", e.target.value)}
                                                        className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="number"
                                                        value={exercise.max_reps || 0}
                                                        onChange={(e) => handleInputChange(index, "max_reps", e.target.value)}
                                                        className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    />
                                                </td>
                                            </>
                                        ) : (
                                            <td className="p-3 poppins-text text-center">
                                                    <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">
                                                        {`${exercise.low_reps || 0} - ${exercise.max_reps || 0}`}
                                                    </span>
                                            </td>
                                        )}

                                        <td className="p-3 poppins-text text-center">
                                            {isEditMode ? (
                                                <input
                                                    type="number"
                                                    value={exercise.weight || 0}
                                                    onChange={(e) => handleInputChange(index, "weight", e.target.value)}
                                                    className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <span className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">
                                                        {exercise.weight || 0} kg
                                                    </span>
                                            )}
                                        </td>

                                        <td className="p-3 poppins-text text-center">
                                            {isEditMode ? (
                                                <input
                                                    type="number"
                                                    value={exercise.sets || 0}
                                                    onChange={(e) => handleInputChange(index, "sets", e.target.value)}
                                                    className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">
                                                        {exercise.sets || 0}
                                                    </span>
                                            )}
                                        </td>

                                        <td className="p-3 poppins-text text-center">
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    value={exercise.descrip || ""}
                                                    onChange={(e) => handleInputChange(index, "descrip", e.target.value)}
                                                    className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Add description"
                                                />
                                            ) : (
                                                <span className="text-sm text-gray-300">
                                                        {exercise.descrip || "No description"}
                                                    </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {isEditMode && (
                                    <tr className="border-t border-gray-700/50">
                                        <td colSpan={6} className="p-3">
                                            <button
                                                onClick={addNewExercise}
                                                className="w-full py-2 flex items-center justify-center text-orange-400 hover:text-orange-300 hover:bg-gray-800/30 rounded-md transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Add New Exercise
                                            </button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 mb-2 text-center">
                            <h4 className="text-lg font-medium text-orange-400 mb-2">Workout Description</h4>
                            {isEditMode ? (
                                <textarea
                                    placeholder="Add workout description..."
                                    value={workoutDescription}
                                    onChange={(e) => setWorkoutDescription(e.target.value)}
                                    className="w-full min-h-16 p-3 border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                                />
                            ) : (
                                <div className="p-3 rounded-lg bg-gray-800/20 text-gray-200 min-h-12">
                                    {workoutDescription || "No workout description available"}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex flex-row mt-6 gap-4">
                    {selectedWorkout && (
                        <button
                            onClick={toggleEditMode}
                            className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 w-full bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all"
                        >
                            {isEditMode ? "Cancel" : "Customize"}
                        </button>
                    )}
                    {isEditMode && (
                        <button
                            onClick={handleSave}
                            className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 w-full bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all"
                        >
                        Save
                        </button>
                    )}

                    <button
                        onClick={close}
                        className="text-orange-500 bg-transparent font-bold p-3 w-full bruno-ace-sc-regular rounded-lg border border-orange-500/50 hover:bg-orange-500/10"
                    >
                        Exit
                    </button>
                </div>

                {errortext && (
                    <div className="mt-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 montserrat-text text-center font-medium">{errortext}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddWorkoutToClientModal;
