import React, { useState } from 'react';
import Recipe from './Recipe';
import './Recipe.css';

const Home = () => {
  const [showRecipe, setShowRecipe] = useState(false);

  const toggleRecipe = () => {
    setShowRecipe(!showRecipe);
  };

  return (
    <div>
      <h1 className='formato-titulo'>Platos Tradicionales Registrados</h1>
      <Recipe/>
    </div>
    
  );
};

export default Home;
