import React from 'react'

const RecipeDetailCard = ({ recipe }) => {
  return (
    <div>
    <div  className="flex flex-row max-w-xl items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <div className='border-green-600 bg-indigo-500 h-44 m-4 rounded-md items-center flex'>
    <h2 className="object-cover w-full rounded-lg md:h-auto md:w-60 md:rounded-lg m-5 font-bold text-center text-white text-lg" >{recipe.label} </h2>
    </div>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nutrients</h5>
        <p className=" font-normal text-gray-700 dark:text-gray-400">{recipe.totalNutrients.PROCNT.label}: {Math.floor(recipe.totalNutrients.PROCNT.quantity)}{recipe.totalNutrients.PROCNT.unit}</p>
        <p className=" font-normal text-gray-700 dark:text-gray-400">{recipe.totalNutrients.FAT.label}: {Math.floor(recipe.totalNutrients.FAT.quantity)}{recipe.totalNutrients.FAT.unit}</p>
        <p className=" font-normal text-gray-700 dark:text-gray-400">{recipe.totalNutrients.ENERC_KCAL.label}: {Math.floor(recipe.totalNutrients.ENERC_KCAL.quantity)}{recipe.totalNutrients.ENERC_KCAL.unit}</p>
        <p className=" font-normal text-gray-700 dark:text-gray-400">{recipe.totalNutrients.CHOCDF.label}: {Math.floor(recipe.totalNutrients.CHOCDF.quantity)}{recipe.totalNutrients.CHOCDF.unit}</p>
        <p className=" font-normal text-gray-700 dark:text-gray-400">{recipe.totalNutrients.FIBTG.label}: {Math.floor(recipe.totalNutrients.FIBTG.quantity)}{recipe.totalNutrients.FIBTG.unit}</p>
        <p className=" font-normal text-gray-700 dark:text-gray-400">{recipe.mealType}</p>
    </div>
    <div className='flex flex-col justify-between p-4 pr-10 leading-normal'>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ingridients</h5>
        {
          recipe.ingredientLines.map((ingridient, index) => (
            <span key={index}>
            <p className='font-normal text-gray-700 dark:text-gray-400'>{ingridient}</p>
            </span>
          ))
        }
    </div>
    </div>
    </div>
  )
}

export default RecipeDetailCard