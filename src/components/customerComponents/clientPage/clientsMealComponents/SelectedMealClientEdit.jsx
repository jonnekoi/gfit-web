import {useState} from "react";

const SelectedMealClientEdit = ({ selectedMeal, ingredients, closeModal, customer, successSave ,deleteMeal, handleIngredientChange, allIngredients, updateMeal }) => {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const toggleEditMode = () => {
        if (!isReadOnly) {
            handleSave();
        }

        setIsReadOnly(!isReadOnly);
        setSearchTerm("");
        setShowSuggestions(false);
    }

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await updateMeal(selectedMeal);
            setIsReadOnly(true);
        } catch (error) {
            console.error("Error saving meal:", error);
        } finally {
            setIsSaving(false);
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === "" || !Array.isArray(allIngredients)) {
            setFilteredIngredients([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = allIngredients.filter(ing =>
            ing &&
            ing.name &&
            typeof ing.name === 'string' &&
            ing.name.toLowerCase().includes(term.toLowerCase()) &&
            !ingredients.some(existingIng => existingIng.ingredient_name === ing.name)
        );

        setFilteredIngredients(filtered);
        setShowSuggestions(filtered.length > 0);
    }

    const addIngredient = (ingredient) => {
        handleIngredientChange(ingredients.length, "new_ingredient", ingredient);
        setSearchTerm("");
        setShowSuggestions(false);
    }

    const removeIngredient = (index) => {
        if (isReadOnly) return;

        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);

        handleIngredientChange(index, "remove_ingredient");
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto p-4">
            <div
                className="bg-gray-900/90 text-white p-6 rounded-xl w-full max-w-6xl shadow-2xl border border-orange-500/30 flex flex-col max-h-[90vh]">
                <div className="text-center mb-6">
                    <h2 className="font-bold montserrat-text text-3xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent pb-2">
                        {selectedMeal.meal_name}
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-gray-300">
                        <p className="montserrat-text font-medium">
                    <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm font-medium text-orange-300">
                        {selectedMeal.meal_category.charAt(0).toUpperCase() + selectedMeal.meal_category.slice(1)}
                    </span>
                        </p>
                    </div>
                    <p className="montserrat-text mt-4 max-w-2xl mx-auto text-gray-300 italic">
                        {selectedMeal.meal_description || "No description available"}
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-700/50 mb-6">
                    <table className="w-full text-white">
                        <thead>
                        <tr className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 text-lg font-medium">
                            <th className="p-4 text-center max-w-24">Calories</th>
                            <th className="p-4 text-center">Protein</th>
                            <th className="p-4 text-center">Carbs</th>
                            <th className="p-4 text-center">Fat</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bg-gray-800/20">
                            <td className="p-4 poppins-text text-center max-w-24">
                            <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">
                                {Number(selectedMeal.total_calories).toFixed(1)} KCAL
                            </span>
                            </td>
                            <td className="p-4 poppins-text text-center">
                            <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">
                                {Number(selectedMeal.total_protein).toFixed(1)} G
                            </span>
                            </td>
                            <td className="p-4 poppins-text text-center">
                            <span className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">
                                {Number(selectedMeal.total_carbs).toFixed(1)} G
                            </span>
                            </td>
                            <td className="p-4 poppins-text text-center">
                            <span className="px-2 py-1 bg-orange-500/10 rounded text-orange-300">
                                {Number(selectedMeal.total_fat).toFixed(1)} G
                            </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-700/50 overflow-y-auto">
                    <table className="w-full text-white">
                        <thead>
                        <tr className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 text-lg font-medium">
                            <th className="p-4 text-left">Ingredient</th>
                            <th className="p-4 text-center">Weight (g)</th>
                            <th className="p-4 text-center">Protein / 100g</th>
                            <th className="p-4 text-center">Carbs / 100g</th>
                            <th className="p-4 text-center">Fat / 100g</th>
                            <th className="p-4 text-center">Calories / 100g</th>
                            {!isReadOnly && <th className="p-4 text-center"></th>}
                        </tr>
                        </thead>
                        <tbody>
                        {ingredients.map((ingredient, index) => (
                            <tr key={index}
                                className={`${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'} transition-colors`}>
                                <td className="p-4 poppins-text font-medium text-orange-400">
                                    {ingredient.ingredient_name}
                                </td>
                                {isReadOnly ? (
                                    <td className="p-4 poppins-text text-center text-gray-300">
                                        {ingredient.ingredient_quantity_g}
                                    </td>
                                ) : (
                                    <td className="p-4 poppins-text text-center">
                                        <input
                                            type="number"
                                            value={ingredient.ingredient_quantity_g}
                                            onChange={(e) => handleIngredientChange(index, "ingredient_quantity_g", e.target.value)}
                                            className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </td>
                                )}
                                <td className="p-4 poppins-text text-center text-gray-300">
                                    {ingredient.protein_per_100g}
                                </td>
                                <td className="p-4 poppins-text text-center text-gray-300">
                                    {ingredient.carbs_per_100g}
                                </td>
                                <td className="p-4 poppins-text text-center text-gray-300">
                                    {ingredient.fat_per_100g}
                                </td>
                                <td className="p-4 poppins-text text-center text-gray-300">
                                    {ingredient.calories_per_100g}
                                </td>
                                {!isReadOnly && (
                                    <td className="p-4 poppins-text text-center">
                                        <button
                                            onClick={() => removeIngredient(index)}
                                            className="p-1 text-red-400 hover:text-red-300 bg-red-500/20 rounded hover:bg-red-500/50  transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {!isReadOnly && (
                    <div className="mt-4 mb-2 relative">
                        <div className="flex w-full">
                            <input
                                type="text"
                                placeholder="Search ingredients..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="p-3 w-full rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>

                        {showSuggestions && filteredIngredients.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredIngredients.map((ingredient, index) => (
                                    <div
                                        key={index}
                                        className="p-3 hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                                        onClick={() => addIngredient(ingredient)}
                                    >
                                        <span className="text-orange-400">{ingredient.name}</span>
                                        <div className="flex gap-2 text-xs text-gray-400">
                                            <span className="px-2 py-1 bg-blue-500/10 rounded">{ingredient.calories_per_100g}kcal</span>
                                            <span className="px-2 py-1 bg-green-500/10 rounded">{ingredient.protein_per_100g}g</span>
                                            <span className="px-2 py-1 bg-purple-500/10 rounded">{ingredient.carbs_per_100g}g</span>
                                            <span className="px-2 py-1 bg-orange-500/10 rounded">{ingredient.fat_per_100g}g</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-row mt-6 gap-4 ">
                    <button
                        onClick={toggleEditMode}
                        disabled={isSaving}
                        className={`text-white bg-gradient-to-r from-orange-600 w-full to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isReadOnly ? "Edit" : "Save"}
                    </button>
                    {customer === true && (
                        <button
                            onClick={deleteMeal}
                            disabled={isSaving}
                            className={`text-white bg-gradient-to-r from-orange-600 w-full to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Delete
                        </button>
                    )}
                    <button
                        onClick={closeModal}
                        disabled={isSaving}
                        className={`text-orange-500 bg-transparent font-bold w-full p-2 bruno-ace-sc-regular rounded-lg border border-orange-500/50 hover:bg-orange-500/10 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Exit
                    </button>
                </div>
                {successSave &&
                    <div className="mt-5 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 montserrat-text text-center font-medium">{successSave}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default SelectedMealClientEdit;
