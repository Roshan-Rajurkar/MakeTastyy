import React, { useState, useEffect } from "react";
import axios from 'axios'
import './App.css';
import Navbar from './components/navbar/Navbar';
import RecipeList from './components/recipeListContainer/RecipeList';
import NoRecipeFound from './components/noRecipe/NoRecipeFound'
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const handleRecipeListUpdate = (updatedRecipeList) => {
    setRecipes(updatedRecipeList);
  };

  useEffect(() => {
    const loadLatest = async () => {
      try {
        const response = await fetch(`https://api.edamam.com/search?q=query&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&sort=r`);
        const data = await response.json();
        const updatedList = data.hits.map(hit => hit.recipe)
        setPopularRecipes(updatedList)
        setIsLoading(false); // Set isLoading to false when recipes are loaded
      }
      catch (err) {
        console.log(err)
      }
    }

    loadLatest()

  }, [recipes]);

  return (
    <>
      <Navbar onRecipeListUpdate={handleRecipeListUpdate} />
      <div className="main_content">
        {isLoading ? ( // Display loading if isLoading is true
          <NoRecipeFound />
        ) : (
          <>
            {/* another condition if recipe present  */}
            {recipes.length > 0 ? (
              <RecipeList recipeList={recipes} />
            ) : (
              <Home popularRecipeList={popularRecipes} />
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
