import {useState} from "react";
import AllMeals from "../mealComponents/AllMeals.jsx";
import CreateMeal from "../mealComponents/CreateMeal.jsx";

const Meals = () => {
    const [activeSection, setActiveSection] = useState("All Meals");

    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? null : section));
        console.log(activeSection);
    };

    return (
        <div className="w-full justify-center flex flex-col items-center border-t">
            <nav className="space-x-5 mt-5">
                {["All Meals", "Craft Meals"].map((section) => (
                        <button
                            key={section}
                            className="text-white min-w-44 bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    )
                )}
            </nav>
            <div className="flex w-full justify-center mt-5">
                {activeSection === "All Meals" && (<AllMeals/>)}
                {activeSection === "Craft Meal" && (<CreateMeal/>)}
            </div>
        </div>
    )
}

export default Meals;
