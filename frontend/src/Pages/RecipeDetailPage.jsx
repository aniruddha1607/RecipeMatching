import React, { useState } from 'react'
import { useRecipeContext } from '../context/useRecipeContext';
import { useLocation } from 'react-router-dom';
import RecipeDetailCard from '../components/RecipeDetailCard';
import RecipeCard from '../components/RecipeCard';

const RecipeDetailPage = () => {
  const { state } = useLocation();
  const recipe = state?.recipe;

  const[suggestedRecipesByCuisine, setSuggestedRecipesByCuisine] = useState([]);
  const[suggestedRecipesByCalories, setSuggestedRecipesByCalories] = useState([]);
  const[suggestedRecipesByNutrients, setSuggestedRecipesByNutrients] = useState([]);

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   let url = 'http://localhost:5000/suggestRelated?';
  //   if (Array.isArray(recipe.cuisineType)) {
  //     recipe.cuisineType.forEach((type, index) => {
  //         if (index !== 0) {
  //             url += '&'; 
  //         }
  //         url += `cuisineType=${encodeURIComponent(type)}`;
  //     });
  //   } else {
  //     url += `cuisineType=${encodeURIComponent(recipe.cuisineType)}`;
  //     console.log('cuisine: ' + recipe.cuisineType);
  //   }
  //   fetchSuggestedRecipes(url)
  //   const response = await fetch(url);
  //   const data = await response.json();
    
  //   setSuggestedRecipesByCuisine(data.suggestedRecipes);
    
  // }

  // async function handleSubmitByCalories(event) {
  //   event.preventDefault();
  //   const intCalories = Math.floor( recipe.calories );
  //   console.log(recipe.dishType)
  //   var url = `http://localhost:5000/suggestByCalories?calories=${encodeURIComponent(intCalories)}&dishType=${encodeURIComponent(recipe.dishType)}`;
  //   // handle array of strings for dishType
  //   // if (Array.isArray(recipe.dishType)) {
  //   //   recipe.dishType.forEach((type, index) => {
  //   //       if (index !== 0) { 
  //   //           url += '&'; 
  //   //       }
  //   //       url += `dishType=${encodeURIComponent(type)}`;
  //   //   });
  //   // } else {
  //   //   url += `dishType=${encodeURIComponent(recipe.dishType)}`;
  //   // }
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setSuggestedRecipesByCalories(data.suggestedByCalories);
  // }

  async function handleSubmitByNutrients(event) {
    event.preventDefault();
    const protein = Math.floor( recipe.totalNutrients.PROCNT.quantity );
    const fat = Math.floor( recipe.totalNutrients.FASAT.quantity );
    const energy = Math.floor( recipe.totalNutrients.ENERC_KCAL.quantity );
    const carbs = Math.floor( recipe.totalNutrients.CHOCDF.quantity );
    const fibers = Math.floor( recipe.totalNutrients.FIBTG.quantity );
    const cuisineType = recipe.cuisineType[0]
    console.log(fat)
    console.log(cuisineType)
    const url = `http://localhost:5000/predict?dishType=${encodeURIComponent(cuisineType)}&protein=${encodeURIComponent(protein)}&fat=${encodeURIComponent(fat)}&energy=${encodeURIComponent(energy)}&carbs=${encodeURIComponent(carbs)}&fibres=${encodeURIComponent(fibers)}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    // setSuggestedRecipesByNutrients(data.suggestedByNutrients);
  }

  // async function fetchSuggestedRecipes(url) {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setSuggestedRecipesByCuisine(data.suggestedRecipes);
  // }

  return (
    <div>
    <RecipeDetailCard recipe={recipe}/>

        <div className='flex'>
        {/* <form onSubmit={handleSubmit} className="mb-4 w-1/3 px-2">
          <div className="flex items-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">show related</button>
          </div>
        </form> */}


        {/* <form onSubmit={handleSubmitByCalories} className="mb-4 w-1/3 px-2">
          <div className="flex items-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">show related by calories</button>
          </div>
        </form> */}

        <form onSubmit={handleSubmitByNutrients} className="mb-4 w-1/3 px-2">
          <div className="flex items-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">show related recipes</button>
          </div>
        </form>
        </div>

        {/* <h1 className="text-3xl font-bold text-center mb-4 text-black mt-4">Related Recipes</h1>
          <div className="grid grid-cols-5 gap-4">
          <></>
            {suggestedRecipesByCalories.map((recipe, index) => (
              <>
              
              <RecipeCard key={index} recipe={recipe} />
              </>
            ))}
          </div>

        
          <h1 className="text-3xl font-bold text-center mb-4 text-black mt-4">Related Recipes</h1>
          <div className="grid grid-cols-5 gap-4">
          <></>
            {suggestedRecipesByCuisine.map((recipe, index) => (
              <>
              
              <RecipeCard key={index} recipe={recipe} />
              </>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-center mb-4 text-black mt-4">Related Recipes</h1>
          <div className="grid grid-cols-5 gap-4">
          <></>
            {suggestedRecipesByNutrients.map((recipe, index) => (
              <>
              
              <RecipeCard key={index} recipe={recipe} />
              </>
            ))}
          </div> */}
    
    </div>
    
  );
};

export default RecipeDetailPage;