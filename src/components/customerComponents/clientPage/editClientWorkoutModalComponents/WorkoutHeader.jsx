const WorkoutHeader = ({ workout, isEditMode, selectedDay, setSelectedDay, closeModal }) => {
    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-3">
                <h1 className="text-2xl font-bold montserrat-text bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    {workout.name}
                </h1>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    {isEditMode ? (
                        <select
                            value={selectedDay}
                            onChange={handleDayChange}
                            className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    ) : (
                        <span className="text-2xl font-bold montserrat-text bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                            {workout.day}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default WorkoutHeader;
