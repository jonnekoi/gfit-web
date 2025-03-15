import React from 'react';

const TargetsBars = ({ targets, meals }) => {
    const target = targets[0];

    const calculateDailyTotals = () => {
        if (!meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

        const totals = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        };

        Object.keys(meals).forEach(categoryName => {
            const categoryMeals = meals[categoryName];

            if (Array.isArray(categoryMeals) && categoryMeals.length > 0) {
                const categoryTotals = {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0
                };

                categoryMeals.forEach(meal => {
                    categoryTotals.calories += Number(meal.total_calories || 0);
                    categoryTotals.protein += Number(meal.total_protein || 0);
                    categoryTotals.carbs += Number(meal.total_carbs || 0);
                    categoryTotals.fat += Number(meal.total_fat || 0);
                });

                const mealCount = categoryMeals.length;
                const categoryAverages = {
                    calories: categoryTotals.calories / mealCount,
                    protein: categoryTotals.protein / mealCount,
                    carbs: categoryTotals.carbs / mealCount,
                    fat: categoryTotals.fat / mealCount
                };

                totals.calories += categoryAverages.calories;
                totals.protein += categoryAverages.protein;
                totals.carbs += categoryAverages.carbs;
                totals.fat += categoryAverages.fat;
            }
        });

        return totals;
    };

    const dailyTotals = calculateDailyTotals();

    const percentages = {
        calories: Math.min(100, Math.round((dailyTotals.calories / target.calories_target) * 100)) || 0,
        protein: Math.min(100, Math.round((dailyTotals.protein / target.protein_target) * 100)) || 0,
        carbs: Math.min(100, Math.round((dailyTotals.carbs / target.carbs_target) * 100)) || 0,
        fat: Math.min(100, Math.round((dailyTotals.fat / target.fat_target) * 100)) || 0
    };

    return (
        <div className="w-full">
            <div className="text-xs text-gray-400 mb-2">
                Showing daily averages, assuming client picks one meal from each category
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-blue-300 poppins-text">CALORIES</span>
                        <span className="text-xs text-gray-300 poppins-text">
                            {Math.round(dailyTotals.calories)}/{target.calories_target}kcal
                        </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                            style={{ width: `${percentages.calories}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-green-300 poppins-text">PROTEIN</span>
                        <span className="text-xs text-gray-300 poppins-text">
                            {Math.round(dailyTotals.protein)}/{target.protein_target}g
                        </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-600 to-green-400"
                            style={{ width: `${percentages.protein}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-purple-300 poppins-text">CARBS</span>
                        <span className="text-xs text-gray-300 poppins-text">
                            {Math.round(dailyTotals.carbs)}/{target.carbs_target}g
                        </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                            style={{ width: `${percentages.carbs}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-orange-300 poppins-text">FAT</span>
                        <span className="text-xs text-gray-300 poppins-text">
                            {Math.round(dailyTotals.fat)}/{target.fat_target}g
                        </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                            style={{ width: `${percentages.fat}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TargetsBars;
