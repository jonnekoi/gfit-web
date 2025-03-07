import { useEffect, useState } from "react";
import formatDate from "../../scripts/formatDate";
import {faSort} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const URL = "http://127.0.0.1:3000/v1";

const AllWorkouts = () => {
    const [workouts, setWorkouts] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [editableExercises, setEditableExercises] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;
    const [updateText, setUpdateText] = useState("");



    const fetchWorkouts = async () => {
        try {
            const response = await fetch(URL + "/workouts");
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

    const saveWorkout = async (workoutId) => {
        try {
            const response = await fetch(URL + "/workouts", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: workoutId, exercises: editableExercises }),
            });

            if (!response.ok) {
                throw new Error('Failed to save workout');
            }
            setUpdateText("Workout updated successfully");

        } catch (error) {
            console.error('Error saving workout:', error);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, [saveWorkout]);

    const toggleVisibility = (workout) => {
        setSelectedWorkout(workout);
        setEditableExercises(workout.exercises.map(exercise => ({ ...exercise })));
    };

    const closeModal = () => {
        setSelectedWorkout(null);
        setIsReadOnly(true);
        setUpdateText("");
    };

    const toggleEditMode = () => {
        if (!isReadOnly) {
            saveWorkout(selectedWorkout.workout_id);
        }
        setIsReadOnly(prev => !prev);
    };

    const handleInputChange = (index, field, value) => {
        const updatedExercises = [...editableExercises];
        updatedExercises[index][field] = value;
        setEditableExercises(updatedExercises);
    };

    const countWorkouts = (workouts) => {
        const totalWorkouts = workouts.length;
        const workoutTypeCounts = {};
        workoutTypeCounts["Total"] = totalWorkouts;

        workouts.forEach((workout) => {
            const type = workout.workout_type;
            if (workoutTypeCounts[type]) {
                workoutTypeCounts[type]++;
            } else {
                workoutTypeCounts[type] = 1;
            }
        });

    };

    if (workouts) {
        countWorkouts(workouts);
    }



    if (!workouts) return <div></div>;


    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleWorkouts = workouts.slice(startIndex, endIndex);

    const nextPage = () => {
        if (endIndex < workouts.length) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    return (
        <>
            <div className="w-2/3">
                <table className="w-full text-white montserrat-text">
                    <thead>
                    <tr className="border-b border-b-orange-500 text-2xl font-bold text-center">
                        <th className="p-5">Name <FontAwesomeIcon icon={faSort} className="text-1" /></th>
                        <th className="p-5">Type <FontAwesomeIcon icon={faSort} className="text-1" /></th>
                        <th className="p-5">Level <FontAwesomeIcon icon={faSort} className="text-1" /></th>
                        <th className="p-5">Crafted <FontAwesomeIcon icon={faSort} className="text-1" /></th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleWorkouts.map((workout, index) => (
                        <tr key={index} onClick={() => toggleVisibility(workout)}
                            className="cursor-pointer text-center">
                            <td className="p-4 border-b border-b-orange-500">{workout.workout_name}</td>
                            <td className="p-4 border-b border-b-orange-500">{workout.workout_type}</td>
                            <td className="p-4 border-b border-b-orange-500">{workout.workout_level}</td>
                            <td className="p-4 border-b border-b-orange-500">{formatDate(workout.workout_created_at)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4 text-white montserrat-text text-1xl">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 rounded ${currentPage === 0 ? "cursor-not-allowed" : "text-white"}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={endIndex >= workouts.length}
                        className={`px-4 py-2 rounded ${endIndex >= workouts.length ? "cursor-not-allowed" : "text-white"}`}
                    >
                        Next
                    </button>
                </div>
                {selectedWorkout && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55">
                        <div className="väribg text-white p-8 rounded max-w-4xl w-full text-center">
                            <h2 className="font-bold montserrat-text text-2xl pb-2">{selectedWorkout.workout_name || "Unnamed Workout"}</h2>
                            <p className="montserrat-text font-bold text-1xl"> Crafted {dateFormatter.format(new Date(selectedWorkout.workout_created_at))}</p>
                            <p className="montserrat-text m-2">{selectedWorkout.workout_type}</p>
                            <p className="montserrat-text m-2">{selectedWorkout.workout_description || "No description available"}</p>
                            <ul>
                                <div className="flex items-center justify-between text-black">
                                    <p className="poppins-text p-2 w-1/5  text-white font-bold">Exercise</p>
                                    <p className="poppins-text p-2 w-1/5  text-white font-bold">Description</p>
                                    {isReadOnly ? (
                                        <>
                                            <p className="poppins-text p-2 w-1/5  text-white font-bold">Reps</p>
                                            <p className="poppins-text p-2 w-1/5  text-white font-bold">Sets</p>
                                            <p className="poppins-text p-2 w-1/5  text-white font-bold">Weight</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="poppins-text p-2 w-1/6  text-white font-bold">Reps Low</p>
                                            <p className="poppins-text p-2 w-1/6  text-white font-bold">Reps Max</p>
                                            <p className="poppins-text p-2 w-1/6  text-white font-bold">Sets</p>
                                            <p className="poppins-text p-2 w-1/6  text-white font-bold">Weight</p>
                                        </>
                                    )}
                                            </div>
                                        {
                                            editableExercises.map((exercise, index) => (
                                    <li key={exercise.exercise_id}
                                        className="mb-4 flex items-center justify-between text-black">
                                        <h3 className="font-semibold text-orange-500 montserrat-text p-2 w-1/5">{exercise.exercise_name}</h3>
                                        <p className="poppins-text p-2 w-1/5 text-white">{exercise.exercise_description}</p>
                                        {isReadOnly ? (
                                            <>
                                                <p className="poppins-text p-2 w-1/5 text-white">{exercise.low_reps} - {exercise.max_reps}</p>
                                                <p className="poppins-text p-2 w-1/5 text-white">{exercise.sets}</p>
                                                <p className="poppins-text p-2 w-1/5 text-white">{exercise.weight}</p>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="number"
                                                    value={exercise.low_reps}
                                                    onChange={(e) => handleInputChange(index, 'low_reps', e.target.value)}
                                                    className="poppins-text p-2 w-1/6 m-1 rounded text-black"
                                                />
                                                <input
                                                    type="number"
                                                    value={exercise.max_reps}
                                                    onChange={(e) => handleInputChange(index, 'max_reps', e.target.value)}
                                                    className="poppins-text p-2 w-1/6 m-1 rounded text-black"
                                                />
                                                <input
                                                    type="number"
                                                    value={exercise.sets}
                                                    onChange={(e) => handleInputChange(index, 'sets', e.target.value)}
                                                    className="poppins-text p-2 w-1/6 m-1 rounded text-black"
                                                />
                                                <input
                                                    type="number"
                                                    value={exercise.weight}
                                                    onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                                                    className="poppins-text p-2 w-1/6 m-1 rounded text-black"
                                                />
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-row">
                                <button onClick={toggleEditMode}
                                        className="text-white bg-orange-500 font-bold p-2 m-2 w-full montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">
                                    {isReadOnly ? "Edit" : "Save"}
                                </button>
                                <button onClick={closeModal}
                                        className="text-white bg-orange-500 font-bold p-2 m-2 w-full montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">
                                    Close
                                </button>
                            </div>
                            {updateText && <p className="text-green-500 montserrat-text mt-5 text-1xl">{updateText}</p>}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AllWorkouts;
