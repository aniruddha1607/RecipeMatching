import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import RecipeDetailCard from '../components/RecipeDetailCard';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';


const Suggest = () => {
  const { state } = useLocation();
  const recipe = state?.recipe;

  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmitByNutrients(event) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    console.log("id is" + recipe.id)

    try {
      console.log(recipe.id)
      const response = await fetch("http://localhost:5000/predict", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: recipe.id})
      })
      const data = await response.json();
      setResult(data)
      setLoading(false)
      console.log(data[0])
    
    } catch(error) {
      console.log(error);
      setError(true);
    }
    
  }
  return (
    <>
    <div className="flex items-center justify-center relative h-[500px] bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-800">
        
        <div>
            <RecipeDetailCard recipe={recipe}/>
        </div>
        <div className='flex flex-col'>
        <Link to="/" className='bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-3 mx-2 my-5 rounded focus:outline-none focus:shadow-outline'>
        Go to Search</Link>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mx-2 my-5 rounded focus:outline-none focus:shadow-outline' 
        onClick={handleSubmitByNutrients}>
        Find Similar Recipes</button>
        <Link to={recipe.url} target="_blank" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mx-2 my-5 rounded focus:outline-none focus:shadow-outline'>
        View Detailed Instructions</Link>
        </div>
    </div>
    <div>{error ? 
      <div className='flex w-full h-full bg-cyan-400 items-center justify-center text-center'>
                <h1 className='my-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Error fetching recipes</h1>
            </div> 
      :             loading ? 
            <div className='flex w-full h-full bg-cyan-400 items-center justify-center text-center'>
                <h1 className='my-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Loading...</h1>
            </div> 
            : 
            <div className='flex flex-col p-10 w-full h-full bg-cyan-400 items-center justify-center text-center'>
                <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
                Similar Recipes
                </h1>
                <div className="grid grid-cols-5 gap-4">
                    {result && result.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>
            }
    </div>
    </>
  )
}

export default Suggest