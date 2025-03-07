import { useNavigate } from "react-router-dom";
import useFetchClients from "../../hooks/useFetchClients";
import {useState} from "react";

const PendingClients = () => {
    const clients = useFetchClients("pending");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;

    if (!clients) {
        return <div></div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate());
        const month = String(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${day} / ${month} / ${year}`;
    };

    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const clientsVisible = clients.slice(startIndex, endIndex);

    const nextPage = () => {
        if (endIndex < clients.length) setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
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
                {clientsVisible.map((client) => (
                    <tr
                        key={client.id}
                        className="cursor-pointer text-center"
                        onClick={() => navigate(`/clients/${client.id}`)}
                    >
                        <td className="p-4 border-b border-b-orange-500">
                            {client.FirstName} {client.LastName}
                        </td>
                        <td className="p-4 border-b border-b-orange-500">
                            {formatDate(client.birthday)}
                        </td>
                        <td className="p-4 border-b border-b-orange-500">
                            {client.plan_name}
                        </td>
                        <td className="p-4 border-b border-orange-500">
                            {client.status}
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
