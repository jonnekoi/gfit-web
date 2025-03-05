import {useState} from "react";
import AllClients from "../customerComponents/AllClients.jsx";
import NewClients from "../customerComponents/NewClients.jsx";
import NewReports from "../customerComponents/NewReports.jsx";
import EndingClients from "../customerComponents/EndingClients.jsx";
import AddClient from "../customerComponents/AddClient.jsx";

const Customers = () => {
    const [activeSection, setActiveSection] = useState(null);

    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? null : section));
    };

    return (
        <div className="">
            <nav className="space-x-5 mt-5">
                {["All Clients", "New Clients", "New Reports", "Ending Clients", "Add Client",].map((section) => (
                    section === "Add Client" ? (
                        <button
                        key={section}
                        className="text-white font-bold bg-orange-500 montserrat-text text-1xl border min-w-56 border-orange-500 p-2 rounded"
                        onClick={() => handleSectionClick(section)}>{section}
                    </button>
                        ) : (
                <button
                    key={section}
                    className="text-white font-bold montserrat-text text-1xl border border-orange-500 p-2 rounded min-w-56 hover:border-orange-300"
                    onClick={() => handleSectionClick(section)}>{section}
                </button>
                )))}
                </nav>
            <div className="flex justify-center mt-5">
                {activeSection === "All Clients" && (<AllClients/>)}
                {activeSection === "New Clients" && (<NewClients/>)}
                {activeSection === "New Reports" && (<NewReports/>)}
                {activeSection === "Ending Clients" && (<EndingClients/>)}
                {activeSection === "Add Client" && (<AddClient/>)}
            </div>
        </div>
    )
}

export default Customers;
