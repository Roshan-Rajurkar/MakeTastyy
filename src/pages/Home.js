import React from 'react'
import './home.css'
import RecipeCard from '../components/recipeCard/RecipeCard'

const Home = ({ popularRecipeList }) => {
    // console.log(popularRecipeList)
    return (
        <div className='home_container'>
            <h3 className='home_heading'>Popular Recipes</h3>
            <div className="home_popular_recipes">
                {
                    popularRecipeList.map((recipe) => <RecipeCard key={recipe.label} recipe={recipe}/>)
                }
            </div>
        </div>
    )
}

export default Home
