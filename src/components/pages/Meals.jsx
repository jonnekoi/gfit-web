import {useState} from "react";
import AllMeals from "../mealComponents/AllMeals.jsx";
import CreateMeal from "../mealComponents/CreateMeal.jsx";
import Button from "../../buttons/Button.jsx";

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
                        <Button
                            text={section}
                            key={section}
                            onClick={() => handleSectionClick(section)}>{section}
                        </Button>
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
