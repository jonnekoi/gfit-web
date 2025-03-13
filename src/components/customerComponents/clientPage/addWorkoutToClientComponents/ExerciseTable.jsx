const ExerciseTable = ({ exercises, isEditMode, handleInputChange, addNewExercise }) => {
    return (
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
                {exercises.map((exercise, index) => (
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
    );
};

export default ExerciseTable;
