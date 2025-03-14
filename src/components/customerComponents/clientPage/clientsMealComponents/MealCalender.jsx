import React from "react";

const MealCalender = ({ meals }) => {
    /*
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (e, meal) => {
        e.stopPropagation();
        setSelectedWorkout(meal);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMeal(null);
    };

    */


    const roundToTwoDecimals = (num) => {
        return Math.round(num * 100) / 100;
    };

    return (
        <div className="flex flex-col mt-6">
            <div className="flex flex-col gap-4">
                {Object.keys(meals).map(category => {
                    const mealsForCategory = meals[category];
                    return (
                        <div key={category} className="overflow-hidden shadow-lg rounded-lg bg-gray-900/40">
                            <h3 className="px-6 py-4 bg-gradient-to-r from-orange-600/80 to-orange-500/60 text-lg font-medium text-gray-100 bruno-ace-sc-regular">
                                {category}
                            </h3>
                            <div className="p-3 rounded-b-lg">
                                {mealsForCategory.length === 0 ? (
                                    <p className="text-gray-400 montserrat-text px-2 py-3">No recipies</p>
                                ) : (
                                    <ul className="mt-2 divide-y divide-orange-500/20">
                                        {mealsForCategory.map((meal, index) => (
                                            <li key={index}
                                                className="text-gray-100 montserrat-text p-3 flex items-center justify-between transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-medium">{meal.meal_name}</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm">
                                                        {roundToTwoDecimals(meal.total_calories)} kcal
                                                    </span>
                                                    <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm">
                                                        {roundToTwoDecimals(meal.total_protein)} g
                                                    </span>
                                                    <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm">
                                                        {roundToTwoDecimals(meal.total_carbs)} g
                                                    </span>
                                                    <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm">
                                                        {roundToTwoDecimals(meal.total_fat)} g
                                                    </span>
                                                    <button
                                                        onClick={(e) => handleEditClick(e, meal)}
                                                        className="px-3 py-1 bg-white/20 rounded-full text-sm hover:bg-orange-500/40 transition-colors">
                                                        Edit
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MealCalender;
