import React from 'react';

const WorkoutCard = ({ workout }) => {
    return (
        <div className="text-white p-5 border m-5">
            <h3>{workout.name}</h3>
            <p>Type: {workout.type}</p>
            <p>Level: {workout.level}</p>
            <h4>Exercises:</h4>
            <ul>
                {workout.exercises.map((exercise, index) => (
                    <li key={index}>
                        <p>Name: {exercise.name}</p>
                        <p>Reps: {exercise.low_reps}</p>
                        <p>Weight: {exercise.weight}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutCard;
