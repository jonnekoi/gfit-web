import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const URL = "http://127.0.0.1:3000/v1";

const WorkOutData = () => {
    const [workouts, setWorkouts] = useState([]);
    const [chartData, setChartData] = useState([]);

    const fetchWorkouts = async () => {
        try {
            const response = await fetch(URL + "/workouts");
            const data = await response.json();

            const workoutsArray = Object.entries(data).map(([key, value]) => ({
                workout_name: key,
                ...value,
            }));

            setWorkouts(workoutsArray);
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    useEffect(() => {
        if (workouts.length > 0) {
            const countedData = countWorkouts(workouts);
            setChartData(countedData);
        }
    }, [workouts]);

    const countWorkouts = (workouts) => {
        const workoutTypeCounts = {};

        workouts.forEach((workout) => {
            const type = workout.workout_type;
            workoutTypeCounts[type] = (workoutTypeCounts[type] || 0) + 1;
        });

        return Object.keys(workoutTypeCounts).map((key) => ({
            category: key,
            count: workoutTypeCounts[key],
        }));
    };

    return (
        <div className="flex flex-col p-4">
            <div className="border border-orange-500 flex justify-center flex-col rounded min-w-96">
                <h1 className="text-2xl font-bold text-center text-white montserrat-text m-5">Workout Types</h1>
                {chartData.length > 0 ? (
                    <div className="pr-10">
                        <ResponsiveContainer width="100%" height={300}>  {/* Fixed height */}
                            <BarChart data={chartData} width={150} height={40}>
                                <XAxis dataKey="category" tick={{ fill: "white" }} stroke="none" />
                                <YAxis allowDecimals={false} tick={{ fill: "white" }} stroke="white" />
                                <Bar
                                    dataKey="count"
                                    fill="#F97316FF"
                                    radius={[6, 6, 0, 0]}
                                    activeBar={{ fill: "#ea580c", opacity: 1 }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">Loading workout data...</p>
                )}
            </div>
        </div>
    );
};

export default WorkOutData;
