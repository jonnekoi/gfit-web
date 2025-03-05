import { useEffect, useState } from "react";

const URL = "http://127.0.0.1:3000/v1";

const AllWorkouts = () => {
    const [workouts, setWorkouts] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [editableExercises, setEditableExercises] = useState([]);


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
    };

    const toggleReadOnly = () => {
        setIsReadOnly(!isReadOnly);
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



    if (!workouts) return <p>Loading...</p>;

    const dateFormatter = new Intl.DateTimeFormat("en-FI", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    return (
            <div className="grid grid-cols-4 gap-4">
                {workouts.map((workout) => (
                    <div onClick={() => toggleVisibility(workout)} key={workout.workout_id}
                         className="border rounded text-center text-white overflow-y-auto w-64 hover:cursor-pointer">
                        <div className="flex flex-row justify-center">
                            <h2 className="font-bold montserrat-text text-2xl mt-5">{workout.workout_name || "Unnamed Workout"}</h2>
                        </div>
                        <ul className="p-12">
                            {workout.exercises.slice(0, 3).map((exercise) => (
                                <li key={exercise.exercise_id} className="mt-2">
                                    <h3 className="font-semibold text-orange-500 montserrat-text rounded border border-orange-500 w-full">{exercise.exercise_name}</h3>
                                </li>

                            ))}
                        </ul>
                    </div>
                ))}
                {selectedWorkout && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="väribg text-white p-8 rounded max-w-4xl w-full text-center">
                            <h2 className="font-bold montserrat-text text-2xl pb-2">{selectedWorkout.workout_name || "Unnamed Workout"}</h2>
                            <p className="montserrat-text font-bold text-1xl"> Crafted {dateFormatter.format(new Date(selectedWorkout.workout_created_at))}</p>
                            <p className="montserrat-text m-2">{selectedWorkout.workout_type}</p>
                            <p className="montserrat-text m-2">{selectedWorkout.workout_description || "No description available"}</p>
                            <ul>
                                <div className="flex items-center justify-between text-black">
                                    <p className="poppins-text p-2 w-1/5 mr-4 text-white font-bold">Exercise</p>
                                    <p className="poppins-text p-2 w-1/5 mr-4 text-white font-bold">Description</p>
                                    <p className="poppins-text p-2 w-1/5 mr-4 text-white font-bold">Low Reps</p>
                                    <p className="poppins-text p-2 w-1/5 mr-4 text-white font-bold">Max Reps</p>
                                    <p className="poppins-text p-2 w-1/5 mr-4 text-white font-bold">Weight</p>
                                </div>
                                {editableExercises.map((exercise, index) => (
                                    <li key={exercise.exercise_id}
                                        className="mt-2 flex items-center justify-between text-black">
                                        <h3 className="font-semibold text-orange-500 montserrat-text p-2 w-1/5">{exercise.exercise_name}</h3>
                                        <p className="poppins-text p-2 w-1/5 text-white">{exercise.exercise_description}</p>
                                        <input
                                            type="number"
                                            value={exercise.low_reps}
                                            onChange={(e) => handleInputChange(index, "low_reps", e.target.value)}
                                            className="p-2 m-2 border rounded w-1/5"
                                            readOnly={isReadOnly}
                                        />
                                        <input
                                            type="number"
                                            value={exercise.max_reps}
                                            onChange={(e) => handleInputChange(index, "max_reps", e.target.value)}
                                            className="p-2 m-2 border rounded w-1/5"
                                            readOnly={isReadOnly}
                                        />
                                        <input
                                            type="number"
                                            value={exercise.weight}
                                            onChange={(e) => handleInputChange(index, "weight", e.target.value)}
                                            className="p-2 m-2 border rounded w-1/5"
                                            readOnly={isReadOnly}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-row">
                                <button onClick={toggleReadOnly}
                                        className="text-white bg-orange-500 font-bold p-2 m-2 w-full montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">
                                    {isReadOnly ? "Edit" : "Save"}
                                </button>
                                <button onClick={closeModal}
                                        className="text-white bg-orange-500 font-bold p-2 m-2 w-full montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    );
};

export default AllWorkouts;
