import React, {useState} from "react";
import EditClientWorkoutModal from "./EditClientWorkoutModal.jsx";

const WorkoutCalender = ({ dailyWorkouts, userId }) => {
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (e, workout) => {
        e.stopPropagation();
        setSelectedWorkout(workout);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWorkout(null);
    };

    return (
        <div className="flex flex-col mt-6">
            <div className="flex flex-col gap-4">
                {Object.keys(dailyWorkouts).map(day => {
                    const workoutsForDay = dailyWorkouts[day];
                    return (
                        <div key={day} className="overflow-hidden shadow-lg rounded-lg bg-gray-900/60">
                            <h3 className="px-6 py-4 bg-gradient-to-r from-orange-600/80 to-orange-500/60 text-lg font-medium text-gray-100 bruno-ace-sc-regular">
                                {day}
                            </h3>
                            <div className="p-3 rounded-b-lg">
                                {workoutsForDay.length === 0 ? (
                                    <p className="text-gray-400 montserrat-text px-2 py-3">Rest day</p>
                                ) : (
                                    <ul className="mt-2 divide-y divide-orange-500/20">
                                        {workoutsForDay.map((workout, index) => (
                                            <li key={index}
                                                className="text-gray-100 montserrat-text p-3 flex items-center justify-between transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-medium">{workout.name}</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                            <span className="px-2 py-1 bg-orange-500/20 rounded">
                                                {workout.type}
                                            </span>
                                                    <span className={`px-2 py-1 rounded ${
                                                        workout.level === 'Easy' ? 'bg-green-500/20 text-green-300' :
                                                            workout.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                                                'bg-red-500/20 text-red-300'
                                                    }`}>
                                                {workout.level}
                                            </span>
                                                    <button
                                                        onClick={(e) => handleEditClick(e, workout)}
                                                        className="px-2 py-1 bg-white/20 rounded hover:bg-orange-500/40 transition-colors">
                                                        Edit
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            {isModalOpen && selectedWorkout && (
                <EditClientWorkoutModal workout={selectedWorkout} userId={userId} closeModal={closeModal}/>
            )}
        </div>
    );
};

export default WorkoutCalender;
