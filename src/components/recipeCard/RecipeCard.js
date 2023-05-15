import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import './recipeCard.css';

const RecipeCard = ({ recipe }) => {
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      const searchQuery = encodeURIComponent(`${recipe.label} recipe`);
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchQuery}&key=AIzaSyD9QvfKHF2jg-YdkKvPikP6HM0pNBelq58`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        // if (data.items.length > 0) {
        //   const videoId = data.items[0].id.videoId;
        //   setVideoId(videoId);
        // }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [recipe.label]);

  return (
    <div className='recipe_card'>
      <img src={recipe.image} alt="recipe_image" className='recipe_cover_img' />
      <h3 className='recipe_name'>
        {recipe.label.split(' ').slice(0, 5).join(' ')}
      </h3>
      <div className="recipe_car_buttons">
        <button className='recipe_ingredients' onClick={handleOpen}>Ingredients</button>
        { (
          <button onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`)} className='recipe_more_details'>Get Cooking</button>
        )}
      </div>

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
