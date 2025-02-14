import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';  
import './home.css';

const Home = ({ searchTerm }) => {
    const [recipes, setRecipes] = useState([]);
    const [topRecipes, setTopRecipes] = useState([]);

    useEffect(() => {
        // Fetch recipes from the server
        axios.get('http://localhost:5001/recipes')
            .then(response => {
                const allRecipes = response.data;
                const sortedRecipes = allRecipes.sort((a, b) => b.rating - a.rating);  
                setRecipes(allRecipes);
                setTopRecipes(sortedRecipes.slice(0, 6));  // Limit to 6 top recipes
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });
    }, []);  

    // Filter recipes based on the search term 
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    // Determine slider settings based on number of top recipes
    const settings = {
        dots: true,
        infinite: topRecipes.length > 2,  
        speed: 500,
        slidesToShow: topRecipes.length < 3 ? topRecipes.length : 3,  
        slidesToScroll: 1,
        arrows: false,  
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: topRecipes.length < 2 ? topRecipes.length : 2,  // On medium screens, show fewer if there are fewer recipes
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: topRecipes.length < 1 ? topRecipes.length : 1,  // On small screens, show only 1 recipe if less
                }
            }
        ]
    };

    return (
        <div className="home">
            {/* Conditionally render Top Recipes Slider only if searchTerm is empty */}
            {!searchTerm && topRecipes.length > 0 && (
                <div className="top-recipes-slider">
                    <h1>Top Recipes</h1>
                    <Slider {...settings}>
                        {topRecipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-card">
                                <Link to={`/recipes/${recipe.id}`}>
                                    <img src={recipe.image} alt={recipe.title} />
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {/* Recipe List Section (filtered by searchTerm) */}
            <h1>All Recipes</h1>
            <div className="recipe-list">
                {filteredRecipes.length === 0 ? (
                    <p>No recipes found.</p>
                ) : (
                    filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            <img src={recipe.image} alt={recipe.title} />
                            <h2>{recipe.title}</h2>
                            <p>{recipe.prepTime}</p>
                            <Link to={`/recipes/${recipe.id}`} className="view-recipe-btn">View Recipe</Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
