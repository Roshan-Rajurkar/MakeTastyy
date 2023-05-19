import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import './recipeCard.css';
import { BsWhatsapp } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  const [open, setOpen] = useState(false);
  const [popupType, setPopupType] = useState('ingredients'); // Track the type of popup to open
  const [videoId, setVideoId] = useState('');

  const handleOpen = (type) => {
    setOpen(true);
    setPopupType(type);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      if (!videoId) {
        const searchQuery = encodeURIComponent(`${recipe.label} recipe`);
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchQuery}&key=AIzaSyBZAYCz9HxKtQE72PqyR4JjmM2iQNQ0nHE`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            setVideoId(videoId);
          }
        } catch (error) {
          console.log("No call are making")
          console.error('Error fetching video:', error);
        }
      }
    };

    fetchVideo();
  }, [recipe.label, videoId]);


  const handleShare = (platform) => {
    const ingredientsText = recipe.ingredients
      .map((ingredient, index) => `${index + 1}. ${ingredient.text}`)
      .join('\n');

    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(ingredientsText)}`);
        break;
      case 'instagram':
        window.open(`https://www.instagram.com/?text=${encodeURIComponent(ingredientsText)}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className='recipe_card'>
      <img src={recipe.image} alt="recipe_image" className='recipe_cover_img' />
      <h3 className='recipe_name'>
        {recipe.label.split(' ').slice(0, 5).join(' ')}
      </h3>
      <div className="recipe_car_buttons">
        <button className='recipe_ingredients' onClick={() => handleOpen('ingredients')}>
          Ingredients
        </button>
        {videoId && (
          <button className='recipe_more_details' onClick={() => handleOpen('video')}>
            Get Cooking
          </button>
        )}
      </div>

      {/* Dialog Box for Ingredients and Video */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{popupType === 'ingredients' ? 'Ingredients' : 'Video'}</DialogTitle>
        <DialogContent>
          {popupType === 'ingredients' ? (
            <DialogContentText>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index}>{index + 1}. {ingredient.text}</div>
              ))}

              <div className='share__buttons'>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className='share__button'
                >
                  <BsWhatsapp className='share__icon' />
                  <span className='button__text'>share on whatsapp</span>
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className='share__button'
                >
                  <FaInstagram className='share__icon share_icons_ig' />
                  <span className='button__text'>share on instagram</span>
                </button>
              </div>

            </DialogContentText>
          ) : (
            // cooking video
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <iframe
                title="Recipe Video"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default RecipeCard;
