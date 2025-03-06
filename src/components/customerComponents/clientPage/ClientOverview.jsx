import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from "react";
import {
    LineChart,
    ReferenceLine,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const url = 'http://127.0.0.1:3000/v1';


const ClientOverview = ({ client }) => {
    const [clientWeights, setClientWeights] = useState(null);

    const clientData = client;

    const clientId = clientData.id;

    console.log(clientData);

    const fetchClientWeights = async () => {
        try {
            const response = await fetch(url + "/clients/weight/" + clientId);
            const data = await response.json();
            setClientWeights(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchClientWeights();
    }, []);

    if (!clientWeights) {
        return <div></div>
    }

    console.log(clientWeights);

    // Sort clientWeights by date
    // Sort clientWeights by date
    const sortedWeights = clientWeights.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Prepare data for chart
    const data = sortedWeights.map(weight => ({
        date: new Date(weight.date).toLocaleDateString(),
        weight: parseFloat(weight.weight)
    }));



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day} / ${month} / ${year}`;
    };

    const weight = clientData.weight;
    const targetWeight = clientData.targetWeight;


    return (
        <div className="grid grid-cols-4">
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
            <div className="col-span-2 mt-10 items-center">
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
                    <XAxis dataKey="date" tick={{ fill: "white" }} stroke="white"/>
                    <YAxis tickCount={10} tick={{ fill: "white" }} stroke="white" domain={[
                        (dataMin) => Math.floor(dataMin * 0.9),
                        (dataMax) => Math.ceil(dataMax * 1.1)
                    ]}/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="weight" stroke="#ea580c" fill="#ffff"/>
                    <ReferenceLine y={targetWeight} stroke="white" strokeDasharray="3 3" />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ClientOverview;
