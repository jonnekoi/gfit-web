import { useNavigate } from "react-router-dom";
import useFetchClients from "../../hooks/useFetchClients";
import { useState } from "react";
import formatDate from "../../scripts/formatDate";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PendingClients = ({ searchQuery }) => {
    const clients = useFetchClients("pending");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;

    if (!clients) {
        return <div className="w-full text-center py-8 text-white">Loading...</div>;
    }

    if (clients.message === "Invalid token") {
        navigate("/login");
        return null;
    }

    const filteredClients = clients.filter(client =>
        `${client.FirstName} ${client.LastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const clientsVisible = filteredClients.slice(startIndex, endIndex);

    const nextPage = () => {
        if (endIndex < filteredClients.length) setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    const StatusBadge = ({ status }) => (
        <span className={`px-3 py-1 rounded ${
            status === 'Active' ? 'bg-green-500/20 text-green-300' :
                status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
        }`}>
            {status}
        </span>
    );

    return (
        <div className="w-full">
            <div className="hidden md:block">
                <table className="w-full text-gray-100 montserrat-text bg-gray-900/60 rounded-lg overflow-hidden shadow-lg">
                    <thead>
                    <tr className="bg-gradient-to-r from-orange-600/80 to-orange-500/60 text-lg font-medium">
                        <th className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Name</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Birthday</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Plan</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
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
                            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                                {client.FirstName} {client.LastName}
                            </td>
                            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                                {formatDate(client.birthday)}
                            </td>
                            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                                <span className="px-3 py-1 bg-orange-500/20 rounded">
                                    {client.plan_name}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                                <StatusBadge status={client.status} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden">
                {clientsVisible.map((client) => (
                    <div
                        key={client.id}
                        className="bg-gray-900/60 rounded-lg p-4 mb-4 shadow-lg cursor-pointer"
                        onClick={() => navigate(`/clients/${client.id}`)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-white">
                                {client.FirstName} {client.LastName}
                            </h3>
                            <StatusBadge status={client.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-gray-300 text-sm">
                            <div>
                                <p className="text-gray-400">Birthday:</p>
                                <p>{formatDate(client.birthday)}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="px-2 py-1 bg-orange-500/20 rounded text-orange-300">
                                    {client.plan_name}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center space-x-2 mt-4 text-white montserrat-text">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded ${
                        currentPage === 0
                            ? "bg-gray-700 cursor-not-allowed opacity-50"
                            : "bg-orange-600 hover:bg-orange-500"
                    }`}
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={endIndex >= filteredClients.length}
                    className={`px-4 py-2 rounded ${
                        endIndex >= filteredClients.length
                            ? "bg-gray-700 cursor-not-allowed opacity-50"
                            : "bg-orange-600 hover:bg-orange-500"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PendingClients;
