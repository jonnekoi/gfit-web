import React from 'react';
import WorkoutCalender from "./WorkoutCalender.jsx";


const ClientWorkouts = ({ exercises, userId }) => {

    console.log(exercises)
    if (!exercises) {
        return <div></div>;
    }

    const exercisesArray = Object.values(exercises).flat();

    console.log("exercisesArray",exercisesArray);

    const dailyWorkouts = {
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": [],
        "Friday": [],
        "Saturday": [],
        "Sunday": []
    }

    exercisesArray.forEach(exercise => {
        if (dailyWorkouts[exercise.day]) {
            dailyWorkouts[exercise.day].push(exercise);
        }
    });


    return (
        <div className="w-full">
            <div className="flex justify-center">
                <div className="w-2/3">
                    <WorkoutCalender dailyWorkouts={dailyWorkouts} userId={userId} />
                </div>
            </div>
        </div>
    );
};

export default ClientWorkouts;
