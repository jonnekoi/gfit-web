import { useState } from "react";
import AllClients from "../customerComponents/AllClients.jsx";
import PendingClients from "../customerComponents/PendingClients.jsx";
import NewReports from "../customerComponents/NewReports.jsx";
import AddClient from "../customerComponents/AddClient.jsx";
import Button from "../../buttons/Button.jsx";

const Customers = () => {
  const [activeSection, setActiveSection] = useState("All Clients");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const sections = ["All Clients", "Pending Clients", "New Reports", "Add Client"];

  return (
      <div className="w-full flex flex-col">
        <div className="flex flex-col items-center w-full mt-5 px-4">
          <nav className="flex flex-wrap gap-2">
            {sections.map((section) => (
                <Button
                    key={section}
                    text={section}
                    active={activeSection === section}
                    onClick={() => handleSectionClick(section)}
                />
            ))}
            <input
                className="w-full sm:w-auto p-2 rounded border border-gray-300 bg-gray-800 text-white"
                placeholder="Search client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
          </nav>
        </div>

        <div className="m-auto w-2/3 mt-5">
          {activeSection === 'All Clients' && <AllClients searchQuery={searchQuery}/>}
          {activeSection === 'Pending Clients' && <PendingClients searchQuery={searchQuery}/>}
          {activeSection === "New Reports" && <NewReports />}
          {activeSection === "Add Client" && <AddClient />}
        </div>
      </div>
  );
}

export default Customers;
