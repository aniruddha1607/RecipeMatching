import React from 'react'
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {

  function capitalizeFirstLetter(str) {
    return str.toLowerCase().replace(/(^|\s|,)[a-z]/g, (match) => match.toUpperCase());
  };
  
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate(`/suggest/${recipe.label}`, { state: { recipe } });

  } 


  return (
    <div className="recipe-card border rounded-lg bg-gray-100 p-4 flex flex-col items-center cursor-pointer hover:bg-indigo-500 hover:text-white transition-colors duration-300 transform hover:scale-105" onClick={handleClick}>
      <h2 className="mb-4 font-bold">{capitalizeFirstLetter(recipe.cuisineType)}</h2>
      <h2 className="text-lg font-bold  text-center">{recipe.label}</h2>
    </div>
  )
}

export default RecipeCard