import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const SelectedIngredient = ({ ingredient, handleAddToMeal, onMoveBack, error }) => {
  const [weight, setWeight] = useState(null);

  return (
      <div
          className="w-2/3 flex flex-col items-center justify-center bg-gray-900/40 border border-orange-500/30 p-5 m-5 rounded-lg shadow-lg min-h-[300px]">
        <div
            className="p-3 mb-4 text-white text-center font-bold w-2/3 bg-gradient-to-r from-orange-600/80 to-orange-500/60 montserrat-text text-lg border border-orange-500/50 rounded-lg shadow-md">
          {ingredient.name}
        </div>
        <div className="text-xs text-gray-400 mb-2">
          Ingredient nutritional values per 100g
        </div>
        <div className="flex flex-row space-x-3 montserrat-text mb-5">
          <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">
            {Number(ingredient.calories_per_100g).toFixed(2)} KCAL
          </span>
          <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">
            {Number(ingredient.protein_per_100g).toFixed(2)} G
          </span>
          <span className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">
            {Number(ingredient.carbs_per_100g).toFixed(2)} G
          </span>
          <span className="px-2 py-1 bg-orange-500/10 rounded text-orange-300">
            {Number(ingredient.fat_per_100g).toFixed(2)} G
          </span>
        </div>
        <label
            className="text-gray-300 block w-full ml-1 mb-1 montserrat-text text-center">Weight</label>
        <input
            type="text"
            placeholder="Weight in grams..."
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="m-1 w-full p-3 border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
        />
        <div className="w-full flex justify-center mt-4">
          <button
              onClick={() => onMoveBack(ingredient)}
              className="w-1/2 m-2 p-3 border border-orange-500/60 bg-gray-800/40 rounded-lg hover:bg-orange-500/20 transition-colors flex justify-center"
          >
            <FontAwesomeIcon className="text-white text-2xl"
                             icon={faArrowLeft}/>
          </button>
          <button
              onClick={() => handleAddToMeal(weight)}
              className="text-white font-bold m-2 p-3 w-1/2 montserrat-text border border-orange-500/60 bg-gray-800/40 rounded-lg hover:bg-orange-500/20 transition-colors"
          >
            Add to Meal
          </button>
        </div>
        {error &&
            <div className="w-full mt-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 montserrat-text text-center font-medium">Enter valid weight</p>
            </div>
        }
      </div>
  )
}

export default SelectedIngredient;
