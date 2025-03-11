import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ExerciseDetails = ({ exercise, onAddToWorkout, onMoveBack }) => {
    const [reps_low, setRepsLow] = useState(0);
    const [reps_max, setRepsMax] = useState(0);
    const [sets, setSets] = useState(0);
    const [weight, setWeight] = useState(0);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleAddToWorkout = () => {
        if (!reps_max || !reps_low || !weight || !sets) {
            setError("Check reps, sets and weight");
            return;
        }
        const exerciseWithDetails = {
            ...exercise,
            reps_low,
            reps_max,
            weight,
            description,
            sets
        };
        onAddToWorkout(exerciseWithDetails);
    };

    return (
        <div className="w-2/3 flex flex-col items-center justify-center bg-gray-900/40 border border-orange-500/30 p-5 m-5 rounded-lg shadow-lg min-h-[300px]">
            <div className="p-3 mb-4 text-white text-center font-bold w-2/3 bg-gradient-to-r from-orange-600/80 to-orange-500/60 montserrat-text text-lg border border-orange-500/50 rounded-lg shadow-md">
                {exercise.name}
            </div>

            <p className="text-xl mt-2 mb-2 text-white text-center montserrat-text">Rep count</p>
            <div className="flex w-full justify-center items-center mb-4">
                <button
                    onClick={() => setRepsLow(reps_low > 0 ? Math.min(reps_low - 1, reps_max) : 0)}
                    className="text-white font-bold m-1 p-3 montserrat-text w-1/6 text-lg border border-orange-500/60 bg-gray-800/40 rounded-lg hover:bg-orange-500/20 transition-colors"
                >
                    -
                </button>
                <button
                    onClick={() => setRepsLow(Math.min(reps_low + 1, reps_max || reps_low + 1))}
                    className="text-white font-bold m-1 p-3 montserrat-text w-1/6 text-lg border border-orange-500/60 bg-gray-800/40 rounded-lg hover:bg-orange-500/20 transition-colors"
                >
                    +
                </button>
                <span className="m-1 p-1 text-white font-bold montserrat-text text-2xl">
                    {reps_low} - {reps_max}
                </span>
                <button
                    onClick={() => setRepsMax(reps_max > 0 ? Math.max(reps_max - 1, reps_low) : 0)}
                    className="text-white font-bold m-1 p-3 montserrat-text w-1/6 text-lg border border-orange-500/60 bg-gray-800/40 rounded-lg hover:bg-orange-500/20 transition-colors"
                >
                    -
                </button>
                <button
                    onClick={() => setRepsMax(reps_max + 1)}
                    className="text-white font-bold m-1 p-3 montserrat-text w-1/6 text-lg border border-orange-500/60 bg-gray-800/40 rounded-lg hover:bg-orange-500/20 transition-colors"
                >
                    +
                </button>
            </div>

            <label className="text-gray-300 block text-left w-full ml-1 mb-1 montserrat-text">Weight</label>
            <input
                type="text"
                placeholder="Weight..."
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="m-1 w-full p-3 border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />

            <label className="text-gray-300 block text-left w-full ml-1 mt-3 mb-1 montserrat-text">Sets</label>
            <input
                type="text"
                placeholder="Sets..."
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="m-1 w-full p-3 border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />

            <label className="text-gray-300 block text-left w-full ml-1 mt-3 mb-1 montserrat-text">Description</label>
            <textarea
                placeholder="Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="m-1 w-full min-h-24 p-3 border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />

            <div className="w-full flex justify-center mt-4">
                <button
                    onClick={() => onMoveBack(exercise)}
                    className="w-1/2 m-2 p-3 border border-orange-500/60 bg-gray-800/40 rounded-lg hover:bg-orange-500/20 transition-colors flex justify-center"
                >
                    <FontAwesomeIcon className="text-white text-2xl" icon={faArrowLeft} />
                </button>
                <button
                    onClick={handleAddToWorkout}
                    className="text-white font-bold m-2 p-3 w-1/2 montserrat-text border border-orange-500/60 bg-gray-800/40 rounded-lg hover:bg-orange-500/20 transition-colors"
                >
                    Add to Workout
                </button>
            </div>

            {error && (
                <p className="text-red-500 montserrat-text mt-2 bg-red-500/10 px-4 py-2 rounded-full">{error}</p>
            )}
        </div>
    );
};

export default ExerciseDetails;
