import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <img src="/logo-hero.png" alt="VogueVista Emblem" className="hero-logo-img" />
            <h1 className="hero-title">
                Elegance <span className="text-gold">Redefined</span>.
            </h1>
            <p className="hero-subtitle">The New Era of Luxury Fashion</p>

            <div className="hero-buttons">
                <button className="btn-primary">Shop Collection</button>
                <button className="btn-outline">Explore World</button>
            </div>
        </section>
    );
};

export default Hero;
