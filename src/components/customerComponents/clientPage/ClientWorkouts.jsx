import React from 'react';
import WorkoutCalender from "./WorkoutCalender.jsx";

const ClientWorkouts = ({ exercises, userId }) => {
    if (!exercises) {
        return <div className="w-full text-center py-8 text-white">Loading...</div>;
    }

    const exercisesArray = Object.values(exercises).flat();

    const dailyWorkouts = {
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": [],
        "Friday": [],
        "Saturday": [],
        "Sunday": []
    };

    exercisesArray.forEach(exercise => {
        if (dailyWorkouts[exercise.day]) {
            dailyWorkouts[exercise.day].push(exercise);
        }
    });

    return (
        <div className="w-full px-4 md:px-0">
            <div className="flex justify-center">
                <div className="w-full md:w-5/6 lg:w-2/3">
                    <WorkoutCalender dailyWorkouts={dailyWorkouts} userId={userId} />
                </div>
            </div>
        </div>
    );
};

export default ClientWorkouts;
