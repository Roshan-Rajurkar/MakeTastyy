import React from 'react'
import './recipeList.css'
import RecipeCard from '../recipeCard/RecipeCard'
import NoRecipeFound from '../noRecipe/NoRecipeFound';

const RecipeList = ({ recipeList }) => {

    if (!Array.isArray(recipeList)) {
        return <NoRecipeFound /> // Or you can render a message indicating no recipes are available
    }

    return (
        <>
            <div className='recipe_list_container'>
                {
                    recipeList.map((recipeObj) => {
                        return <RecipeCard recipe={recipeObj.recipe} />
                    })
                }
            </div>
        </>
    )
}

export default RecipeList
