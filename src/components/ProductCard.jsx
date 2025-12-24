import React, { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToWishlist, onAddToCart, isInWishlist }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // Handle multiple images - if product has images array, use it, otherwise use single image
    const images = product.images || [product.image];

    // Auto-rotate images on hover
    React.useEffect(() => {
        let interval;
        if (isHovering && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 800); // Change image every 800ms
        } else {
            setCurrentImageIndex(0); // Reset to first image when not hovering
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovering, images.length]);

    return (
        <div className="product-card">
            <div
                className="product-image-container"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <img
                    src={images[currentImageIndex]}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                />
                <div className="product-overlay">
                    <button
                        className="card-btn"
                        aria-label="Add to cart"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                        }}
                    >
                        <ShoppingBag size={18} />
                    </button>
                    <button
                        className={`card-btn ${isInWishlist ? 'active' : ''}`}
                        aria-label="Add to wishlist"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToWishlist(product);
                        }}
                        style={isInWishlist ? { backgroundColor: 'var(--color-gold)', color: '#000' } : {}}
                    >
                        <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
                    </button>
                </div>

                {/* Image indicator dots */}
                {images.length > 1 && (
                    <div className="image-indicators">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`indicator-dot ${index === currentImageIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="product-details">
                <h4 className="product-category">{product.category}</h4>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
        </div>
    );
};

export default ProductCard;
