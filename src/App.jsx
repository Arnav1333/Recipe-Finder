import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [data, setData] = useState([]);
  const [recipe, setRecipe] = useState('');

  const searchRecipe = (event) => {
    if (event.key === 'Enter' && recipe.trim() !== '') {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(recipe)}&app_id=e9a06815&app_key=2c7d0ef887c02470710b184487c4c840`;
      
      axios.get(url)
        .then((response) => {
          setData(response.data.hits); 
          console.log(response.data.hits);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      setRecipe('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={recipe}
          onChange={(event) => setRecipe(event.target.value)}
          onKeyPress={searchRecipe}
          placeholder="Enter Recipe Name"
          type="text"
        />
      </div>
      <div className="recipes">
        {data.slice(0, 5).map((recipeData, index) => (
          <div key={index} className="recipe-card">
            <h3 className="recipe-title">{recipeData.recipe.label}</h3>
            <p>Cusine: {recipeData.recipe.cuisineType}</p>
            <p>Type: {recipeData.recipe.dishType}</p>
            <img className="recipe-image" src={recipeData.recipe.image} alt={recipeData.recipe.label} />
            <ul className="recipe-ingredients">
              {recipeData.recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient.text}</li>
              ))}
            </ul>
            <a className="recipe-link" href={recipeData.recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
