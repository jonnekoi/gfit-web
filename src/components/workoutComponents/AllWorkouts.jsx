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
    const token = sessionStorage.getItem("token");


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

    const saveWorkout = async (workoutId) => {
        try {
            const response = await fetch(URL + "/workouts", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
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
    }, []);

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

    const sortWorkouts = (sortBy) => {
        return () => {
            const sorted = [...workouts].sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return -1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return 1;
                }
                return 0;
            });
            (setWorkouts(sorted));
            setCurrentPage(0);
        };
    };

    return (
        <>
            <div className="w-2/3">
                <table className="w-full text-white montserrat-text">
                    <thead>
                    <tr className="border-b border-b-orange-500 text-2xl font-bold text-center">
                        <th onClick={sortWorkouts("workout_name")} className="p-5 cursor-pointer">Name <FontAwesomeIcon icon={faSort} className="text-1" /></th>
                        <th onClick={sortWorkouts("workout_type")} className="p-5 cursor-pointer">Type <FontAwesomeIcon icon={faSort} className="text-1" /></th>
                        <th onClick={sortWorkouts("workout_level")} className="p-5 cursor-pointer">Level <FontAwesomeIcon icon={faSort} className="text-1" /></th>
                        <th onClick={sortWorkouts("workout_created_at")} className="p-5 cursor-pointer">Crafted <FontAwesomeIcon icon={faSort} className="text-1" /></th>
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
                            <h2 className="font-bold montserrat-text text-2xl pb-2">
                                {selectedWorkout.workout_name || "Unnamed Workout"}
                            </h2>
                            <p className="montserrat-text font-bold text-1xl">
                                Crafted {formatDate(selectedWorkout.workout_created_at)}
                            </p>
                            <p className="montserrat-text m-2">{selectedWorkout.workout_type}</p>
                            <p className="montserrat-text m-2">
                                {selectedWorkout.workout_description || "No description available"}
                            </p>

                            <table className="w-full text-white">
                                <thead>
                                <tr className="text-white">
                                    <th className="p-3 ">Exercise</th>
                                    <th className="p-3 ">Description</th>
                                    {isReadOnly ? (
                                        <>
                                            <th className="m-2 montserrat-text p-5">Reps</th>
                                            <th className="m-2 montserrat-text p-5">Sets</th>
                                            <th className="m-2 montserrat-text p-5">Weight</th>
                                        </>
                                    ) : (
                                        <>
                                            <th className="m-2 montserrat-text p-5">Reps Low</th>
                                            <th className="m-2 montserrat-text p-5">Reps Max</th>
                                            <th className="m-2 montserrat-text p-5">Sets</th>
                                            <th className="m-2 montserrat-text p-5">Weight</th>
                                        </>
                                    )}
                                </tr>
                                </thead>
                                <tbody>
                                {editableExercises.map((exercise, index) => (
                                    <tr key={exercise.exercise_id} className="">
                                        <td className="m-2 poppins-text p-2 text-orange-500">
                                            {exercise.exercise_name}
                                        </td>
                                        <td className="m-2 poppins-text p-2">
                                            {exercise.exercise_description}
                                        </td>
                                        {isReadOnly ? (
                                            <>
                                                <td className="m-2 poppins-text p-2">
                                                    {exercise.low_reps} - {exercise.max_reps}
                                                </td>
                                                <td className="m-2 poppins-text p-2">
                                                    {exercise.sets}
                                                </td>
                                                <td className="m-2 poppins-text p-2">
                                                    {exercise.weight}
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        value={exercise.low_reps}
                                                        onChange={(e) =>
                                                            handleInputChange(index, "low_reps", e.target.value)
                                                        }
                                                        className="p-2 w-full rounded text-black"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        value={exercise.max_reps}
                                                        onChange={(e) =>
                                                            handleInputChange(index, "max_reps", e.target.value)
                                                        }
                                                        className="p-2 w-full rounded text-black"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        value={exercise.sets}
                                                        onChange={(e) =>
                                                            handleInputChange(index, "sets", e.target.value)
                                                        }
                                                        className="p-2 w-full rounded text-black"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        value={exercise.weight}
                                                        onChange={(e) =>
                                                            handleInputChange(index, "weight", e.target.value)
                                                        }
                                                        className="p-2 w-full rounded text-black"
                                                    />
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="flex flex-row mt-5">
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
