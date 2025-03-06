import React from 'react';
import WorkoutCard from './WorkoutCard';

const ClientWorkouts = ({ exercises }) => {
    if (!exercises) {
        return <div>Loading...</div>;
    }

    if (typeof exercises !== 'object') {
        return <div>No exercises available</div>;
    }

    return (
        <div className="">
            <h3></h3>
            {Object.keys(exercises).map((key, index) => (
                <WorkoutCard key={index} workout={exercises[key]} />
            ))}
        </div>
    );
};

export default ClientWorkouts;
