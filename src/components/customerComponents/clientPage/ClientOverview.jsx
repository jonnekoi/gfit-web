import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
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
import formatDate from "../../../scripts/formatDate";

const url = 'http://127.0.0.1:3000/v1';

const ClientOverview = ({ client }) => {
    const [clientWeights, setClientWeights] = useState(null);
    const [notWeightData, setNotWeightData] = useState(false);

    const clientData = client;
    const clientId = clientData.id;

    const fetchClientWeights = async () => {
        try {
            const response = await fetch(url + "/clients/weight/" + clientId);
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
        return <div></div>
    }

    const sortedWeights = clientWeights.sort((a, b) => new Date(a.date) - new Date(b.date));

    let lastWeight = null;
    let differenceWeight = null;
    let weightTargetDifference = null;
    let weightDifferenceAmount = null;

    if (sortedWeights.length > 0) {
        lastWeight = sortedWeights[sortedWeights.length - 1].weight;
        differenceWeight = lastWeight - clientData.targetWeight;
        weightTargetDifference = Math.abs(differenceWeight).toFixed(2);
        weightDifferenceAmount = (differenceWeight > 0 ? "+ " : "- ") + weightTargetDifference + " kg";
    }

    const data = sortedWeights.map(weight => ({
        date: new Date(weight.date).toLocaleDateString(),
        weight: parseFloat(weight.weight)
    }));

    const minWeight = Math.floor(Math.min(...data.map(d => d.weight)) / 5) * 5;
    const maxWeight = Math.ceil(Math.max(...data.map(d => d.weight)) / 5) * 5;


    const weight = clientData.weight;
    const targetWeight = clientData.targetWeight;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { date, weight } = payload[0].payload;
            return (
                <div className="custom-tooltip bg-orange-500 text-white p-2 rounded">
                    <p><strong>{date}</strong></p>
                    <p><strong>{weight}</strong></p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className={`grid ${notWeightData ? 'grid-cols-3' : 'grid-cols-4'} space-x-5`}>
            <div className="mt-5">
                <div className="text-white montserrat-text text-center text-2xl border rounded p-5">
                    <FontAwesomeIcon className="text-white text-8xl" icon={faUser}/>
                    <p className="font-bold text-5xl p-5">{clientData.FirstName} {clientData.LastName}</p>
                    <p className="p-2">{formatDate(clientData.birthday)}</p>
                    <p className="p-2"><strong>Start</strong> {weight} kg</p>
                    <p className="p-2"><strong>Target</strong> {targetWeight} kg</p>
                    <p><strong>{weightDifferenceAmount}</strong></p>
                    <p className="p-2 font-semibold text-orange-500">{clientData.plan_name}</p>
                </div>
            </div>
            <div className={`${notWeightData ? 'col-span-1' : 'col-span-2'} mt-5 items-center`}>
                {!notWeightData && (
                    <h1 className="text-2xl font-bold text-center text-white montserrat-text">Weight Progress</h1>
                )}
                {notWeightData ? (
                    <div
                        className="col-span-2 border h-full flex items-center justify-center rounded p-5 text-center text-white">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-6xl" title="No data"/>
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
                            <XAxis dataKey="date" tick={{fill: "white", dy: 10, dx: 15}} stroke="none" interval={5}/>
                            <YAxis tickCount={6} tick={{fill: "white"}} stroke="none" domain={[minWeight, maxWeight]}/>
                            <CartesianGrid strokeDasharray="" horizontal={true} vertical={false} stroke="#ffff"
                                           strokeOpacity={0.2}/>
                            <Tooltip content={<CustomTooltip/>}/>
                            <Line type="monotone" dataKey="weight" stroke="#ffff" fill="#ffff"/>
                            <ReferenceLine y={targetWeight} stroke="#ea580c" strokeDasharray="6 6"/>
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
            <div className="mt-5">
                <div className="text-white montserrat-text text-center text-2xl border rounded p-5">
                    <FontAwesomeIcon className="text-white text-8xl " icon={faUser}/>
                    <p className="font-bold text-5xl p-5">{clientData.FirstName} {clientData.LastName}</p>
                    <p className="p-2">{formatDate(clientData.birthday)}</p>
                    <p className="p-2"><strong>Current:</strong> {weight} kg</p>
                    <p className="p-2"><strong>Target</strong> {targetWeight} kg</p>
                    <p className="p-2 font-semibold text-orange-500">{clientData.plan_name}</p>
                </div>
            </div>
        </div>
    )
}

export default ClientOverview;
