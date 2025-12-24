import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({
    selectedGender,
    selectedCategory,
    onGenderChange,
    onCategoryChange,
    genders,
    categories
}) => {
    const currentCategories = categories[selectedGender] || categories.all;

    return (
        <div className="category-filter-section">
            <div className="container">
                {/* Gender Filter */}
                <div className="gender-filter">
                    <h3 className="filter-title">Shop By</h3>
                    <div className="gender-buttons">
                        {genders.map(gender => (
                            <button
                                key={gender.id}
                                className={`gender-btn ${selectedGender === gender.id ? 'active' : ''}`}
                                onClick={() => onGenderChange(gender.id)}
                            >
                                {gender.name}
                                <span className="count">({gender.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Filter */}
                <div className="category-filter">
                    <h3 className="filter-title">Categories</h3>
                    <div className="category-buttons">
                        <button
                            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => onCategoryChange('all')}
                        >
                            All Products
                        </button>
                        {currentCategories.map(category => (
                            <button
                                key={category.id}
                                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => onCategoryChange(category.id)}
                            >
                                {category.name}
                                <span className="count">({category.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;
