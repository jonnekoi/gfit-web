import React from 'react';

const WorkoutCard = ({ workout, index }) => {
    return (
        <tr className={`transition-colors hover:bg-orange-500/10 cursor-pointer ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'}`}>
            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                {workout.name}
            </td>
            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm">
                    {workout.type}
                </span>
            </td>
            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                <span className={`px-3 py-1 rounded-full text-sm ${
                    workout.level === 'Easy' ? 'bg-green-500/20 text-green-300' :
                        workout.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                }`}>
                    {workout.level}
                </span>
            </td>
        </tr>
    );
};


export default WorkoutCard;
