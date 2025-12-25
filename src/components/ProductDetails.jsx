import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import ProductCard from './ProductCard';
import './ProductDetails.css';

const ProductDetails = ({ product, onAddToCart, onNavigate, allProducts, onAddToWishlist, wishlist }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    // Normalize images logic
    const images = product.images || [product.image];

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    // Derived price calculation
    const discountedPrice = product.discount
        ? Math.round(product.price * (1 - product.discount / 100))
        : product.price;

    // Filter similar products
    const similarProducts = allProducts
        .filter(p =>
            p.id !== product.id &&
            p.category === product.category &&
            p.gender === product.gender
        )
        .slice(0, 4); // Show max 4 similar items

    const handleAddToCart = () => {
        if (!selectedSize) return;

        const itemToAdd = {
            ...product,
            selectedSize,
            quantity,
            uniquePrice: discountedPrice // Use calculated price
        };

        onAddToCart(itemToAdd);
        alert(`Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart!`);
    };

    return (
        <div className="product-details-page">
            <button className="back-btn" onClick={() => onNavigate('home')} style={{
                background: 'none', border: 'none', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
                <ArrowLeft size={20} /> Back to Collection
            </button>

            <div className="product-details-container">
                {/* Image Gallery */}
                <div className="product-gallery">
                    <div className="gallery-thumbnails">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${product.name} view ${idx + 1}`}
                                className={`gallery-thumbnail ${activeImage === idx ? 'active' : ''}`}
                                onClick={() => setActiveImage(idx)}
                            />
                        ))}
                    </div>
                    <div className="main-image-container">
                        <img
                            src={images[activeImage]}
                            alt={product.name}
                            className="main-image"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <div>
                        <span className="pd-category">{product.gender} / {product.category}</span>
                        <h1 className="pd-title">{product.name}</h1>
                    </div>

                    <div className="pd-price-container">
                        <span>₹{discountedPrice.toLocaleString('en-IN')}</span>
                        {product.discount && (
                            <>
                                <span className="pd-original-price">₹{product.price.toLocaleString('en-IN')}</span>
                                <span className="pd-discount">-{product.discount}% OFF</span>
                            </>
                        )}
                    </div>

                    <p className="pd-description">{product.description}</p>

                    {/* Size Selection */}
                    <div className="pd-options-section">
                        <span className="option-label">Select Size</span>
                        <div className="size-grid">
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="pd-options-section">
                        <span className="option-label">Quantity</span>
                        <div className="quantity-controls">
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            >-</button>
                            <span className="qty-display">{quantity}</span>
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(q => q + 1)}
                            >+</button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pd-actions">
                        <button
                            className="btn-add-cart"
                            disabled={!selectedSize}
                            onClick={handleAddToCart}
                        >
                            {selectedSize ? 'Add to Cart' : 'Select a Size'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <div className="similar-products-section">
                    <h2 className="section-title">You May Also Like</h2>
                    <div className="similar-grid">
                        {similarProducts.map(p => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                onAddToCart={onAddToCart}
                                onAddToWishlist={onAddToWishlist}
                                isInWishlist={wishlist.some(item => item.id === p.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
