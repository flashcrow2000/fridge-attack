// src/pages/RecipeDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [missingIngredients, setMissingIngredients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/recipe-details`, {
          recipeId,
          userIngredients: [], // Add user ingredients here if needed
        });

        setRecipe(response.data.recipe);
        setMissingIngredients(response.data.missingIngredients);
      } catch (err) {
        setError('Failed to fetch recipe details.');
        console.error(err);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h2>Instructions</h2>
      <p>{recipe.instructions || 'No instructions available.'}</p>
      <h2>Missing Ingredients</h2>
      <ul>
        {missingIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetails;