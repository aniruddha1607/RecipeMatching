import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import RecipeDetailCard from '../components/RecipeDetailCard';

const Suggest = () => {
  const { state } = useLocation();
  const recipe = state?.recipe;

  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmitByNutrients(event) {
    event.preventDefault();
    setLoading(true);
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
  return (
    <>
    <div className="flex items-center justify-center relative h-[400px] bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-800">
        
        <div>
            <RecipeDetailCard recipe={recipe}/>
        </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mx-2 rounded focus:outline-none focus:shadow-outline' 
        onClick={handleSubmitByNutrients}>
        Find Similar Recipes</button>
    </div>
    <div>
            {loading ? 
            <div className='flex w-full h-full bg-cyan-400 items-center justify-center text-center'>
                <h1 className='my-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Loading...</h1>
            </div> 





            : 
            <div className='flex flex-col p-10 w-full h-full bg-cyan-400 items-center justify-center text-center'>
                <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
                Result
                </h1>
                <div className="grid grid-cols-5 gap-4">
                    {/* {searchedRecipes && searchedRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                    ))} */}
                </div>
            </div>
            }
    </div>
    </>
  )
}

export default Suggest