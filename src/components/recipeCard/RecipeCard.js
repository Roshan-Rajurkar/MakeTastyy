import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import './recipeCard.css';

const RecipeCard = ({ recipe }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='recipe_card'>
            <img src={recipe.image} alt="recipe_image" className='recipe_cover_img' />
            <h3 className='recipe_name'>
                {recipe.label.split(' ').slice(0, 5).join(' ')}
            </h3>
            <button className='recipe_ingredients' onClick={handleOpen}>Ingredients</button>
            <button onClick={() => window.open(recipe.url)} className='recipe_more_details'>See more details</button>
            <button onClick={() => window.open(recipe.url)} className='recipe_more_details'>See more details</button>


            {/* dialog Box using the materialUI */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ingredients</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {recipe.ingredients.map((ingredient, index) => (
                            <div key={index}>{index + 1}. {ingredient.text}</div>
                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RecipeCard;
