import {useState} from "react";
import AllMeals from "../mealComponents/AllMeals.jsx";
import CreateMeal from "../mealComponents/CreateMeal.jsx";
import AddIngredient from "../mealComponents/AddIngredient.jsx";

const Meals = () => {
    const [activeSection, setActiveSection] = useState(null);

    const handleSectionClick = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? null : section));
        console.log(activeSection);
    };

    return (
        <div className="">
            <nav className="space-x-5 mt-5">
                {["All Meals", "Craft Meal", "Add Ingredient"].map((section) => (
                    section === "Add Ingredient" ? (
                        <button
                            key={section}
                            className="text-white font-bold bg-orange-500 montserrat-text text-1xl border border-orange-500 p-2 rounded"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    ) : (
                        <button
                            key={section}
                            className="text-white font-bold montserrat-text text-1xl border border-orange-500 p-2 rounded hover:border-orange-300"
                            onClick={() => handleSectionClick(section)}>{section}
                        </button>
                    )
                ))}
            </nav>
            <div className="flex justify-center mt-5">
                {activeSection === "All Meals" && (<AllMeals/>)}
                {activeSection === "Craft Meal" && (<CreateMeal/>)}
                {activeSection === "Add Ingredient" && (<AddIngredient/>)}
            </div>
        </div>
    )
}

export default Meals;
