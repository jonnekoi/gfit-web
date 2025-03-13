const WorkoutSelector = ({ workouts, handleWorkoutChange, handleDayChange }) => {
    return (
        <div className="flex flex-col space-y-4 mb-4">
            <select
                onChange={handleWorkoutChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
                <option value="">Select a workout</option>
                {workouts.map((workout, index) => (
                    <option key={index} value={workout.workout_name}>{workout.workout_name}</option>
                ))}
            </select>
            <select
                onChange={handleDayChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
                <option value="">Select a day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
        </div>
    );
};

export default WorkoutSelector;
