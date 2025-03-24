import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import SelectedMealComponent from "./SelectedMealComponent.jsx";

const URL = "http://127.0.0.1:3000/v1";

const AllMeals = () => {
    const token = sessionStorage.getItem("token");
    const [meals, setMeals] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
        return <div className="w-full text-center py-8 text-white">Loading...</div>;
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

    const sortMeals = (sortBy) => {
        return () => {
            let direction = 'ascending';
            if (sortConfig.key === sortBy && sortConfig.direction === 'ascending') {
                direction = 'descending';
            }

            const sorted = [...meals].sort((a, b) => {
                if (direction === 'ascending') {
                    return a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
                } else {
                    return a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
                }
            });

            setMeals(sorted);
            setSortConfig({ key: sortBy, direction });
            setCurrentPage(0);
        };
    };

    const NutritionBadge = ({ type, value }) => {
        let bgColor, textColor;

        switch(type) {
            case 'protein':
                bgColor = 'bg-green-500/10';
                textColor = 'text-green-300';
                break;
            case 'carbs':
                bgColor = 'bg-purple-500/10';
                textColor = 'text-purple-300';
                break;
            case 'fat':
                bgColor = 'bg-orange-500/10';
                textColor = 'text-orange-300';
                break;
            case 'calories':
                bgColor = 'bg-blue-500/10';
                textColor = 'text-blue-300';
                break;
            default:
                bgColor = 'bg-gray-500/10';
                textColor = 'text-gray-300';
        }

        let displayValue;
        if (type === 'calories') {
            displayValue = `${Number(value).toFixed(1)} KCAL`;
        } else {
            displayValue = `${Number(value).toFixed(1)} G`;
        }

        return (
            <span className={`px-2 py-1 rounded ${bgColor} ${textColor}`}>
                {displayValue}
            </span>
        );
    };

    return (
        <div className="w-full">
            <div className="hidden md:block">
                <table className="w-full text-gray-100 montserrat-text bg-gray-900/60 rounded-lg overflow-hidden shadow-lg">
                    <thead>
                    <tr className="bg-gradient-to-r from-orange-600/80 to-orange-500/60 text-lg font-medium">
                        <th onClick={sortMeals("meal_name")} className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Name</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th onClick={sortMeals("meal_category")} className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Category</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th onClick={sortMeals("total_protein")} className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Protein</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th onClick={sortMeals("total_carbs")} className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Carbs</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th onClick={sortMeals("total_fat")} className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
                            <div className="flex items-center justify-center space-x-2">
                                <span>Fat</span>
                                <FontAwesomeIcon icon={faSort} className="text-orange-300 opacity-70"/>
                            </div>
                        </th>
                        <th onClick={sortMeals("total_calories")} className="px-6 py-4 text-center transition-colors hover:bg-orange-500/30 cursor-pointer">
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
                            <td className="px-6 py-4 text-center border-b border-orange-500/20">
                                {meal.meal_name}
                            </td>
                            <td className="p-4 poppins-text text-center border-b border-orange-500/20">
                                    <span className="px-2 py-1 bg-orange-500/20 rounded text-orange-300">
                                        {meal.meal_category.charAt(0).toUpperCase() + meal.meal_category.slice(1)}
                                    </span>
                            </td>
                            <td className="p-4 poppins-text text-center border-b border-orange-500/20">
                                <NutritionBadge type="protein" value={meal.total_protein} />
                            </td>
                            <td className="p-4 poppins-text text-center border-b border-orange-500/20">
                                <NutritionBadge type="carbs" value={meal.total_carbs} />
                            </td>
                            <td className="p-4 poppins-text text-center border-b border-orange-500/20">
                                <NutritionBadge type="fat" value={meal.total_fat} />
                            </td>
                            <td className="p-4 poppins-text text-center border-b border-orange-500/20">
                                <NutritionBadge type="calories" value={meal.total_calories} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden">
                {visibleMeals.map((meal, index) => (
                    <div
                        key={index}
                        className="bg-gray-900/60 rounded-lg p-4 mb-4 shadow-lg cursor-pointer"
                        onClick={() => toggleVisibility(meal)}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold text-white">
                                {meal.meal_name}
                            </h3>
                            <span className="px-2 py-1 bg-orange-500/20 rounded text-orange-300 text-sm">
                                {meal.meal_category.charAt(0).toUpperCase() + meal.meal_category.slice(1)}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                            <div className="flex flex-col items-center bg-gray-800/30 rounded-lg p-2">
                                <span className="text-gray-400 mb-1">Protein</span>
                                <NutritionBadge type="protein" value={meal.total_protein} />
                            </div>
                            <div className="flex flex-col items-center bg-gray-800/30 rounded-lg p-2">
                                <span className="text-gray-400 mb-1">Carbs</span>
                                <NutritionBadge type="carbs" value={meal.total_carbs} />
                            </div>
                            <div className="flex flex-col items-center bg-gray-800/30 rounded-lg p-2">
                                <span className="text-gray-400 mb-1">Fat</span>
                                <NutritionBadge type="fat" value={meal.total_fat} />
                            </div>
                            <div className="flex flex-col items-center bg-gray-800/30 rounded-lg p-2">
                                <span className="text-gray-400 mb-1">Calories</span>
                                <NutritionBadge type="calories" value={meal.total_calories} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center space-x-2 mt-4 text-white montserrat-text">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded ${
                        currentPage === 0
                            ? "bg-gray-700 cursor-not-allowed opacity-50"
                            : "bg-orange-600 hover:bg-orange-500"
                    }`}
                >
                    Previous
                </button>

                <button
                    onClick={nextPage}
                    disabled={endIndex >= meals.length}
                    className={`px-4 py-2 rounded ${
                        endIndex >= meals.length
                            ? "bg-gray-700 cursor-not-allowed opacity-50"
                            : "bg-orange-600 hover:bg-orange-500"
                    }`}
                >
                    Next
                </button>
            </div>

            {selectedMeal && (
                <SelectedMealComponent
                    selectedMeal={selectedMeal}
                    ingredients={ingredients}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

export default AllMeals;
