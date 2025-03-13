import { useNavigate } from "react-router-dom";
import useFetchClients from "../../hooks/useFetchClients";
import {useState} from "react";
import formatDate from "../../scripts/formatDate";
import {faSort} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const PendingClients = ({ searchQuery }) => {
    const clients = useFetchClients("pending");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;

    if (!clients) {
        return <div></div>;
    }

    if (clients.message === "Invalid token") {
        navigate("/login");
    }

    const filteredClients = clients.filter(client =>
        `${client.FirstName} ${client.LastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const clientsVisible = filteredClients.slice(startIndex, endIndex);

    const nextPage = () => {
        if (endIndex < clients.length) setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="w-2/3">
            <table className="w-full text-gray-100 montserrat-text bg-gray-900/40 rounded-lg overflow-hidden shadow-lg">
                <thead>
                <tr className="bg-gradient-to-r from-orange-600/80 to-orange-500/60 text-lg font-medium">
                    <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                        <div className="flex items-center justify-center space-x-2">
                            <span>Name</span>
                            <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                        </div>
                    </th>
                    <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                        <div className="flex items-center justify-center space-x-2">
                            <span>Birthday</span>
                            <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                        </div>
                    </th>
                    <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                        <div className="flex items-center justify-center space-x-2">
                            <span>Plan</span>
                            <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                        </div>
                    </th>
                    <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                        <div className="flex items-center justify-center space-x-2">
                            <span>Status</span>
                            <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {clientsVisible.map((client, index) => (
                    <tr
                        key={client.id}
                        className={`transition-colors hover:bg-orange-500/10 cursor-pointer ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'}`}
                        onClick={() => navigate(`/clients/${client.id}`)}
                    >
                        <td className="px-6 py-4 text-center border-b border-orange-500/20 max-w-36">
                            {client.FirstName} {client.LastName}
                        </td>
                        <td className="px-6 py-4 text-center border-b border-orange-500/20 max-w-36">
                            {formatDate(client.birthday)}
                        </td>
                        <td className="px-6 py-4 text-center border-b border-orange-500/20 max-w-36">
                <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm">
                    {client.plan_name}
                </span>
                        </td>
                        <td className="px-6 py-4 text-center border-b border-orange-500/20 max-w-36">
                <span className={`px-3 py-1 rounded-full text-sm ${
                    client.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                        client.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                }`}>
                    {client.status}
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4 text-white montserrat-text text-1xl">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded ${
                        currentPage === 0 ? "cursor-not-allowed" : "text-white"
                    }`}
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={endIndex >= clients.length}
                    className={`px-4 py-2 rounded ${
                        endIndex >= clients.length ? "cursor-not-allowed" : "text-white"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PendingClients;
