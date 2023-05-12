import React from 'react';
import './noRecipeFound.css'
import logo from '../../assets/LOGO.png'

const NoRecipeFound = () => {
    return (
        <div className="image_container">
            <img
                src={logo}
                alt="No Recipe Found"
                className="centered-image"
            />
            {/* <p>Not Found</p> */}
        </div>
    );
};

export default NoRecipeFound;
