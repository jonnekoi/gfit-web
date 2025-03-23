import Ingridients from './createMealComponents/Ingridients.jsx';
import {useEffect, useState} from 'react';
import SelectedIngredient from './createMealComponents/SelectedIngredient.jsx';
import MealIngredients from './createMealComponents/MealIngredients.jsx';

const url = "http://127.0.0.1:3000/v1";


const CreateMeal = () => {
  const token = sessionStorage.getItem('token');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [error, setError] = useState(false);

  const fetchIngredients = async () => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    try {
      const response = await fetch(url + '/meals/ingredients', fetchOptions);
      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleMoveIngredient = (ingredient) => {
    setCurrentIngredient(ingredient);
  }

  const handleMoveBack = () => {
    setCurrentIngredient(null);
    setError(false);
  }

  const addIngredientToMeal = (weight) => {
    if (!weight || isNaN(weight)) {
      setError(true);
      return;
    }
    const ingredient = currentIngredient;
    ingredient.weight = parseInt(weight);
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setCurrentIngredient(null);
    setIngredients(ingredients.filter((ing) => ing.id !== ingredient.id));
    setError(false);
  }

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter((ing) => ing.id !== ingredient.id));
  }


  return (
        <div className="flex flex-row">
          <Ingridients onSelectIngredient={handleMoveIngredient} ingredients={ingredients}/>
          {currentIngredient &&
             <SelectedIngredient ingredient={currentIngredient} onMoveBack={handleMoveBack} error={error} handleAddToMeal={addIngredientToMeal}/>}
          <MealIngredients ingredients={selectedIngredients} onRemoveIngrdient={handleRemoveIngredient}/>
        </div>
  );
}

export default CreateMeal;
