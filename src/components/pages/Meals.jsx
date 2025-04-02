import { useState } from "react";
import AllMeals from "../mealComponents/AllMeals.jsx";
import CreateMeal from "../mealComponents/CreateMeal.jsx";
import Button from "../../buttons/Button.jsx";

const Meals = () => {
  const [activeSection, setActiveSection] = useState("All Meals");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const sections = ["All Meals", "Craft Meal"];

  return (
      <div className="w-full flex flex-col items-center px-4">
        <nav className="flex flex-wrap justify-center gap-2 mt-5 w-full">
          {sections.map((section) => (
              <Button
                  key={section}
                  text={section}
                  active={activeSection === section}
                  onClick={() => handleSectionClick(section)}
              />
          ))}
        </nav>

        <div className="flex w-full justify-center mt-5">
          {activeSection === "All Meals" && <AllMeals />}
          {activeSection === "Craft Meal" && <CreateMeal />}
        </div>
      </div>
  );
}

export default Meals;
