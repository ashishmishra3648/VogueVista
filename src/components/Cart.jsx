import React from 'react';
import { Trash2, ArrowLeft } from 'lucide-react';
import './Cart.css';

const Cart = ({ cartItems, onRemoveFromCart, onNavigate }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart-page container">
            <button className="back-btn" onClick={() => onNavigate('home')}>
                <ArrowLeft size={20} /> Continue Shopping
            </button>

            <h2 className="section-title">Your Shopping Bag ({cartItems.length})</h2>

            {cartItems.length === 0 ? (
                <div className="empty-state">
                    <p>Your bag is empty.</p>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.images ? item.images[0] : item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-category">{item.category}</p>
                                    <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => onRemoveFromCart(item.id)}
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                        <button className="checkout-btn bg-gold">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
