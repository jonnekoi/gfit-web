import formatDate from "../../scripts/formatDate.js";

const SelectedWorkoutModal = ({ selectedWorkout, editableExercises, isReadOnly, closeModal, handleInputChange, toggleEditMode, updateText }) => {

    return (
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
                            className="text-white bg-orange-500 font-bold p-2 m-2 w-full bruno-ace-sc-regular text-1xl border border-orange-500 rounded hover:border-orange-300">
                        {isReadOnly ? "Edit" : "Save"}
                    </button>
                    <button onClick={closeModal}
                            className="text-white bg-orange-500 font-bold p-2 m-2 w-full bruno-ace-sc-regular text-1xl border border-orange-500 rounded hover:border-orange-300">
                        Close
                    </button>
                </div>
                {updateText && <p className="text-green-500 montserrat-text mt-5 text-1xl">{updateText}</p>}
            </div>
        </div>
    )
}

export default SelectedWorkoutModal;
