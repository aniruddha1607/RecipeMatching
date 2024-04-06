import { RecipeProvider } from './context/useRecipeContext';
import React, { useState } from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import RecipeDetailPage from './Pages/RecipeDetailPage';


function App() {
  return (
    
    <Router>
    <RecipeProvider>
    <Routes>
        <Route path='' element={<HomePage />}></Route>
        <Route path='/recipe/:label' element={<RecipeDetailPage />}></Route>
    </Routes>
    </RecipeProvider>
    </Router>
    
  );

}

export default App;
