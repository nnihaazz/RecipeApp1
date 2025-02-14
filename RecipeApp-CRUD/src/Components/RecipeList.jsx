import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const { data } = await axios.get('http://localhost:5000/recipes');
    setRecipes(data);
  };

  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:5000/recipes/${id}`);
    fetchRecipes();
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <div className="card mb-4">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p>Prep Time: {recipe.prepTime}</p>
                <Link to={`/recipes/${recipe.id}`} className="btn btn-primary">View</Link>
                <button className="btn btn-danger ms-2" onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
