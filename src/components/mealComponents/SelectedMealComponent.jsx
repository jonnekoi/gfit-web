const SelectedMealComponent = ({ selectedMeal, ingredients, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto p-4 z-50">
            <div
                className="bg-gray-900/90 text-white p-4 md:p-6 rounded-xl w-full max-w-6xl shadow-2xl border border-orange-500/30 flex flex-col max-h-[90vh] overflow-hidden">
                <div className="text-center mb-4 md:mb-6">
                    <h2 className="font-bold montserrat-text text-xl md:text-3xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent pb-2">
                        {selectedMeal.meal_name}
                    </h2>
                    <div className="flex items-center justify-center gap-2 md:gap-4 text-gray-300">
                        <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm font-medium text-orange-300">
                            {selectedMeal.meal_category.charAt(0).toUpperCase() + selectedMeal.meal_category.slice(1)}
                        </span>
                    </div>
                    <p className="montserrat-text mt-3 max-w-2xl mx-auto text-gray-300 italic text-sm md:text-base">
                        {selectedMeal.meal_description || "No description available"}
                    </p>
                </div>

                <div className="overflow-auto rounded-lg border border-gray-700/50 mb-4 md:mb-6">
                    <div className="hidden md:block">
                        <table className="w-full text-white">
                            <thead>
                            <tr className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 text-lg font-medium">
                                <th className="p-4 text-center">Calories</th>
                                <th className="p-4 text-center">Protein</th>
                                <th className="p-4 text-center">Carbs</th>
                                <th className="p-4 text-center">Fat</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="bg-gray-800/20">
                                <td className="p-4 poppins-text text-center">
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

                    <div className="md:hidden">
                        <div className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 p-3 text-center font-medium">
                            Nutrition Summary
                        </div>
                        <div className="p-3 bg-gray-800/20">
                            <div className="flex justify-between items-center p-3 mb-2 bg-gray-700/30 rounded">
                                <span className="text-gray-300 font-medium">Calories</span>
                                <span className="px-3 py-1 bg-blue-500/20 rounded-lg text-blue-300 font-medium">
                                    {Number(selectedMeal.total_calories).toFixed(1)} KCAL
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-3 mb-2 bg-gray-700/30 rounded">
                                <span className="text-gray-300 font-medium">Protein</span>
                                <span className="px-3 py-1 bg-green-500/20 rounded-lg text-green-300 font-medium">
                                    {Number(selectedMeal.total_protein).toFixed(1)} G
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-3 mb-2 bg-gray-700/30 rounded">
                                <span className="text-gray-300 font-medium">Carbs</span>
                                <span className="px-3 py-1 bg-purple-500/20 rounded-lg text-purple-300 font-medium">
                                    {Number(selectedMeal.total_carbs).toFixed(1)} G
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded">
                                <span className="text-gray-300 font-medium">Fat</span>
                                <span className="px-3 py-1 bg-orange-500/20 rounded-lg text-orange-300 font-medium">
                                    {Number(selectedMeal.total_fat).toFixed(1)} G
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-auto flex-grow rounded-lg border border-gray-700/50">
                    <div className="hidden md:block">
                        <table className="w-full text-white">
                            <thead>
                            <tr className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 text-lg font-medium">
                                <th className="p-4 text-left">Ingredient</th>
                                <th className="p-4 text-center">Weight (g)</th>
                                <th className="p-4 text-center">Protein / 100g
                                </th>
                                <th className="p-4 text-center">Carbs / 100g
                                </th>
                                <th className="p-4 text-center">Fat / 100g</th>
                                <th className="p-4 text-center">Calories /
                                    100g
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {ingredients.map((ingredient, index) => (
                                <tr key={index}
                                    className={`${index % 2 === 0
                                        ? 'bg-gray-800/20'
                                        : 'bg-transparent'} transition-colors`}>
                                    <td className="p-4 poppins-text font-medium text-orange-400">
                                        {ingredient.ingredient_name}
                                    </td>
                                    <td className="p-4 poppins-text text-center text-gray-300">
                                        {ingredient.ingredient_quantity_g}
                                    </td>
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
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden">
                        <div className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 p-3 text-center font-medium">
                            Ingredients
                        </div>
                        {ingredients.map((ingredient, index) => (
                            <div key={index}
                                 className={`p-3 border-b border-gray-700/50 ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'}`}
                            >
                                <h3 className="font-medium text-orange-400 mb-2">
                                    {ingredient.ingredient_name}
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs">Weight</span>
                                        <span className="text-gray-300">{ingredient.ingredient_quantity_g} g</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs">Protein</span>
                                        <span className="text-gray-300">{ingredient.protein_per_100g} g/100g</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs">Carbs</span>
                                        <span className="text-gray-300">{ingredient.carbs_per_100g} g/100g</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs">Fat</span>
                                        <span className="text-gray-300">{ingredient.fat_per_100g} g/100g</span>
                                    </div>
                                    <div className="flex flex-col col-span-2">
                                        <span className="text-gray-400 text-xs">Calories</span>
                                        <span className="text-gray-300">{ingredient.calories_per_100g} kcal/100g</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-4 md:mt-6">
                    <button
                        onClick={closeModal}
                        className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 w-full sm:w-1/3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelectedMealComponent;
