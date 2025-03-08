const selectedMealComponent = ({ selectedMeal, ingredients, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55">
            <div className="väribg text-white p-8 rounded max-w-5xl w-full text-center">
                <h2 className="font-bold montserrat-text text-2xl pb-2">{selectedMeal.meal_name || "Unnamed Meal"}</h2>
                <p className="montserrat-text font-bold text-1xl">{selectedMeal.meal_category}</p>
                <p className="montserrat-text m-2"></p>
                <p className="montserrat-text m-2">{selectedMeal.meal_description}</p>
                <div className="flex flex-row justify-center">
                    <table>
                        <thead className="text-orange-500">
                        <tr>
                            <th className="m-2 montserrat-text p-5">Calories</th>
                            <th className="m-2 montserrat-text p-5">Protein</th>
                            <th className="m-2 montserrat-text p-5">Carbs</th>
                            <th className="m-2 montserrat-text p-5">Fat</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{Number(selectedMeal.total_calories).toFixed(1)} g</td>
                            <td>{Number(selectedMeal.total_protein).toFixed(1)} g</td>
                            <td>{Number(selectedMeal.total_carbs).toFixed(1)} g</td>
                            <td>{Number(selectedMeal.total_fat).toFixed(1)} g</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <ul>
                    <div className="flex justify-center">
                        <table className="w-full">
                            <thead className="">
                            <tr>
                                <th className="m-2 montserrat-text p-5">Name</th>
                                <th className="m-2 montserrat-text p-5">Weight (g)</th>
                                <th className="m-2 montserrat-text p-5">Protein / 100g</th>
                                <th className="m-2 montserrat-text p-5">Carbs / 100g</th>
                                <th className="m-2 montserrat-text p-5">Fat / 100g</th>
                                <th className="m-2 montserrat-text p-5">Calories / 100g</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ingredients.map((ingredient, index) => (
                                <tr key={index}>
                                    <td className="m-2 poppins-text p-2 text-orange-500">{ingredient.ingredient_name}</td>
                                    <td className="m-2 poppins-text p-2">{ingredient.ingredient_quantity_g}</td>
                                    <td className="m-2 poppins-text p-2">{ingredient.protein_per_100g}</td>
                                    <td className="m-2 poppins-text p-2">{ingredient.carbs_per_100g}</td>
                                    <td className="m-2 poppins-text p-2">{ingredient.fat_per_100g}</td>
                                    <td className="m-2 poppins-text p-2">{ingredient.calories_per_100g}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </ul>
                <div className="flex flex-row justify-center">
                    <button onClick={closeModal}
                            className="text-white bg-orange-500 font-bold p-2 mt-5 w-1/3 montserrat-text text-1xl border border-orange-500 rounded hover:border-orange-300">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default selectedMealComponent;
