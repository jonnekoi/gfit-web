import { useState, useEffect } from "react";

const url = 'http://127.0.0.1:3000/v1';

const AddMealModal = ({ closeModal, userId, onMealAdded }) => {
    const [selectedCategory, setSelectedCategory] = useState("breakfast");
    const [meals, setMeals] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    });
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetchAllMeals();
    }, []);

    const fetchAllMeals = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(url + "/meals");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const allMeals = await response.json();

            const mealsArray = allMeals.meals;

            const categorizedMeals = {
                breakfast: [],
                lunch: [],
                dinner: [],
                snacks: []
            };

            if (Array.isArray(mealsArray)) {
                mealsArray.forEach(meal => {
                    const category = meal.meal_category?.toLowerCase() || "snacks";
                    if (categorizedMeals[category]) {
                        categorizedMeals[category].push(meal);
                    } else {
                        categorizedMeals.snacks.push(meal);
                    }
                });
            }

            setMeals(categorizedMeals);

        } catch (error) {
            console.error("Error fetching meals:", error);
            setError("Failed to load available meals");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedMeal(null);
    };

    const handleMealSelection = (meal) => {
        setSelectedMeal(meal);
    };

    const handleSave = async () => {
        if (!selectedMeal) {
            setError("Please select a meal");
            return;
        }

        try {
            setIsSaving(true);
            setError("");

            const formattedIngredients = selectedMeal.ingredients.map(ingredient => ({
                ingredient_id: ingredient.ingredient_id,
                quantity_g: ingredient.ingredient_quantity_g
            }));

            const meal = {
                meal_id: selectedMeal.meal_id,
                meal_category: selectedCategory,
                ingredients: formattedIngredients
            };

            const response = await fetch(`${url}/meals/client/add/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ meal })
            });

            if (!response.ok) {
                throw new Error('Failed to add meal');
            }

            setSuccessMessage("Meal added successfully!");

            if (onMealAdded) {
                onMealAdded();
            }

        } catch (error) {
            console.error("Error adding meal:", error);
            setError("Failed to add meal. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto p-4 z-50">
            <div className="bg-gray-900/90 text-white p-6 rounded-xl w-full max-w-4xl shadow-2xl border border-orange-500/30 flex flex-col max-h-[90vh] overflow-y-auto">
                <div className="text-center mb-6">
                    <h2 className="font-bold montserrat-text text-3xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent pb-2">
                        Add Meal
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="flex space-x-2 bg-gray-800/50 p-1 rounded-lg">
                                {Object.keys(meals).map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`px-4 py-2 rounded-lg transition-all ${
                                            selectedCategory === category
                                                ? "bg-orange-500 text-white"
                                                : "bg-transparent text-gray-300 hover:bg-gray-700/50"
                                        }`}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {meals[selectedCategory] && meals[selectedCategory].length > 0 ? (
                                meals[selectedCategory].map((meal) => (
                                    <div
                                        key={meal.meal_id}
                                        onClick={() => handleMealSelection(meal)}
                                        className={`bg-gray-800/40 rounded-lg p-4 border transition-all cursor-pointer hover:bg-gray-800/70 ${
                                            selectedMeal && selectedMeal.meal_id === meal.meal_id
                                                ? "border-orange-500 ring-2 ring-orange-500/30"
                                                : "border-gray-700/50 hover:border-orange-500/30"
                                        }`}
                                    >
                                        <h3 className="font-medium text-lg text-orange-400 mb-2">
                                            {meal.meal_name}
                                        </h3>
                                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                            {meal.meal_description || "No description available"}
                                        </p>
                                        <div className="grid grid-cols-4 gap-2 text-xs">
                                            <div className="bg-blue-500/10 rounded p-1 text-center">
                                                <span className="block text-blue-300">{Number(meal.total_calories).toFixed(1)}</span>
                                                <span className="text-gray-400">kcal</span>
                                            </div>
                                            <div className="bg-green-500/10 rounded p-1 text-center">
                                                <span className="block text-green-300">{Number(meal.total_protein).toFixed(1)}</span>
                                                <span className="text-gray-400">protein</span>
                                            </div>
                                            <div className="bg-purple-500/10 rounded p-1 text-center">
                                                <span className="block text-purple-300">{Number(meal.total_carbs).toFixed(1)}</span>
                                                <span className="text-gray-400">carbs</span>
                                            </div>
                                            <div className="bg-orange-500/10 rounded p-1 text-center">
                                                <span className="block text-orange-300">{Number(meal.total_fat).toFixed(1)}</span>
                                                <span className="text-gray-400">fat</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-8 text-gray-400">
                                    No meals available for this category
                                </div>
                            )}
                        </div>
                    </>
                )}

                <div className="flex flex-row mt-6 gap-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !selectedMeal || isLoading}
                        className={`text-white bg-gradient-to-r from-orange-600
                        to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md
                        hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105
                        w-full ${(isSaving || !selectedMeal || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? "Adding..." : "Add Selected Meal"}
                    </button>
                    <button
                        onClick={closeModal}
                        disabled={isSaving}
                        className={`text-orange-500 bg-transparent font-bold p-2
                        bruno-ace-sc-regular rounded-lg border border-orange-500/50
                        hover:bg-orange-500/10 w-full ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Cancel
                    </button>
                </div>

                {successMessage && (
                    <div className="mt-5 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 montserrat-text text-center font-medium">{successMessage}</p>
                    </div>
                )}
                {error && (
                    <div className="mt-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 montserrat-text text-center font-medium">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddMealModal;
