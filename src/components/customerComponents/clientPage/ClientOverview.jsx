import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import {
    LineChart,
    ReferenceLine,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer, CartesianGrid,
} from 'recharts';

const url = 'http://127.0.0.1:3000/v1';

const ClientOverview = ({ client }) => {
    const [clientWeights, setClientWeights] = useState(null);
    const [notWeightData, setNotWeightData] = useState(false);
    const token = sessionStorage.getItem('token');

    const clientData = client;
    const clientId = clientData.id;

    const fetchClientWeights = async () => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + token,
            }
        }
        try {
            const response = await fetch(url + "/clients/weight/" + clientId, fetchOptions);
            const data = await response.json();
            setClientWeights(data);
            if (data.length === 0) {
                setNotWeightData(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchClientWeights();
    }, [clientId]);

    if (!clientWeights) {
        return <div className="w-full text-center py-8 text-white">Loading...</div>
    }

    const sortedWeights = clientWeights.sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = sortedWeights.map(weight => ({
        date: new Date(weight.date).toLocaleDateString(),
        weight: parseFloat(weight.weight)
    }));

    const minWeight = Math.floor(Math.min(...data.map(d => d.weight)) / 5) * 5;
    const maxWeight = Math.ceil(Math.max(...data.map(d => d.weight)) / 5) * 5;


    const targetWeight = clientData.targetWeight;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { date, weight } = payload[0].payload;
            return (
                <div className="bg-gray-900/90 text-white p-3 rounded-lg shadow-xl border border-orange-500/30">
                    <p className="montserrat-text font-medium text-gray-300">
                        <span className="text-orange-300">Date:</span> {date}
                    </p>
                    <p className="montserrat-text font-bold">
                        <span className="text-orange-400">{weight}</span> kg
                    </p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="w-full flex flex-col sm:flex-row justify-center sm:space-x-5 mt-5 sm:px-0">
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                {!notWeightData && (
                    <h1 className="text-xl text-center text-orange-500 michroma-regular">Weight Progress</h1>
                )}
                {notWeightData ? (
                    <div className="border h-full flex items-center justify-center rounded p-5 text-center text-white">
                        <FontAwesomeIcon icon={ faTriangleExclamation } className="text-6xl" title="No data"/>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            width={500}
                            height={200}
                            data={data}
                            syncId="anyId"
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="weightGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#f97316" />
                                    <stop offset="100%" stopColor="#ea580c" />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                tick={{fill: "#d1d5db", dy: 10, dx: 15}}
                                stroke="none"
                                interval={5}
                            />
                            <YAxis
                                tickCount={6}
                                tick={{fill: "#d1d5db"}}
                                stroke="none"
                                domain={[minWeight, maxWeight]}
                            />
                            <CartesianGrid
                                strokeDasharray=""
                                horizontal={true}
                                vertical={false}
                                stroke="#9ca3af"
                                strokeOpacity={0.2}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="weight"
                                stroke="url(#weightGradient)"
                                strokeWidth={3}
                                dot={{ stroke: '#ea580c', strokeWidth: 2, r: 4, fill: '#1f2937' }}
                                activeDot={{ stroke: '#ea580c', strokeWidth: 2, r: 6, fill: '#f97316' }}
                            />
                            <ReferenceLine
                                y={targetWeight}
                                stroke="#ea580c"
                                strokeDasharray="6 6"
                                label={{
                                    value: "",
                                    position: "right",
                                    fill: "#ea580c",
                                    fontSize: 12
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}

export default ClientOverview;
