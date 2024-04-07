import React from 'react'
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate(`/suggest/${recipe.label}`, { state: { recipe } });

  } 


  return (
    <div className="recipe-card border rounded-lg bg-gray-100 p-4 flex flex-col items-center cursor-pointer hover:bg-indigo-500 hover:text-white transition-colors duration-300 transform hover:scale-105" onClick={handleClick}>
      <img className="mb-4" src={recipe.image} alt={recipe.label} />
      <h2 className="text-lg font-bold  text-center">{recipe.label}</h2>
    </div>
  )
}

export default RecipeCard