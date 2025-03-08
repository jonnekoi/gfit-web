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
                <div className="custom-tooltip bg-orange-500 text-white p-2 rounded">
                    <p><strong>{date}</strong></p>
                    <p><strong>{weight}</strong></p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="w-full grid space-x-5 grid-cols-3">
            <div className=" mt-5 items-center">
                {!notWeightData && (
                    <h1 className="text-xl text-center text-orange-500 michroma-regular">Weight Progress</h1>
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
        </div>
    )
}

export default ClientOverview;
