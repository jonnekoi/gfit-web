import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort} from "@fortawesome/free-solid-svg-icons";
import SelectedMealComponent from "./SelectedMealComponent.jsx";

const URL = "http://127.0.0.1:3000/v1";

const AllMeals = () => {
    const token = sessionStorage.getItem("token");
    const [meals, setMeals] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [ingredients, setIngredients] = useState([]);



    const fetchMeals = async () => {
        const fetchOptions = {
            method: "GET",
            headers: {
                'authorization': 'Bearer ' + token,
            }
        };
        try {
            const response = await fetch(URL + "/meals", fetchOptions);
            const data = await response.json();
            setMeals(data.meals);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchMeals();
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


    const nextPage = () => {
        if (endIndex < meals.length) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    return (
        <>
            <div className="w-3/4">
                <table
                    className="w-full text-gray-100 montserrat-text bg-gray-900/60 rounded-lg overflow-hidden shadow-lg">
                    <thead>
                    <tr className="bg-gradient-to-r from-orange-600/80 to-orange-500/60 text-lg font-medium">
                        <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Name</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Category</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Protein</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Carbs</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Fat</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th className="px-6 py-4 transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Calories</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleMeals.map((meal, index) => (
                        <tr
                            key={index}
                            onClick={() => toggleVisibility(meal)}
                            className={`transition-colors hover:bg-orange-500/10 cursor-pointer ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'}`}
                        >
                                        <td className="px-6 py-4 text-center border-b border-orange-500/20 max-w-44">
                                            {meal.meal_name}
                                        </td>
                                        <td className="p-4 poppins-text text-center border-b border-orange-500/20 max-w-44">
                            <span className="px-2 py-1 bg-orange-500/20 rounded text-orange-300">
                                {meal.meal_category.charAt(0).toUpperCase() + meal.meal_category.slice(1)}
                            </span>
                                        </td>
                                        <td className="p-4 poppins-text text-center border-b border-orange-500/20 max-w-44">
                            <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">
                                {Number(meal.total_protein).toFixed(1)} G
                            </span>
                                        </td>
                                        <td className="p-4 poppins-text text-center border-b border-orange-500/20 max-w-44">
                            <span className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">
                                {Number(meal.total_carbs).toFixed(1)} G
                            </span>
                                        </td>
                                        <td className="p-4 poppins-text text-center border-b border-orange-500/20 max-w-44">
                            <span className="px-2 py-1 bg-orange-500/10 rounded text-orange-300">
                                {Number(meal.total_fat).toFixed(1)} G
                            </span>
                                        </td>
                                        <td className="p-4 poppins-text text-center  border-b border-orange-500/20 max-w-44">
                            <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">
                                {Number(meal.total_calories).toFixed(1)} KCAL
                            </span>
                                        </td>
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
                    <SelectedMealComponent selectedMeal={selectedMeal} ingredients={ingredients}
                                           closeModal={closeModal}/>
                )}
            </div>
        </>
    );
}

export default AllMeals;
