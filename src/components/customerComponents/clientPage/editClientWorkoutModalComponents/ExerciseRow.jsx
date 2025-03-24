import React from 'react';

const ExerciseRow = ({ exercise, index, isEditMode, handleInputChange, handleDeleteRow }) => {
    return (
        <tr className={`${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'} transition-colors`}>
            <td className="p-3 poppins-text font-medium text-orange-400">
                {isEditMode ? (
                    <input
                        type="text"
                        value={exercise.name || ""}
                        onChange={(e) => handleInputChange(index, "name", e.target.value)}
                        className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Exercise name"
                    />
                ) : (
                    exercise.name
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
          {isEditMode && (
              <td>
                <button
                    onClick={() => handleDeleteRow(index)}
                    className="text-white font-bold montserrat-text mr-5 hover:text-red-300 transition-colors px-3 py-1"
                >
                  X
                </button>
              </td>
          )}
        </tr>
    );
};

export default ExerciseRow;
