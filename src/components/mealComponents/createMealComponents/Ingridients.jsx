import {useState} from 'react';
import ButtonNoHover from '../../../buttons/ButtonNoHover.jsx';

const Ingredients = ({ onSelectIngredient, ingredients }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div
          className="w-full flex flex-wrap justify-center bg-gray-900/40 border border-orange-500/30 p-5 m-5 rounded-lg shadow-lg min-h-[300px]">
        <div className="w-full max-h-12 flex space-x-4 justify-center m-2">
          <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 w-full p-3 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
          />
          <ButtonNoHover
              text="Add Ingredient">
          </ButtonNoHover>
        </div>
        <div className="w-full flex flex-wrap justify-center mt-4">
          {filtered.map((ingredient) => (
              <button
                  onClick={() => onSelectIngredient(ingredient)}
                  key={ingredient.id}
                  className="m-2 text-white p-3 text-center montserrat-text border border-orange-500/60 bg-gray-800/40 rounded-lg w-32 h-24 hover:bg-orange-500/20 transition-colors flex items-center justify-center"
              >
                <span
                    className="overflow-hidden text-sm">{ingredient.name}</span>
              </button>
          ))}
        </div>
      </div>
  )
}

export default Ingredients;
