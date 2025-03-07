import {useState} from "react";
import AllClients from "../customerComponents/AllClients.jsx";
import PendingClients from "../customerComponents/PendingClients.jsx";
import NewReports from "../customerComponents/NewReports.jsx";
import AddClient from "../customerComponents/AddClient.jsx";

const Customers = () => {
    const [activeSection, setActiveSection] = useState("All Clients");
    const [searchQuery, setSearchQuery] = useState("");


    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? prevSection : section));
    };

    return (
        <div className="w-full justify-center flex flex-col items-center border-t">
            <nav className="space-x-5 mt-5">
                {["All Clients", "Pending Clients", "New Reports", "Add Client",].map((section) => (
                <button
                    key={section}
                    className="text-white font-bold bg-orange-500 montserrat-text text-1xl border min-w-48 border-orange-500 p-2 rounded"
                    onClick={() => handleSectionClick(section)}>{section}
                </button>
                ))}
                <input
                    className="p-2 rounded"
                    placeholder="Search client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                /></nav>
            <div className="flex w-2/3 justify-center mt-5">
                {activeSection === "All Clients" && (<AllClients searchQuery={searchQuery}/>)}
                {activeSection === "Pending Clients" && (<PendingClients searchQuery={searchQuery}/>)}
                {activeSection === "New Reports" && (<NewReports/>)}
                {activeSection === "Add Client" && (<AddClient/>)}
            </div>
        </div>
    )
}

export default Customers;
