import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const URL = "http://127.0.0.1:3000/v1";


const AllClients = () => {
    const [clients, setClients] = useState(null);
    const navigate = useNavigate();


    const fecthClients = async () => {
        try {
            const response = await fetch(URL + "/clients");
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthClients();
    }, []);


    if (!clients) {
        return <div>Loading...</div>
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day} / ${month} / ${year}`;
    };




    return (
        <div className="w-full">
            <table className="w-full text-white montserrat-text">
                <thead>
                <tr className="border-b border-b-orange-500 text-2xl font-bold text-center">
                    <th className="p-5">Name</th>
                    <th className="p-5">Birthday</th>
                    <th className="p-5">Plan</th>
                    <th className="p-5">Status</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id} className="cursor-pointer text-center" onClick={() => navigate(`/clients/${client.id}`)}>
                        <td className="p-4 border-b border-b-orange-500">{client.FirstName} {client.LastName}</td>
                        <td className="p-4 border-b border-b-orange-500">{formatDate(client.birthday)}</td>
                        <td className="p-4 border-b border-b-orange-500">{client.plan_name}</td>
                        <td className="p-4 border-b border-orange-500">{client.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllClients;
