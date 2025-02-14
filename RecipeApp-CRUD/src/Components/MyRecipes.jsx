import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './MyRecipes.css';

const MyRecipes = ({ searchTerm }) => {  
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/recipes')
      .then(response => {
        setRecipes(response.data);
        setFilteredRecipes(response.data);  // Initially, all recipes are displayed
      })
      .catch(error => {
        console.error("There was an error fetching the recipes:", error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      // Filter recipes based on the search term
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        recipe.steps.some(step =>
          step.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes); 
    }
  }, [searchTerm, recipes]);  

  const handleDelete = (id) => {
    // Delete the recipe
    axios.delete(`http://localhost:5001/recipes/${id}`)
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe.id !== id)); 
        setFilteredRecipes(filteredRecipes.filter(recipe => recipe.id !== id)); 
      })
      .catch(error => {
        console.error("Error deleting recipe:", error);
      });
  };

  return (
    <div>
      <h1 style={{fontSize:40,marginTop:15}}>My Recipes</h1>
        {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h2>{recipe.title}</h2>
              <p>{recipe.prepTime}</p>
              <Link to={`/recipes/${recipe.id}`} className="view-recipe-btn">View Recipe</Link>
              <button onClick={() => navigate(`/edit-recipe/${recipe.id}`)} className="edit-btn">Edit Recipe</button>
              <button onClick={() => handleDelete(recipe.id)} className="delete-btn">Delete Recipe</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
