import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, title, subtitle, onAddToWishlist, onAddToCart, wishlist, onProductClick }) => {
    return (
        <section className="product-section container">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                {subtitle && <p className="section-subtitle">{subtitle}</p>}
            </div>

            <div className="product-grid">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToWishlist={onAddToWishlist}
                        onAddToCart={onAddToCart}
                        isInWishlist={wishlist ? wishlist.some(item => item.id === product.id) : false}
                        onClick={() => onProductClick && onProductClick(product)}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
