import { useEffect, useState } from "react";

const URL = "http://localhost:3000/v1";

const AddWorkoutToClientModal = ({ userId, close }) => {
    const token = sessionStorage.getItem('token');
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedExercises, setEditedExercises] = useState([]);
    const [errortext, setErrortext] = useState("");

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
        setEditedExercises(workout.exercises);
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
        if (!isEditMode) {
            setEditedExercises(selectedWorkout.exercises);
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedExercises = [...editedExercises];
        updatedExercises[index][field] = value;
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
                    exercises: editedExercises
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

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
            <div
                className="bg-gray-900/90 text-white p-8 rounded-xl max-w-4xl w-full shadow-2xl border border-orange-500/30">
                <select
                    onChange={handleWorkoutChange}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                    {workouts.map((workout, index) => (
                        <option key={index} value={workout.workout_name}>{workout.workout_name}</option>
                    ))}
                </select>

                {selectedWorkout && (
                    <div className="mt-6">
                        <h3 className="text-xl font-bold montserrat-text mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                            Exercises
                        </h3>

                        <div className="overflow-hidden rounded-lg border border-gray-700/50">
                            <table className="w-full text-white">
                                <thead>
                                <tr className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 text-lg font-medium">
                                    <th className="p-4 text-left">Exercise</th>
                                    {isEditMode ? (
                                        <>
                                            <th className="p-4 text-center">Reps Low</th>
                                            <th className="p-4 text-center">Reps Max</th>
                                        </>
                                    ) : (
                                        <th className="p-4 text-center">Reps</th>
                                    )}
                                    <th className="p-4 text-center">Weight</th>
                                    <th className="p-4 text-center">Sets</th>
                                </tr>
                                </thead>
                                <tbody>
                                {editedExercises.map((exercise, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'} transition-colors`}
                                    >
                                        <td className="p-4 poppins-text font-medium text-orange-400">
                                            {exercise.exercise_name}
                                        </td>

                                        {isEditMode ? (
                                            <>
                                                <td className="p-3">
                                                    <input
                                                        type="number"
                                                        value={exercise.low_reps}
                                                        onChange={(e) => handleInputChange(index, "low_reps", e.target.value)}
                                                        className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="number"
                                                        value={exercise.max_reps}
                                                        onChange={(e) => handleInputChange(index, "max_reps", e.target.value)}
                                                        className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    />
                                                </td>
                                            </>
                                        ) : (
                                            <td className="p-4 poppins-text text-center">
                                            <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">
                                                {`${exercise.low_reps} - ${exercise.max_reps}`}
                                            </span>
                                            </td>
                                        )}

                                        <td className="p-4 poppins-text text-center">
                                            {isEditMode ? (
                                                <input
                                                    type="number"
                                                    value={exercise.weight}
                                                    onChange={(e) => handleInputChange(index, "weight", e.target.value)}
                                                    className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <span className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">
                                                {exercise.weight} kg
                                            </span>
                                            )}
                                        </td>

                                        <td className="p-4 poppins-text text-center">
                                            {isEditMode ? (
                                                <input
                                                    type="number"
                                                    value={exercise.sets}
                                                    onChange={(e) => handleInputChange(index, "sets", e.target.value)}
                                                    className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">
                                                {exercise.sets}
                                            </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="flex flex-row mt-6 gap-4">
                    <button
                        onClick={toggleEditMode}
                        className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 w-full bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105"
                    >
                        {isEditMode ? "Cancel" : "Customize"}
                    </button>

                    {isEditMode && (
                        <button
                            onClick={handleSave}
                            className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 w-full bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105"
                        >
                            Save
                        </button>
                    )}

                    <button
                        onClick={close}
                        className="text-orange-500 bg-transparent font-bold p-3 w-full bruno-ace-sc-regular rounded-lg border border-orange-500/50 hover:bg-orange-500/10 transition-all transform hover:scale-105"
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
