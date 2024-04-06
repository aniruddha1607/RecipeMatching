import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeContext } from '../context/useRecipeContext';

const RecipeCard = ({ recipe, onClick }) => {
  const navigate = useNavigate();
  // const { setSelectedRecipe } = useRecipeContext();

  const handleClick = (event) => {
    event.preventDefault(); 
    // Navigate to detail page and pass recipe object
    navigate(`/recipe/${recipe.label}`, { state: { recipe } });

  };
  return (
    <div className="recipe-card border rounded-lg bg-gray-100 p-4 flex flex-col items-center cursor-pointer hover:bg-gray-500 transition-colors duration-300 transform hover:scale-105" onClick={handleClick}>
      <img className="mb-4" src={recipe.image} alt={recipe.label} />
      <h2 className="text-lg font-bold  text-center">{recipe.label}</h2>
      <h2 className="text-blue-500 mt-2 hover:text-blue-300">More Info</h2>
    </div>
  );
};

export default RecipeCard;
