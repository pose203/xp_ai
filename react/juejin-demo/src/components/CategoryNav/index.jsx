import React from 'react';
import { Link } from 'react-router-dom';
import { useCategoryStore } from '../../store';
import styles from './index.module.css';

const CategoryNav = () => {
  const { categories, setActiveCategory } = useCategoryStore();

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
  };

  return (
    <div className={styles.categoryNav}>
      <div className={styles.categoryNavList}>
        {categories.map(category => (
          <Link 
            key={category.id}
            to={`/${category.id}`}
            className={`${styles.categoryItem} ${category.active ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav; 