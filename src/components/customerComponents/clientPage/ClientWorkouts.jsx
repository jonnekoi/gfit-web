import React, {useState} from 'react';
import WorkoutCard from './WorkoutCard';
import AddWorkoutToClientModal from "./AddWorkoutToClientModal.jsx";


const ClientWorkouts = ({ exercises, userId }) => {
    const [workoutModal, setWorkoutModal] = useState(false);


    const addWorkoutToClientModal = () => {
        setWorkoutModal(true);
    }

    const closeModal = () => {
        setWorkoutModal(false);
    };


    if (!exercises) {
        return <div></div>;
    }

    return (
        <div className="w-full">
            <div className="flex flex-row justify-end">
                <button
                    className="text-white font-bold bg-orange-500 montserrat-text mr-5 text-1xl border min-w-48 border-orange-500 p-2 rounded">Manage Workouts
                </button>
                <button onClick={addWorkoutToClientModal} className="text-white font-bold bg-orange-500 montserrat-text text-1xl mr-5 border min-w-48 border-orange-500 p-2 rounded">Add
                    Workout
                </button>
            </div>
            <div className="flex justify-center">
                <div className="w-2/3">
                    <table className="w-full text-white montserrat-text">
                        <thead>
                        <tr className="border-b border-b-orange-500 text-2xl font-bold text-center">
                            <th className="p-5 cursor-pointer">Workout</th>
                            <th className="p-5 cursor-pointer">Type</th>
                            <th className="p-5 cursor-pointer">Level</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(exercises).map((key, index) => (
                            <WorkoutCard key={index} workout={exercises[key]}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {workoutModal && (
                <AddWorkoutToClientModal userId={userId} setWorkoutModal={setWorkoutModal} close={closeModal}/>
            )}
        </div>
    );
};

export default ClientWorkouts;
