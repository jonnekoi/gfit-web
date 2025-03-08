import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort} from "@fortawesome/free-solid-svg-icons";
import formatDate from "../../scripts/formatDate.js";

const URL = "http://127.0.0.1:3000/v1";

const AllMeals = () => {
    const token = sessionStorage.getItem("token");
    const [meals, setMeals] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [ingredients, setIngredients] = useState([]);



    const fecthMeals = async () => {
        const fetchOptions = {
            method: "GET",
            headers: {
                'authorization': 'Bearer ' + token,
            }
        };
        try {
            const response = await fetch(URL + "/meals", fetchOptions);
            const data = await response.json();
            console.log(data);
            setMeals(data.meals); // No need to process further
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fecthMeals();
    }, []);

    if (!meals) {
        return <div></div>;
    }

    const toggleVisibility = (meal) => {
        setSelectedMeal(meal);
        setIngredients(meal.ingredients.map(ingredient => ({ ...ingredient })));
    }

    const closeModal = () => {
        setSelectedMeal(null);
    };

    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleMeals = meals.slice(startIndex, endIndex);

    console.log(visibleMeals);


    const nextPage = () => {
        if (endIndex < meals.length) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    return (
        <>
            <div className="w-2/3">
                <table className="w-full text-white montserrat-text">
                    <thead>
                    <tr className="border-b border-b-orange-500 text-2xl font-bold text-center">
                        <th className="p-5 cursor-pointer">
                            Name <FontAwesomeIcon icon={faSort} className="text-1"/>
                        </th>
                        <th className="p-5 cursor-pointer">
                            Category <FontAwesomeIcon icon={faSort} className="text-1"/>
                        </th>
                        <th className="p-5 cursor-pointer">
                            Protein <FontAwesomeIcon icon={faSort} className="text-1"/>
                        </th>
                        <th className="p-5 cursor-pointer">
                            Carbs <FontAwesomeIcon icon={faSort} className="text-1"/>
                        </th>
                        <th className="p-5 cursor-pointer">
                            Fat <FontAwesomeIcon icon={faSort} className="text-1"/>
                        </th>
                        <th className="p-5 cursor-pointer">
                            Calories <FontAwesomeIcon icon={faSort} className="text-1"/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleMeals.map((meal, index) => (
                        <tr key={index} onClick={() => toggleVisibility(meal)} className="cursor-pointer text-center">
                            <td className="p-4 border-b border-b-orange-500">{meal.meal_name}</td>
                            <td className="p-4 border-b border-b-orange-500">{meal.meal_category}</td>
                            <td className="p-4 border-b border-b-orange-500">{Number(meal.total_protein).toFixed(1)} g</td>
                            <td className="p-4 border-b border-b-orange-500">{Number (meal.total_carbs).toFixed(1)} g</td>
                            <td className="p-4 border-b border-b-orange-500">{Number (meal.total_fat).toFixed(1)} g</td>
                            <td className="p-4 border-b border-b-orange-500">{Number (meal.total_calories).toFixed(1)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4 text-white montserrat-text text-1xl">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 rounded ${currentPage === 0 ? "cursor-not-allowed" : "text-white"}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={endIndex >= meals.length}
                        className={`px-4 py-2 rounded ${endIndex >= meals.length ? "cursor-not-allowed" : "text-white"}`}
                    >
                        Next
                    </button>
                </div>
                {selectedMeal && (
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
                                        <td>{Number (selectedMeal.total_calories).toFixed(1)} g</td>
                                        <td>{Number(selectedMeal.total_protein).toFixed(1)} g</td>
                                        <td>{Number (selectedMeal.total_carbs).toFixed(1)} g</td>
                                        <td>{Number (selectedMeal.total_fat).toFixed(1)} g</td>
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
                )}
            </div>
        </>
    );
}

export default AllMeals;
