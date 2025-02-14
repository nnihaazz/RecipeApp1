import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './RecipeForm.css';

const RecipeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the recipe ID from the URL, if editing
  const [recipe, setRecipe] = useState({
    title: '',
    image: '',
    prepTime: '',
    ingredients: '',
    steps: '',
  });

  useEffect(() => {
    if (id) {
      // If we're editing, fetch the existing recipe data
      axios
        .get(`http://localhost:5001/recipes/${id}`)
        .then((response) => {
          setRecipe({
            title: response.data.title,
            image: response.data.image,
            prepTime: response.data.prepTime,
            ingredients: response.data.ingredients.join(','),
            steps: response.data.steps.join(','),  
          });
        })
        .catch((error) => {
          console.error('There was an error fetching the recipe!', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split(',').map((item) => item.trim()),
      steps: recipe.steps.split(',').map((item) => item.trim()),
    };

    if (id) {
      // If we're editing, update the recipe
      axios
        .put(`http://localhost:5001/recipes/${id}`, newRecipe)
        .then((response) => {
          alert('Recipe updated successfully!');
          navigate(`/recipes/${id}`); // Redirect to the updated recipe detail page
        })
        .catch((error) => {
          console.error('There was an error updating the recipe!', error);
        });
    } else {
      // If we're adding a new recipe
      axios
        .post('http://localhost:5001/recipes', newRecipe)
        .then((response) => {
          alert('Recipe added successfully!');
          navigate('/'); // Redirect to the homepage or another page
        })
        .catch((error) => {
          console.error('There was an error adding the recipe!', error);
        });
    }
  };

  return (
    <div className="recipe-form">
      <h2>{id ? 'Edit Recipe' : 'YOU CAN CREATE YOUR RECIPE HERE'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Preparation Time</label>
          <input
            type="text"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients (comma-separated)</label>
          <input
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Steps (comma-separated)</label>
          <input
            type="text"
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? 'Update Recipe' : 'Submit Recipe'}</button>
      </form>
    </div>
  );
};

export default RecipeForm;
