import React, { useState, useEffect } from "react";
import axios from 'axios'
import './App.css';
import Navbar from './components/navbar/Navbar';
import RecipeList from './components/recipeListContainer/RecipeList';
import NoRecipeFound from './components/noRecipe/NoRecipeFound'
import Home from "./pages/Home";

function App() {

  // this recipes for the search
  const [recipes, setRecipes] = useState([])

  // popular Recipes
  const [popularRecipes, setPopularRecipes] = useState([])

  // trending recipes
  const [trendingRecipes, setTrendingRecipes] = useState([])


  const handleRecipeListUpdate = (updatedRecipeList) => {
    setRecipes(updatedRecipeList);
  };

  useEffect(() => {
    console.log(recipes);

    const loadLatest = async () => {
      try {
        const response = await axios.get(`https://api.edamam.com/search?q=query&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&sort=r`);
        const newRes = await axios.get(`https://api.edamam.com/search?q=query&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&sort=da`);
        console.log("Popular", response.data)
        console.log("trending", newRes.data)
      }
      catch (err) {
        console.log(err)
      }
    }

    loadLatest()

  }, [recipes]);



  return (
    <>
      <h1>Left AT fetching Popular and trending List of Recipes</h1>
      <Navbar onRecipeListUpdate={handleRecipeListUpdate} />
      {/* <RecipeList recipeList={recipes.length && recipes} /> */}
      {/* <Home /> */}
    </>
  );
}

export default App;
