import React, {useState} from 'react';
import WorkoutCard from './WorkoutCard';
import AddWorkoutToClientModal from "./AddWorkoutToClientModal.jsx";


const ClientWorkouts = ({ exercises, userId }) => {
    const [addWorkoutModal, setAddWorkoutModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;


    const addWorkoutToClientModal = () => {
        setAddWorkoutModal(true);
    }

    const closeModal = () => {
        setAddWorkoutModal(false);
    };


    if (!exercises) {
        return <div></div>;
    }

    const exercisesArray = Object.values(exercises);
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleExercises = exercisesArray.slice(startIndex, endIndex);

    const nextPage = () => {
        if (endIndex < exercisesArray.length) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

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
                        {visibleExercises.map((exercise, index) => (
                            <WorkoutCard key={index} workout={exercise} index={index}/>
                        ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4 text-white montserrat-text text-1xl">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className={`px-4 py-2 rounded ${currentPage === 0 ? "cursor-not-allowed" : "text-white"}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={endIndex >= exercises.length}
                            className={`px-4 py-2 rounded ${endIndex >= exercises.length ? "cursor-not-allowed" : "text-white"}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {addWorkoutModal && (
                <AddWorkoutToClientModal userId={userId} setWorkoutModal={setAddWorkoutModal} close={closeModal}/>
            )}
        </div>
    );
};

export default ClientWorkouts;
