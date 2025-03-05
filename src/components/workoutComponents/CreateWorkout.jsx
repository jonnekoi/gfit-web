"use client";
import {useState, useEffect, use} from "react";

const url = 'http://127.0.0.1:3000/v1';

const CreateWorkout = () => {
    const [exercises, setExercises] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [reps_low, setRepsLows] = useState(0);
    const [reps_max, setRepsMax] = useState(0);
    const [weight, setWeight] = useState(0);
    const [description, setDescription] = useState("");
    const [workoutName, setWorkoutName] = useState("");
    const [error, setError] = useState("");
    const [errorSecond, setErrorSecond] = useState("");

    const fetchExercises = async () => {
        try {
            const response = await fetch(url + '/workouts/exercise');
            const data = await response.json();
            setExercises(data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    if (!exercises) {
        return <p>Loading...</p>;
    }

    const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const moveExercise = (exercise) => {
        setCurrentExercise(exercise);
        setErrorSecond("");
    };

    const addToWorkout = () => {
        if (!reps_max || !reps_low || !weight) {
            setErrorSecond("Check reps and weight");
            return;
        }
        if (currentExercise) {
            const exerciseWithDetails = { ...currentExercise, reps_low, reps_max, weight, description };
            setExercises(exercises.filter((ex) => ex.id !== currentExercise.id));
            setSelectedExercises([...selectedExercises, exerciseWithDetails]);
            setCurrentExercise(null);
            setRepsLows(0);
            setRepsMax(0);
            setWeight(0);
            setDescription("");
            setErrorSecond("");
        }
    };

    const submitWorkout = async (e) => {
        e.preventDefault();
        if (!workoutName) {
            setError("Add workout name")
            return;
        }
        const workoutDetails = {
            workoutName: workoutName,
            exercises: selectedExercises
        };
        console.log(workoutDetails);
        setWorkoutName("");
    };

    const moveBackToExercises = (exercise) => {
        setSelectedExercises(selectedExercises.filter((ex) => ex.id !== exercise.id));
        setExercises([...exercises, exercise]);
    };

    return (
        <div className="flex w-full">
            <div className="w-full flex flex-wrap justify-center border p-5 m-5 rounded min-h-[300px]">
                <div className="w-full max-h-12 flex space-x-7 justify-center m-2">
                    <input type="text" placeholder="Search exercises..." value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="border rounded w-full p-1"
                    />
                    <button
                        className="text-white font-bold p-1 w-1/3 montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">Add
                        Exercise
                    </button>
                </div>
                {filteredExercises.map((exercise) => (
                    <button onClick={() => moveExercise(exercise)} key={exercise.id}
                            className="m-2 text-white max-h-12 text-center montserrat-text text-1xl border border-orange-500 rounded w-1/5">
                        {exercise.name}
                    </button>
                ))}
            </div>
            {currentExercise && (
                <div className="w-2/3 flex flex-col items-center justify-center border p-5 m-5 rounded min-h-[300px]">
                    <div
                        className="p-2 m-1 text-white text-center font-bold w-2/3 bg-orange-500 montserrat-text text-1xl border border-orange-500 rounded">
                        {currentExercise.name}
                    </div>
                    <p className="text-2xl mt-2 text-white text-center montserrat-text">Rep count</p>
                    <div className="flex w-full justify-center items-center">
                        <button onClick={() => setRepsLows(reps_low > 0 ? Math.min(reps_low - 1, reps_max) : 0)}
                                className="text-white font-bold m-1 p-3 montserrat-text w-1/6 text-1xl border border-orange-500 rounded hover:border-orange-300">-
                        </button>
                        <button onClick={() => setRepsLows(Math.min(reps_low + 1, reps_max))}
                                className="text-white font-bold m-1 p-3 montserrat-text w-1/6 text-1xl border border-orange-500 rounded hover:border-orange-300">+
                        </button>
                        <span
                            className="m-1 p-1 text-white font-bold montserrat-text text-2xl">{reps_low} - {reps_max}</span>
                        <button onClick={() => setRepsMax(reps_max > 0 ? Math.max(reps_max - 1, reps_low) : 0)}
                                className="text-white font-bold m-1 p-3 montserrat-text w-1/6 text-1xl border border-orange-500 rounded hover:border-orange-300">-
                        </button>
                        <button onClick={() => setRepsMax(Math.max(reps_max + 1, reps_low))}
                                className="text-white font-bold m-1 p-3 montserrat-text w-1/6 text-1xl border border-orange-500 rounded hover:border-orange-300">+
                        </button>
                    </div>
                    <input type="text" placeholder="Weight..." value={weight}
                           onChange={(e) => setWeight(e.target.value)} className="m-1 w-full p-1 border rounded"/>
                    <textarea placeholder="Description..." value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="m-1 w-full min-h-24 p-1 border rounded text-top"/>
                    <button onClick={addToWorkout}
                            className="text-white font-bold m-2 p-2.5 w-2/3 montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">Add
                        to Workout
                    </button>
                    {errorSecond && <p className="text-red-500 montserrat-text">{errorSecond}</p>}
                </div>
            )}
            <div className="w-full flex flex-col border p-5 m-5 rounded min-h-[300px]">
                <form className="w-full items-center flex flex-col">
                    {selectedExercises.map((exercise) => (
                        <div key={exercise.id} className="m-2 w-full bg-orange-500 border border-orange-500 rounded flex flex-row justify-between">
                            <div
                                className="p-2 text-white text-center montserrat-text text-1xl">
                                {exercise.name} - R: {exercise.reps_low} - {exercise.reps_max} W: {exercise.weight}
                            </div>
                            <button onClick={() => moveBackToExercises(exercise)} className="text-white font-bold montserrat-text mr-5">X</button>
                        </div>
                    ))}
                    <div className="flex flex-col mt-10 justify-center items-center max-h-20">
                        <input className="border rounded p-2.5 m-2 w-full" onChange={(e)=> setWorkoutName(e.target.value)} type="text" name="workoutName"
                               placeholder="Enter name for workout..."/>
                        <button onClick={submitWorkout} type="submit"
                                className="text-white font-bold p-2.5 m-2 w-full montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">Add
                            Workout
                        </button>
                        {error && <p className="text-red-500 montserrat-text">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateWorkout;
