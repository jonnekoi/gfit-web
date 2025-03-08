import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort} from "@fortawesome/free-solid-svg-icons";

const URL = "http://127.0.0.1:3000/v1";

const AllMeals = () => {
    const token = sessionStorage.getItem("token");
    const [meals, setMeals] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8;

    const fecthMeals = async () => {
        const fetchOptions = {
            method: "GET",
            headers: {
                'authorization': 'Bearer ' + token,
            }
        }
        try {
            const response = await fetch(URL + "/meals", fetchOptions);
            const data = await response.json();
            console.log(data);
            const mealsArray = Object.values(data.meals).map(meal => ({
                ...meal,
                meal_name: Object.keys(data.meals).find(key => data.meals[key] === meal)
            }));
            setMeals(mealsArray);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fecthMeals();
    }, []);

    if (!meals) {
        return <div></div>;
    }

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
                        <tr key={index} className="cursor-pointer text-center">
                            <td className="p-4 border-b border-b-orange-500">{meal.meal_name}</td>
                            <td className="p-4 border-b border-b-orange-500">{meal.meal_category}</td>
                            <td className="p-4 border-b border-b-orange-500">{meal.total_protein} g</td>
                            <td className="p-4 border-b border-b-orange-500">{meal.total_carbs} g</td>
                            <td className="p-4 border-b border-b-orange-500">{meal.total_fat} g</td>
                            <td className="p-4 border-b border-b-orange-500">{meal.total_calories}</td>
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
            </div>
        </>
    );
}

export default AllMeals;
