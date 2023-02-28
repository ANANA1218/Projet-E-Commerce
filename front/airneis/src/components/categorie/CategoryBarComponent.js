import React from 'react';
import CategoryBar from './CategoryBar';

function MyComponent() {
  function handleCategoryClick(category) {
    // Filtrer les produits en fonction de la catégorie sélectionnée
  }

  return (
    <div>
      <CategoryBar onCategoryClick={handleCategoryClick} />
    </div>
  );
}

export default MyComponent;
