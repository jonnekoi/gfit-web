import React from 'react';

const WorkoutCard = ({ workout }) => {
    return (
        <tr className="text-center">
            <td className="p-4 border-b border-b-orange-500">{workout.name}</td>
            <td className="p-4 border-b border-b-orange-500">{workout.type}</td>
            <td className="p-4 border-b border-b-orange-500">{workout.level}</td>
        </tr>
    );
};

export default WorkoutCard;
