import React, {useEffect, useState} from "react";
import {fetchClientMeals} from "./clientsMealComponents/clientMealService.js";
import ButtonNoHover from "../../../buttons/ButtonNoHover.jsx";
import MealCalender from "./clientsMealComponents/MealCalender.jsx";

const ClientMeals = ({ userId }) => {
    const [meals, setMeals] = useState(null);

    const getMeals = async (userId) => {
        const getMeals = await fetchClientMeals(userId);
        setMeals(getMeals);
    }

    useEffect(() => {
        getMeals(userId);
    }, []);

    if (!meals) {
        return <div></div>
    }

    const mealCategories = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    }

    meals.forEach(meal => {
        mealCategories[meal.meal_category].push(meal);
    });


    return (
        <div className="w-full">
            <div className="flex justify-center">
                <div className="w-2/3">
                    <div className="flex flex-row justify-end mb-2 space-x-5">
                        <ButtonNoHover text="Adjust Targets"/>
                        <ButtonNoHover text="Add Meal">
                        </ButtonNoHover>
                    </div>
                    <MealCalender meals={mealCategories} userId={userId}/>
                </div>
            </div>
        </div>
    )
}

export default ClientMeals;
