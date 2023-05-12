import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from './components/navbar/Navbar';
import RecipeList from './components/recipeListContainer/RecipeList';
import NoRecipeFound from './components/noRecipe/NoRecipeFound'

function App() {

  const [recipes, setRecipes] = useState([])

  const handleRecipeListUpdate = (updatedRecipeList) => {
    setRecipes(updatedRecipeList);
  };

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);
  return (
    <>
      <Navbar onRecipeListUpdate={handleRecipeListUpdate} />
      <RecipeList recipeList={recipes.length && recipes} />
    </>
  );
}

export default App;
