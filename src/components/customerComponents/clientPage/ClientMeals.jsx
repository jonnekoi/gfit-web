import React, {useEffect, useState} from "react";
import {fetchClientMeals, fetchClientTargets} from "./clientsMealComponents/clientMealService.js";
import ButtonNoHover from "../../../buttons/ButtonNoHover.jsx";
import MealCalender from "./clientsMealComponents/MealCalender.jsx";
import AdjustTargets from "./clientsMealComponents/AdjustTargets.jsx";
import TargetsBars from "./clientsMealComponents/TargetBars.jsx";
import AddMealModal from "./clientsMealComponents/AddMealModal.jsx";

const ClientMeals = ({ userId }) => {
    const [meals, setMeals] = useState(null);
    const [adjustTargets, setAdjustTargets] = useState(false);
    const [targets, setTargets] = useState(null);
    const [showAddMealModal, setShowAddMealModal] = useState(false);
    const [mealCategories, setMealCategories] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    });

    const getMeals = async (userId) => {
        try {
            const fetchedMeals = await fetchClientMeals(userId);
            setMeals(fetchedMeals);

            const categories = {
                breakfast: [],
                lunch: [],
                dinner: [],
                snacks: []
            };

            if (Array.isArray(fetchedMeals)) {
                fetchedMeals.forEach(meal => {
                    const category = meal.meal_category?.toLowerCase() || "snacks";
                    if (categories[category]) {
                        categories[category].push(meal);
                    } else {
                        categories.snacks.push(meal);
                    }
                });
            }

            console.log("Organized meal categories:", categories);
            setMealCategories(categories);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    }

    const getTargets = async (userId) => {
        try {
            const fetchedTargets = await fetchClientTargets(userId);
            console.log("Fetched targets:", fetchedTargets);
            setTargets(fetchedTargets);
        } catch (error) {
            console.error("Error fetching targets:", error);
        }
    }

    const handleTargetsUpdated = (updatedTargets) => {
        setTargets(updatedTargets);
    }

    useEffect(() => {
        getMeals(userId);
        getTargets(userId);
    }, [userId]);

    if (!targets) {
        return <div>Loading targets...</div>
    }

    if (!meals) {
        return <div>Loading meals...</div>
    }

    const handleShowAdjustTargets = () => {
        setAdjustTargets(!adjustTargets);
    }

    const closeModal = () => {
        setAdjustTargets(false);
    }

    const handleAddMeal = () => {
        setShowAddMealModal(true);
    };

    const closeAddMealModal = () => {
        setShowAddMealModal(false);
    };

    const handleMealAdded = () => {
        getMeals(userId);
    };


    return (
        <div className="w-full">
            <div className="flex justify-center">
                <div className="w-2/3">
                    <div className="flex flex-row justify-between mb-2 items-center">
                        <div className="w-1/2">
                            <TargetsBars targets={targets} meals={mealCategories} rawMeals={meals} />
                        </div>
                        <div className="flex space-x-5">
                            <ButtonNoHover text="Adjust Targets" onClick={handleShowAdjustTargets}/>
                            <ButtonNoHover text="Add Meal" onClick={handleAddMeal} />
                        </div>
                    </div>
                    {adjustTargets && (
                        <AdjustTargets
                            targetBars={targets}
                            userId={userId}
                            closeModal={closeModal}
                            onTargetsUpdated={handleTargetsUpdated}
                        />
                    )}

                    {showAddMealModal && (
                        <AddMealModal
                            userId={userId}
                            closeModal={closeAddMealModal}
                            onMealAdded={handleMealAdded}
                        />
                    )}

                    <MealCalender meals={mealCategories} userId={userId}/>
                </div>
            </div>
        </div>
    )
}

export default ClientMeals;
