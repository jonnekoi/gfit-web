import ExerciseRow from "./ExerciseRow.jsx";

const ExerciseTable = ({ exercises, isEditMode, handleInputChange, addNewExercise }) => {
    return (
        <div className="rounded-lg overflow-hidden border border-gray-700/50">
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
                    <ExerciseRow
                        key={index}
                        exercise={exercise}
                        index={index}
                        isEditMode={isEditMode}
                        handleInputChange={handleInputChange}
                    />
                ))}

                {isEditMode && (
                    <tr className="border-t border-gray-700/50">
                        <td colSpan={6} className="p-3">
                            <button
                                onClick={addNewExercise}
                                className="w-full py-2 flex items-center justify-center text-orange-400 hover:text-orange-300 hover:bg-gray-800/30 rounded-md transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 4v16m8-8H4"/>
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
