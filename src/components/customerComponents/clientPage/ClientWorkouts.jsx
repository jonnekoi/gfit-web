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
            <div className="flex justify-center">
                <div className="w-2/3">
                    <div className="flex flex-row justify-end mb-2">
                        <button
                            onClick={addWorkoutToClientModal}
                            className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105">
                            Add Workout
                        </button>
                    </div>
                    <table
                        className="w-full text-gray-100 montserrat-text bg-gray-900/40 rounded-lg overflow-hidden shadow-lg">
                        <thead>
                        <tr className="bg-gradient-to-r from-orange-600/80 to-orange-500/60 text-lg font-medium">
                            <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                                <div className="flex items-center justify-center space-x-2">
                                    <span>Workout</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                                <div className="flex items-center justify-center space-x-2">
                                    <span>Type</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                                <div className="flex items-center justify-center space-x-2">
                                    <span>Level</span>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(exercises).map((key, index) => (
                            <WorkoutCard key={index} workout={exercises[key]} index={index}/>
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
