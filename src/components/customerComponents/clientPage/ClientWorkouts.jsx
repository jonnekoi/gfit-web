import React, {useState} from 'react';
import AddWorkoutToClientModal from "./AddWorkoutToClientModal.jsx";
import WorkoutCalender from "./WorkoutCalender.jsx";
import ButtonNoHover from "../../../buttons/ButtonNoHover.jsx";


const ClientWorkouts = ({ exercises, userId }) => {
    const [addWorkoutModal, setAddWorkoutModal] = useState(false);

    const addWorkoutToClientModal = () => {
        setAddWorkoutModal(true);
    }

    const closeModal = () => {
        setAddWorkoutModal(false);
    };


    if (!exercises) {
        return <div></div>;
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
    }

    exercisesArray.forEach(exercise => {
        if (dailyWorkouts[exercise.day]) {
            dailyWorkouts[exercise.day].push(exercise);
        }
    }
    );


    return (
        <div className="w-full">
            <div className="flex justify-center">
                <div className="w-2/3">
                    <div className="flex flex-row justify-end mb-2 space-x-5">
                        <ButtonNoHover text="Workout History">
                        </ButtonNoHover>
                        <ButtonNoHover
                            onClick={addWorkoutToClientModal} text="Add Workout">
                        </ButtonNoHover>
                    </div>
                    <WorkoutCalender dailyWorkouts={dailyWorkouts} userId={userId} />
                </div>
            </div>
            {addWorkoutModal && (
                <AddWorkoutToClientModal userId={userId} setWorkoutModal={setAddWorkoutModal} close={closeModal}/>
            )}
        </div>
    );
};

export default ClientWorkouts;
