import React from 'react'
import { useState } from 'react'
import RecipeCard from '../components/RecipeCard';

const Find = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedRecipes, setSearchedRecipes] = useState(null);
  const [balanced, setBalanced] = useState(false);
  const [fiber, setFiber] = useState(false);
  const [protein, setProtein] = useState(false);
  const [carb, setCarb] = useState(false);
  const [fat, setFat] = useState(false);
  const [sodium, setSodium] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // const url = `http://localhost:5000/find?balanced=${encodeURIComponent(balanced)}&fiber=${encodeURIComponent(fiber)}&protein=${encodeURIComponent(protein)}&carb=${encodeURIComponent(carb)}&fat=${encodeURIComponent(fat)}&sodium=${encodeURIComponent(sodium)}`;
    // try {
    //     setLoading(true); 
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     console.log(data); 
    //     setSearchedRecipes(data.searched_recipes);
    //     setLoading(false); 
    // } catch (error) {
    //     setLoading(false); 
    //     console.error(error);
    // }

    try {
      setError(false)
      setLoading(true); 
      const response = await fetch("http://localhost:5000/find", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({balanced: balanced,
                              fiber: fiber,
                              protein: protein,
                              carb: carb,
                              fat: fat,
                              sodium: sodium })
      })
      const data = await response.json();
      console.log(data); 
      setSearchedRecipes(data.searched_recipes);
      setLoading(false);
    
    } catch(error) {
      setLoading(false); 
      console.error(error);
      setError(error)
    }
  } 

  function balanceHandler(event) {
    setBalanced(!balanced)
  }
  function fiberHandler(event) {
    setFiber(!fiber)
  }
  function proteinHandler(event) {
    setProtein(!protein)
  }
  function carbHandler(event) {
    setCarb(!carb)
  }
  function sodiumHandler(event) {
    setSodium(!sodium)
  }
  function fatHandler(event) {
    setFat(!fat)
  }

  return (
    <div className="relative h-[400px] bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-800">
        <div className='flex flex-col gap-4 justify-center items-center w-full h-full px-3 md:px-0'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Nutrient Pro
            </h1>
            <p className="text-gray-300">
                Search over 1000+ recipes
            </p>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 mt-4 pb-8 mb-4 flex items-center'>
                {/* <label className='block text-gray-700 text-md font-bold'> Search Recipe </label>
                <input type="text" value={query} onChange={handleChange} className='shadow appearance-none border rounded py-2 px-4 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> */}
                <label className='block text-gray-700 text-md font-bold'> Balanced </label>
                <input value={balanced} onChange={balanceHandler} type="checkbox" className='shadow border rounded py-2 px-4 mx-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                <label className='block text-gray-700 text-md font-bold'> High-Fiber </label>
                <input value={fiber} onChange={fiberHandler} type="checkbox" className='shadow border rounded py-2 px-4 mx-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                <label className='block text-gray-700 text-md font-bold'> High-Protein </label>
                <input value={protein} onChange={proteinHandler} type="checkbox" className='shadow border rounded py-2 px-4 mx-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                <label className='block text-gray-700 text-md font-bold'> Low-Carb </label>
                <input value={carb} onChange={carbHandler} type="checkbox" className='shadow border rounded py-2 px-4 mx-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                <label className='block text-gray-700 text-md font-bold'> Low-Fat </label>
                <input value={fat} onChange={fatHandler} type="checkbox" className='shadow border rounded py-2 px-4 mx-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                <label className='block text-gray-700 text-md font-bold'> Low-Sodium </label>
                <input value={sodium} onChange={sodiumHandler} type="checkbox" className='shadow border rounded py-2 px-4 mx-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mx-2 rounded focus:outline-none focus:shadow-outline'>
                Submit</button>
            </form>
        </div>
        <div>
            {error ? 
      <div className='flex w-full h-full bg-cyan-400 items-center justify-center text-center'>
                <h1 className='my-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Error fetching recipes</h1>
            </div> 
      : loading ? 
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