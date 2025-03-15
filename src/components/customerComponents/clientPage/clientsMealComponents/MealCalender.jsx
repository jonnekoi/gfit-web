import React, {useEffect, useState} from "react";
import SelectedMealClientEdit from "./SelectedMealClientEdit.jsx";

const url = 'http://127.0.0.1:3000/v1';

const MealCalender = ({ meals: initialMeals , userId }) => {
    const [meals, setMeals] = useState(initialMeals);
    const [selectedMealActive, setSelectedMealActive] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [ingredients, setIngredients] = useState(null);
    const [allIngredients, setAllIngredients] = useState(null);
    const [error, setError] = useState("");
    const customer = true;
    const [successSave, setSuccessSave] = useState("");

    const getAllIngredients = async () => {
        try {
            const response = await fetch(url + '/meals/ingredients');
            const ingredients = await response.json();

            if (response.error) {
                throw new Error(ingredients.error);
            } else {
                setAllIngredients(ingredients);
            }
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
    }

    const handleEditClick = (e, meal) => {
        e.stopPropagation();
        setSuccessSave("");
        setError("");
        setSelectedMealActive(true);
        setSelectedMeal(meal);
        setIngredients(meal.ingredients);
    }

    const closeEditModal = () => {
        setSelectedMealActive(false);
        setSelectedMeal(null);
        setIngredients(null);
    }

    const updateMeal = async (updatedMeal) => {
        setError("");
        setSuccessSave("");
        try {
            const body = {
                user_id: userId,
                meal_id: updatedMeal.meal_id,
                meal_name: updatedMeal.meal_name,
                meal_description: updatedMeal.meal_description,
                meal_category: updatedMeal.meal_category,
                total_calories: updatedMeal.total_calories,
                total_protein: updatedMeal.total_protein,
                total_carbs: updatedMeal.total_carbs,
                total_fat: updatedMeal.total_fat,
                ingredients: updatedMeal.ingredients.map(ing => ({
                    ingredient_id: ing.ingredient_id,
                    ingredient_quantity_g: parseFloat(ing.ingredient_quantity_g)
                }))
            };

            const fetchOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            const response = await fetch(url + '/meals/client/update', fetchOptions);

            const result = await response.json();

            if (!response.ok) {
                setError('Failed to update meal');
                throw new Error(result.error || 'Failed to update meal');
            }
            if (response.status === 201) {
                setSuccessSave("Meal updated successfully");

            }

            const updatedMeals = {...meals};
            const category = updatedMeal.meal_category;

            if (updatedMeals[category]) {
                updatedMeals[category] = updatedMeals[category].map(meal =>
                    meal.meal_id === updatedMeal.meal_id ? updatedMeal : meal
                );
                setMeals(updatedMeals);
            }

            return result;

        } catch (error) {
            console.error("Error updating meal:", error);
            setError("Failed to update meal. Please try again.");
            throw error;
        }
    }
    // TODO: IMPLEMENT DELETE MEAL ON BACKEND
    const deleteMeal = async () => {
        if (!selectedMeal) return;

        if (!confirm("Are you sure you want to delete this meal?")) {
            return;
        }
        try {
            const response = await fetch(`${url}/meals/${selectedMeal.meal_id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Failed to delete meal');
            }

            const updatedMeals = {...meals};
            const category = selectedMeal.meal_category;

            if (updatedMeals[category]) {
                updatedMeals[category] = updatedMeals[category].filter(meal =>
                    meal.meal_id !== selectedMeal.meal_id
                );
                setMeals(updatedMeals);
            }

            closeEditModal();

        } catch (error) {
            console.error("Error deleting meal:", error);
            setError("Failed to delete meal. Please try again.");
        }
    }

    const handleIngredientChange = (index, key, value) => {
        const newIngredients = [...ingredients];

        if (key === "new_ingredient") {
            const newIngredient = {
                ingredient_id: value.id,
                ingredient_name: value.name,
                ingredient_quantity_g: value.ingredient_quantity_g || 0,
                protein_per_100g: value.protein_per_100g,
                carbs_per_100g: value.carbs_per_100g,
                fat_per_100g: value.fat_per_100g,
                calories_per_100g: value.calories_per_100g
            };

            newIngredients.push(newIngredient);
        } else if (key === "remove_ingredient") {
            newIngredients.splice(index, 1);
        } else {
            newIngredients[index][key] = value;
        }

        setIngredients(newIngredients);

        if (selectedMeal) {
            const updatedMeal = {...selectedMeal};

            let totalProtein = 0;
            let totalCarbs = 0;
            let totalFat = 0;
            let totalCalories = 0;

            newIngredients.forEach(ing => {
                const quantity = parseFloat(ing.ingredient_quantity_g) / 100;
                totalProtein += parseFloat(ing.protein_per_100g) * quantity;
                totalCarbs += parseFloat(ing.carbs_per_100g) * quantity;
                totalFat += parseFloat(ing.fat_per_100g) * quantity;
                totalCalories += parseFloat(ing.calories_per_100g) * quantity;
            });

            updatedMeal.total_protein = totalProtein;
            updatedMeal.total_carbs = totalCarbs;
            updatedMeal.total_fat = totalFat;
            updatedMeal.total_calories = totalCalories;
            updatedMeal.ingredients = newIngredients;

            setSelectedMeal(updatedMeal);
        }
    }

    useEffect(() => {
        getAllIngredients();
    }, []);

    return (
        <>
            <div className="flex flex-col mt-6">
                <div className="flex justify-end gap-4 text-sm text-gray-300 mb-3 px-2">
                    <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">Calories</span>
                    <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">Protein</span>
                    <span className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">Carbs</span>
                    <span className="px-2 py-1 bg-orange-500/10 rounded text-orange-300">Fat</span>
                </div>

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
                                                    <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">
                                                        {Number(meal.total_calories).toFixed(1)} KCAL
                                                    </span>
                                                        <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">
                                                        {Number(meal.total_protein).toFixed(1)} G
                                                    </span>
                                                        <span
                                                            className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">
                                                        {Number(meal.total_carbs).toFixed(1)} G
                                                    </span>
                                                        <span
                                                            className="px-2 py-1 bg-orange-500/10 rounded text-orange-300">
                                                        {Number(meal.total_fat).toFixed(1)} G
                                                    </span>
                                                        <button
                                                            onClick={(e) => handleEditClick(e, meal)}
                                                            className="px-2 py-1 bg-white/20 rounded hover:bg-orange-500/40 transition-colors">
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
            {selectedMealActive &&
                <SelectedMealClientEdit
                    allIngredients={allIngredients}
                    deleteMeal={deleteMeal}
                    updateMeal={updateMeal}
                    handleIngredientChange={handleIngredientChange}
                    selectedMeal={selectedMeal}
                    ingredients={ingredients}
                    customer={customer}
                    closeModal={closeEditModal}
                    successSave={successSave}
                    error={error}
                />
            }
        </>
    );
};

export default MealCalender;
