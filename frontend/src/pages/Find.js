import React from 'react'
import { useState } from 'react'
// import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Find = () => {

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchedRecipes, setSearchedRecipes] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const url = `http://localhost:5000/find?q=${encodeURIComponent(query)}`;
    try {
        setLoading(true); 
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); 
        setSearchedRecipes(data.searched_recipes);
        setLoading(false); 
    } catch (error) {
        setLoading(false); 
        console.error(error);
    }
  } 

  function handleChange(input) {
    setQuery(input.target.value)
  } 

  return (
    <div className="relative h-[400px] bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-800">
        <div className='flex flex-col gap-4 justify-center items-center w-full h-full px-3 md:px-0'>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Nutrient Pro
            </h1>
            <p class="text-gray-300">
                Search over 1000+ recipes
            </p>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 mt-4 pb-8 mb-4 flex items-center'>
                <label className='block text-gray-700 text-md font-bold'> Search Recipe </label>
                <input type="text" value={query} onChange={handleChange} className='shadow appearance-none border rounded py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mx-2 rounded focus:outline-none focus:shadow-outline'>
                Submit</button>
            </form>
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
                    {searchedRecipes && searchedRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>
            }
        </div>
    </div>
  )
}

export default Find