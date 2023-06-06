import React, { useEffect, useState } from 'react'
import './navbar.css'
import LOGO from '../../assets/LOGO.png'
import { BsSearch } from 'react-icons/bs'
import { CgUserlane } from 'react-icons/cg'


// Edamam API call 
// base URL => https://api.edamam.com/ 
// add search? => https://api.edamam.com/search?
// add query q='recipe_name' => https://api.edamam.com/search?q=paneer
// add & => https://api.edamam.com/search?q=paneer&
// add Api key => https://api.edamam.com/search?q=paneer&app_id=474077ac
// add & => https://api.edamam.com/search?q=paneer&app_id=474077ac
// add API_KEY => https://api.edamam.com/search?q=paneer&app_id=474077ac&app_key=2e19581b08ce60694d9e7a01eb59f595

// this is the final Key
// https://api.edamam.com/search?q=burger&app_id=474077ac&app_key=2e19581b08ce60694d9e7a01eb59f595
// const APP_ID = "474077ac";
// const API_KEY = "2e19581b08ce60694d9e7a01eb59f595";

const Navbar = ({ onRecipeListUpdate }) => {
    const [timer, setTimer] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    // const [recipeList, updatedRecipeList] = useState([])

    const fetchRecipes = async () => {
        try {
            const response = await fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}`);
            const data = await response.json();
            onRecipeListUpdate(data.hits);
        } catch (error) {
            console.error('API Error:', error);
        }
    };




    useEffect(() => {
        clearTimeout(timer)

        if (searchQuery) {
            const apiTimer = setTimeout(() => {
                // making api call 
                fetchRecipes();
            }, 500)

            setTimer(apiTimer)
        }

    }, [searchQuery])

    const onTextChange = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className="header_logo_container">
                    <img src={LOGO} alt="LOGO" className='header_logo_image' />
                    <div className="header_names">
                        <h1 className='header_logo_name'>Make</h1>
                        <h1 className='header_logo_subname'>Tastyy</h1>
                    </div>
                </div>
                <div className='header_search'>
                    <BsSearch className='header_search_icon' />
                    <input type="text" name="search" className='header_search_bar' placeholder='search here...' onChange={onTextChange} />
                </div>

                <div className='portfolio'>
                    <a href="https://roshan-rajurkar.github.io/R_R_/" target='_blank'><CgUserlane className='portfolio__link' /></a>
                </div>
            </div>

        </div>
    )
}

export default Navbar
