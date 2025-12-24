import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProductGrid from './ProductGrid';

const Wishlist = ({ wishlistItems, onNavigate, onAddToWishlist, onAddToCart, wishlist }) => {
    return (
        <div className="container" style={{ paddingTop: '2rem', minHeight: '60vh' }}>
            <button
                className="back-btn"
                onClick={() => onNavigate('home')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    color: 'var(--color-text-muted)',
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                    padding: 0
                }}
            >
                <ArrowLeft size={20} /> Continue Shopping
            </button>

            {wishlistItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
                    <h2>Your Wishlist is empty</h2>
                    <p>Save items you love to view them here.</p>
                </div>
            ) : (
                <ProductGrid
                    title="Your Wishlist"
                    subtitle={`${wishlistItems.length} saved items`}
                    products={wishlistItems}
                    onAddToWishlist={onAddToWishlist}
                    onAddToCart={onAddToCart}
                    wishlist={wishlist}
                />
            )}
        </div>
    );
};

export default Wishlist;
