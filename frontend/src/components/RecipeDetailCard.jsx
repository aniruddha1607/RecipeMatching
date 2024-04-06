import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeDetailCard = ({ recipe }) => {
  return (
    <div className="recipe-card border rounded-lg bg-gray-100 p-4 flex flex-col items-center cursor-pointer">
      <img className="mb-4" src={recipe.image} alt={recipe.label} />
      <h2 className="text-lg font-bold  text-center">{recipe.totalNutrients.PROCNT.label} : {recipe.totalNutrients.PROCNT.quantity}</h2>
      <h2 className="text-lg font-bold  text-center">{recipe.totalNutrients.FAT.label} : {recipe.totalNutrients.FASAT.quantity}</h2>
      <h2 className="text-lg font-bold  text-center">{recipe.totalNutrients.ENERC_KCAL.label} : {recipe.totalNutrients.ENERC_KCAL.quantity}</h2>
      <h2 className="text-lg font-bold  text-center">{recipe.totalNutrients.CHOCDF.label} : {recipe.totalNutrients.CHOCDF.quantity}</h2>
      <h2 className="text-lg font-bold  text-center">{recipe.totalNutrients.FIBTG.label} : {recipe.totalNutrients.FIBTG.quantity}</h2>
      <h2 className="text-lg font-bold  text-center">{recipe.calories}</h2>
      <h2 className="text-lg font-bold  text-center">Dish type : {recipe.dishType}</h2>
      <h2 className="text-lg font-bold  text-center">cusine type : {recipe.cuisineType}</h2>
      <h2 className="text-blue-500 mt-2">More Info</h2>
    </div>
  );
};

export default RecipeDetailCard;
