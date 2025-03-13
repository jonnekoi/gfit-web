const WorkoutDescription = ({ isEditMode, workoutDescription, setWorkoutDescription }) => {
    return (
        <div className="mt-4 mb-2 text-center">
            <h4 className="text-lg font-medium text-orange-400 mb-2">Workout Description</h4>
            {isEditMode ? (
                <textarea
                    placeholder="Add workout description..."
                    value={workoutDescription}
                    onChange={(e) => setWorkoutDescription(e.target.value)}
                    className="w-full min-h-16 p-3 border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                />
            ) : (
                <div className="p-3 rounded-lg bg-gray-800/20 text-gray-200 min-h-12">
                    {workoutDescription || "No workout description available"}
                </div>
            )}
        </div>
    );
};

export default WorkoutDescription;
