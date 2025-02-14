import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './RecipeForm.css';

const EditRecipe = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the recipe ID from the URL, for editing
    const [recipe, setRecipe] = useState({
        title: '',
        image: '',
        prepTime: '',
        ingredients: '',
        steps: '',
    });

    useEffect(() => {
        if (id) {
            // Fetch the existing recipe data when editing
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
                    console.error('Error fetching the recipe!', error);
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

        const updatedRecipe = {
            ...recipe,
            ingredients: recipe.ingredients.split(','), 
            steps: recipe.steps.split(','), 
        };

        // Update the recipe if editing
        if (id) {
            axios
                .put(`http://localhost:5001/recipes/${id}`, updatedRecipe)
                .then((response) => {
                    alert('Recipe updated successfully!');
                    navigate(`/recipes/${id}`); // Redirect to the recipe detail page after updating
                })
                .catch((error) => {
                    console.error('There was an error updating the recipe!', error);
                });
        }
    };

    return (
        <div className="recipe-form">
            <h2>YOU CAN EDIT YOUR RECIPE HERE</h2>
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
                <button type="submit">Update Recipe</button>
            </form>
        </div>
    );
};

export default EditRecipe;
