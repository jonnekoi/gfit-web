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
            }
            setSelectedWorkout({ ...selectedWorkout, exercises: editedExercises });
            setIsEditMode(false);
        } catch (error) {
            console.error("Error saving exercises:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55">
            <div className="väribg text-white p-8 rounded max-w-4xl w-full text-center">
                <select onChange={handleWorkoutChange} className="text-black w-full p-2 rounded">
                    {workouts.map((workout, index) => (
                        <option key={index} value={workout.workout_name}>{workout.workout_name}</option>
                    ))}
                </select>
                {selectedWorkout && (
                    <div className="mt-5">
                        <h3 className="text-xl font-bold">Exercises</h3>
                        <table className="w-full">
                            <thead>
                            <tr>
                                <th className="m-2 montserrat-text p-5">Exercise</th>
                                {isEditMode ? (
                                    <>
                                        <th className="montserrat-text p-5">Reps Low</th>
                                        <th className="montserrat-text p-5">Reps Max</th>
                                    </>
                                ) : (
                                    <th className="m-2 montserrat-text p-5">Reps</th>
                                )}
                                <th className="m-2 montserrat-text p-5">Weight</th>
                                <th className="m-2 montserrat-text p-5">Sets</th>
                            </tr>
                            </thead>
                            <tbody>
                            {editedExercises.map((exercise, index) => (
                                <tr key={index}>
                                    <td className="m-2 poppins-text p-2 text-orange-500">{exercise.exercise_name}</td>
                                    {isEditMode ? (
                                        <>
                                            <td className="m-2 poppins-text p-2">
                                                <input
                                                    type="number"
                                                    value={exercise.low_reps}
                                                    onChange={(e) => handleInputChange(index, "low_reps", e.target.value)}
                                                    className="p-2 w-full rounded text-black"
                                                />
                                            </td>
                                            <td className="m-2 poppins-text p-2">
                                                <input
                                                    type="number"
                                                    value={exercise.max_reps}
                                                    onChange={(e) => handleInputChange(index, "max_reps", e.target.value)}
                                                    className="p-2 w-full rounded text-black"
                                                />
                                            </td>
                                        </>
                                    ) : (
                                        <td className="m-2 poppins-text p-2">
                                            {`${exercise.low_reps} - ${exercise.max_reps}`}
                                        </td>
                                    )}
                                    <td className="m-2 poppins-text p-2">
                                        {isEditMode ? (
                                            <input
                                                type="number"
                                                value={exercise.weight}
                                                onChange={(e) => handleInputChange(index, "weight", e.target.value)}
                                                className="p-2 w-full rounded text-black"
                                            />
                                        ) : (
                                            exercise.weight
                                        )}
                                    </td>
                                    <td className="m-2 poppins-text p-2">
                                        {isEditMode ? (
                                            <input
                                                type="number"
                                                value={exercise.sets}
                                                onChange={(e) => handleInputChange(index, "sets", e.target.value)}
                                                className="p-2 w-full rounded text-black"
                                            />
                                        ) : (
                                            exercise.sets
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex flex-row mt-5">
                    <button onClick={toggleEditMode}
                            className="text-white bg-orange-500 font-bold p-2 m-2 w-full montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">
                        {isEditMode ? "Cancel" : "Customize"}
                    </button>
                    {isEditMode && (
                        <button onClick={handleSave}
                                className="text-white bg-orange-500 font-bold p-2 m-2 w-full montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">
                            Save
                        </button>
                    )}
                    <button onClick={close}
                            className="text-white bg-orange-500 font-bold p-2 m-2 w-full montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">
                        Exit
                    </button>
                </div>
                {errortext && (
                    <p className="text-red-500 montserrat-text">{errortext}</p>
                )}
            </div>
        </div>
    );
};

export default AddWorkoutToClientModal;
