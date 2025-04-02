import { useEffect, useState } from "react";
import formatDate from "../../scripts/formatDate";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectedWorkoutModal from "./SelectedWorkoutModal.jsx";
import { useNavigate } from "react-router-dom";

const URL = "http://127.0.0.1:3000/v1";

const AllWorkouts = () => {
    const [workouts, setWorkouts] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [editableExercises, setEditableExercises] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;
    const [updateText, setUpdateText] = useState("");
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const fetchWorkouts = async () => {
        try {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            };
            const response = await fetch(URL + "/workouts", fetchOptions);
            const data = await response.json();

            const workoutsArray = Object.entries(data).map(([key, value]) => ({
                workout_name: key,
                ...value,
            }));

            if (response.status === 403) {
                navigate("/login");
            }

            setWorkouts(workoutsArray);
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    };

    const saveWorkout = async (workoutId) => {
        try {
            const response = await fetch(URL + "/workouts", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ id: workoutId, exercises: editableExercises }),
            });

            if (response.status === 201) {
                setErrorText("");
                setUpdateText("Workout updated successfully");
            } else {
                setErrorText("Failed to update workout");
            }

        } catch (error) {
            console.error('Error saving workout:', error);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const toggleVisibility = (workout) => {
        setSelectedWorkout(workout);
        setEditableExercises(workout.exercises.map(exercise => ({ ...exercise })));
    };

    const closeModal = () => {
        setSelectedWorkout(null);
        setIsReadOnly(true);
        setErrorText("");
        setUpdateText("");
    };

    const toggleEditMode = () => {
        if (!isReadOnly) {
            saveWorkout(selectedWorkout.workout_id);
        }
        setIsReadOnly(prev => !prev);
    };

    const handleInputChange = (index, field, value) => {
        const updatedExercises = [...editableExercises];
        updatedExercises[index][field] = value;
        setEditableExercises(updatedExercises);
    };

    const countWorkouts = (workouts) => {
        const totalWorkouts = workouts.length;
        const workoutTypeCounts = {};
        workoutTypeCounts["Total"] = totalWorkouts;

        workouts.forEach((workout) => {
            const type = workout.workout_type;
            if (workoutTypeCounts[type]) {
                workoutTypeCounts[type]++;
            } else {
                workoutTypeCounts[type] = 1;
            }
        });
    };

    if (workouts) {
        countWorkouts(workouts);
    }

    if (!workouts) return <div className="w-full text-center py-8 text-white">Loading...</div>;

    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleWorkouts = workouts.slice(startIndex, endIndex);

    const nextPage = () => {
        if (endIndex < workouts.length) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const sortWorkouts = (sortBy) => {
        return () => {
            let direction = 'ascending';
            if (sortConfig.key === sortBy && sortConfig.direction === 'ascending') {
                direction = 'descending';
            }

            const sorted = [...workouts].sort((a, b) => {
                if (direction === 'ascending') {
                    return a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
                } else {
                    return a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
                }
            });

            setWorkouts(sorted);
            setSortConfig({ key: sortBy, direction });
            setCurrentPage(0);
        };
    };

    const LevelBadge = ({ level }) => (
        <span className={`px-3 py-1 rounded ${
            level === 'Easy' ? 'bg-green-500/20 text-green-300' :
                level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
        }`}>
            {level}
        </span>
    );

    return (
        <div className="w-2/3">
            <div className="hidden md:block">
                <table className="w-full text-gray-100 montserrat-text bg-gray-900/60 rounded-lg overflow-hidden shadow-lg">
                    <thead>
                    <tr className="bg-gradient-to-r from-orange-600/80 to-orange-500/60 text-lg font-medium">
                        <th onClick={sortWorkouts("workout_name")}
                            className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Name</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th onClick={sortWorkouts("workout_type")}
                            className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Type</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th onClick={sortWorkouts("workout_created_at")}
                            className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Crafted</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th onClick={sortWorkouts("workout_level")}
                            className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Level</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleWorkouts.map((workout, index) => (
                        <tr
                            key={index}
                            onClick={() => toggleVisibility(workout)}
                            className={`transition-colors hover:bg-orange-500/10 cursor-pointer ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'}`}
                        >
                            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                                {workout.workout_name}
                            </td>
                            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                                    <span className="px-3 py-1 bg-orange-500/20 rounded">
                                        {workout.workout_type}
                                    </span>
                            </td>
                            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                                {formatDate(workout.workout_created_at)}
                            </td>
                            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                                <LevelBadge level={workout.workout_level} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden">
                {visibleWorkouts.map((workout, index) => (
                    <div
                        key={index}
                        className="bg-gray-900/60 rounded-lg p-4 mb-4 shadow-lg cursor-pointer"
                        onClick={() => toggleVisibility(workout)}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold text-white">
                                {workout.workout_name}
                            </h3>
                            <LevelBadge level={workout.workout_level} />
                        </div>
                        <div className="flex justify-between items-center mb-3 text-gray-300">
                            <div>
                                <p className="text-gray-400">Crafted:</p>
                                <p>{formatDate(workout.workout_created_at)}</p>
                            </div>
                            <div className="flex justify-end">
                                <span
                                    className="px-2 py-1 bg-orange-500/20 rounded text-orange-300">
                                    {workout.workout_type}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className="flex justify-center space-x-2 items-center mt-4 text-white montserrat-text">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded ${
                        currentPage === 0
                            ? "bg-gray-700 cursor-not-allowed opacity-50"
                            : "bg-orange-600 hover:bg-orange-500"
                    }`}
                >
                    Previous
                </button>

                <button
                    onClick={nextPage}
                    disabled={endIndex >= workouts.length}
                    className={`px-4 py-2 rounded ${
                        endIndex >= workouts.length
                            ? "bg-gray-700 cursor-not-allowed opacity-50"
                            : "bg-orange-600 hover:bg-orange-500"
                    }`}
                >
                    Next
                </button>
            </div>

            {selectedWorkout && (
                <SelectedWorkoutModal
                    selectedWorkout={selectedWorkout}
                    editableExercises={editableExercises}
                    isReadOnly={isReadOnly}
                    closeModal={closeModal}
                    handleInputChange={handleInputChange}
                    toggleEditMode={toggleEditMode}
                    updateText={updateText}
                    errorText={errorText}
                />
            )}
        </div>
    );
};

export default AllWorkouts;
