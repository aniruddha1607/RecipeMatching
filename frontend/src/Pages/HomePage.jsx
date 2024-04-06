import React, { useState } from 'react'
import RecipeCard from '../components/RecipeCard';
import { useRecipeContext } from '../context/useRecipeContext';


const HomePage = () => {
    const[query, setQuery] = useState('');
    const[searchedRecipes, setSearchedRecipes] = useState(null);
    const[suggestedRecipesByCuisine, setSuggestedRecipesByCuisine] = useState(null);
    const[cusineType, setCuisineType] = useState('');

    const handleChange = (e) => {
      setQuery(e.target.value);
    };

    async function handleSubmit(event) {
      event.preventDefault();
      const url = `http://localhost:5000/find?q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      
      const data = await response.json();
      console.log(data);
      setSearchedRecipes(data.searched_recipes);
      setSuggestedRecipesByCuisine(data.suggestedCusineRecipes);
      setCuisineType(data.suggestedCuisine);
      console.log(query)
    }

    return (
      <div className="App flex justify-center bg-blue-950 h-full">
      <div className="w-full max-w-screen-xl flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-4 text-black mt-4">Search by keyword</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex items-center">
            <input type="text" value={query} onChange={handleChange} className="flex-1 appearance-none border rounded py-2 px-3 mr-2" />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
          </div>
        </form>

        {
          searchedRecipes && 
          <div>
          <h1 className="text-3xl font-bold text-center mb-4 text-black mt-8">Searched Recipes</h1>
          <div className="grid grid-cols-5 gap-4">
            {searchedRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
        }
        
        { suggestedRecipesByCuisine &&
          <div>
          <h1 className="text-3xl font-bold text-center mb-4 text-black mt-8">Similar {cusineType} Recipes</h1>
          <div className="grid grid-cols-5 gap-4">
            {suggestedRecipesByCuisine.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
        }

        
      </div>
    </div>
    
);

}

export default HomePage;



