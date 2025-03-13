import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const URL = "http://127.0.0.1:3000/v1";

const WorkOutData = () => {
    const [workouts, setWorkouts] = useState([]);
    const [chartData, setChartData] = useState([]);
    const token = sessionStorage.getItem("token");

    const fetchWorkouts = async () => {

        const fetchOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }

        try {
            const response = await fetch(URL + "/workouts", fetchOptions);
            const data = await response.json();

            if (response.status === 403) {
                return;
            }

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


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { category, count } = payload[0].payload;
            return (
                <div className="bg-gray-900/90 text-white p-3 rounded-lg shadow-xl border border-orange-500/30">
                    <p className="montserrat-text font-medium text-gray-300">
                        <span className="text-orange-300">Category:</span> {category}
                    </p>
                    <p className="montserrat-text font-bold">
                        <span className="text-orange-400">{count}</span> workouts
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div
            className="w-1/3 flex flex-col items-center justify-center bg-gray-900/40 border border-orange-500/30 p-5 rounded-lg shadow-lg min-h-[300px]">
            <h3 className="w-full text-xl font-bold text-white mb-4 bg-gradient-to-r from-orange-600/80 to-orange-500/60 py-2 rounded-lg montserrat-text text-center">
                Workout Types
            </h3>
            {chartData.length > 0 ? (
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 10,
                                bottom: 20,
                            }}
                        >
                            <defs>
                                <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f97316"/>
                                    <stop offset="100%" stopColor="#ea580c"/>
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="category"
                                tick={{fill: "#d1d5db", dy: 10}}
                                stroke="none"
                                axisLine={false}
                            />
                            <YAxis
                                allowDecimals={false}
                                tick={{fill: "#d1d5db"}}
                                stroke="none"
                                axisLine={false}
                            />
                            <CartesianGrid
                                strokeDasharray=""
                                horizontal={true}
                                vertical={false}
                                stroke="#9ca3af"
                                strokeOpacity={0.2}
                            />
                            <Tooltip cursor={false} content={<CustomTooltip />} />
                            <Bar
                                dataKey="count"
                                fill="url(#workoutGradient)"
                                radius={[6, 6, 0, 0]}
                                activeBar={{
                                    fill: "#f97316",
                                    filter: "brightness(1.2)",
                                    stroke: "rgba(249, 115, 22, 0.6)",
                                    strokeWidth: 1
                                }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p className="text-gray-400 text-center montserrat-text">Loading workout data...</p>
            )}
        </div>
    );
};

export default WorkOutData;
