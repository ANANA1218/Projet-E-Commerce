import React from 'react';

function CategoryBar(props) {
  const categories = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3', 'Catégorie 4', 'Catégorie 5'];

  return (
    <nav>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <a href="#" onClick={() => props.onCategoryClick(category)}>
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryBar;
