import formatDate from "../../scripts/formatDate.js";
import ErrorMessage from "../customerComponents/clientPage/addWorkoutToClientComponents/ErrorMessage.jsx";

const SelectedWorkoutModal = ({ selectedWorkout, editableExercises, isReadOnly, closeModal, handleInputChange, toggleEditMode, updateText, errorText }) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto p-4">
            <div
                className="bg-gray-900/90 text-white p-6 rounded-xl w-full max-w-6xl shadow-2xl border border-orange-500/30 flex flex-col max-h-[90vh]">
                <div className="text-center mb-6">
                    <h2 className="font-bold montserrat-text text-3xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent pb-2">
                        {selectedWorkout.workout_name || "Unnamed Workout"}
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-gray-300">
                        <p className="montserrat-text font-medium">
                            <span
                                className="text-orange-300">Crafted</span> {formatDate(selectedWorkout.workout_created_at)}
                        </p>
                        <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm font-medium text-orange-300">
                    {selectedWorkout.workout_type}
                </span>
                    </div>
                    <p className="montserrat-text mt-4 max-w-2xl mx-auto text-gray-300 italic">
                        {selectedWorkout.workout_description || "No description available"}
                    </p>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-700/50">
                    <table className="w-full text-white">
                        <thead>
                        <tr className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 text-lg font-medium">
                            <th className="p-4 text-left">Exercise</th>
                            <th className="p-4 text-left">Description</th>
                            {isReadOnly ? (
                                <>
                                    <th className="p-4 text-center">Reps</th>
                                    <th className="p-4 text-center">Sets</th>
                                    <th className="p-4 text-center">Weight</th>
                                </>
                            ) : (
                                <>
                                    <th className="p-4 text-center">Reps Low</th>
                                    <th className="p-4 text-center">Reps Max</th>
                                    <th className="p-4 text-center">Sets</th>
                                    <th className="p-4 text-center">Weight</th>
                                </>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {editableExercises.map((exercise, index) => (
                            <tr key={exercise.exercise_id}
                                className={`${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'} transition-colors`}>
                                <td className="p-4 poppins-text font-medium text-orange-400">
                                    {exercise.exercise_name}
                                </td>
                                <td className="p-4 poppins-text text-gray-300">
                                    {exercise.exercise_description}
                                </td>
                                {isReadOnly ? (
                                    <>
                                        <td className="p-4 poppins-text text-center">
                                        <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">
                                            {exercise.low_reps} - {exercise.max_reps}
                                        </span>
                                        </td>
                                        <td className="p-4 poppins-text text-center">
                                        <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">
                                            {exercise.sets}
                                        </span>
                                        </td>
                                        <td className="p-4 poppins-text text-center">
                                        <span className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">
                                            {exercise.weight} kg
                                        </span>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                value={exercise.low_reps}
                                                onChange={(e) =>
                                                    handleInputChange(index, "low_reps", e.target.value)
                                                }
                                                className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                value={exercise.max_reps}
                                                onChange={(e) =>
                                                    handleInputChange(index, "max_reps", e.target.value)
                                                }
                                                className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                value={exercise.sets}
                                                onChange={(e) =>
                                                    handleInputChange(index, "sets", e.target.value)
                                                }
                                                className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                value={exercise.weight}
                                                onChange={(e) =>
                                                    handleInputChange(index, "weight", e.target.value)
                                                }
                                                className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-row mt-6 gap-4">
                    <button
                        onClick={toggleEditMode}
                        className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 w-full bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105"
                    >
                        {isReadOnly ? "Edit Workout" : "Save Changes"}
                    </button>
                    <button
                        onClick={closeModal}
                        className="text-orange-500 bg-transparent font-bold p-2 flex-1 bruno-ace-sc-regular rounded-lg border border-orange-500/50 hover:bg-orange-500/10"
                    >
                        Exit
                    </button>
                </div>

                {updateText && (
                    <div className="mt-5 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 montserrat-text text-center font-medium">{updateText}</p>
                    </div>
                )}
                {errorText && <ErrorMessage message={errorText} />}
            </div>
        </div>
    )
}

export default SelectedWorkoutModal;
