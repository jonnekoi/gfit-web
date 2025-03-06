import {useState} from "react";
import AllMeals from "../mealComponents/AllMeals.jsx";
import CreateMeal from "../mealComponents/CreateMeal.jsx";

const Meals = () => {
    const [activeSection, setActiveSection] = useState(null);

    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? null : section));
        console.log(activeSection);
    };

    return (
        <div className="w-full justify-center flex flex-col items-center">
            <nav className="space-x-5 mt-5">
                {["All Meals", "Craft Meal"].map((section) => (
                    section === "Craft Meal" ? (
                        <button
                            key={section}
                            className="text-white font-bold bg-orange-500 montserrat-text text-1xl border min-w-48 border-orange-500 p-2 rounded"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    ) : (
                        <button
                            key={section}
                            className="text-white font-bold montserrat-text text-1xl border border-orange-500 p-2 min-w-48 rounded hover:border-orange-300"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    )
                ))}
            </nav>
            <div className="flex justify-center mt-5">
                {activeSection === "All Meals" && (<AllMeals/>)}
                {activeSection === "Craft Meal" && (<CreateMeal/>)}
            </div>
        </div>
    )
}

export default Meals;
