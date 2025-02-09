// src/App.js
import axios from 'axios';
import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/recipes', {
        ingredients: ingredients.split(',').map((item) => item.trim()),
      });

      setRecipes(response.data.recipes);
      setError('');
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error(err);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>RecipeGenie</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter ingredients (comma-separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <button type="submit">Find Recipes</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="recipes">
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
              <h2>{recipe.name}</h2>
              { recipe.image && <img src={recipe.image} alt={recipe.name} /> }
              <p>{recipe.description}</p>
              <hr />
              <p>Used Ingredients: {recipe.usedIngredients.map((ing) => ing.name).join(', ')}</p>
              <p>Missing Ingredients: {recipe.missedIngredients ? recipe.missedIngredients.map((ing) => ing.name).join(', ') : "none"}</p>
            </Link>
          ))}
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;