import React from 'react';

const MealIngredients = ({ ingredients, onRemoveIngrdient }) => {
  const totalCalories = ingredients.reduce((acc, ingredient) => {
    return acc + ingredient.calories_per_100g * ingredient.weight / 100;
  }, 0);
  const totalProtein = ingredients.reduce((acc, ingredient) => {
    return acc + ingredient.protein_per_100g * ingredient.weight / 100;
  } , 0);

  const totalCarbs = ingredients.reduce((acc, ingredient) => {
    return acc + ingredient.carbs_per_100g * ingredient.weight / 100;
  } , 0);

  const totalFat = ingredients.reduce((acc, ingredient) => {
    return acc + ingredient.fat_per_100g * ingredient.weight / 100;
  }, 0);

  return (
      <div className="w-full flex flex-col bg-gray-900/40 border border-orange-500/30 p-5 m-5 rounded-lg shadow-lg min-h-[300px]">
        <div className="w-full items-center flex flex-col">
          <div className="text-xs text-gray-400 mb-2">
            Meal total nutritional values
          </div>
          <div className="flex flex-row space-x-3 montserrat-text mb-5">
          <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">
            {Number(totalCalories).toFixed(2)} KCAL
          </span>
            <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">
            {Number(totalProtein).toFixed(2)} G
          </span>
            <span
                className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">
            {Number(totalCarbs).toFixed(2)} G
          </span>
            <span
                className="px-2 py-1 bg-orange-500/10 rounded text-orange-300">
            {Number(totalFat).toFixed(2)} G
          </span>
          </div>
          <div className="w-full space-y-2 max-h-96 overflow-y-auto pr-2">
            {ingredients.map((ingredient) => (
                <div
                    key={ingredient.id}
                    className="w-full bg-gradient-to-r from-orange-600/80 to-orange-500/60 border border-orange-500/50 rounded-lg shadow-md flex flex-row justify-between items-center"
                >
                  <div className="p-3 text-white text-left montserrat-text">
                    <strong>{ingredient.name}</strong> - {ingredient.weight}g
                  </div>
                  <button
                      onClick={() => onRemoveIngrdient(ingredient)}
                      className="text-white font-bold montserrat-text mr-5 hover:text-red-300 transition-colors px-3 py-1"
                  >
                    X
                  </button>
                </div>
            ))}
          </div>

        </div>
      </div>
  )
}

export default MealIngredients;
