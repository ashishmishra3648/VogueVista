import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onFilterChange, categories, wishlistCount, cartCount, onNavigate }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <a href="/" className="navbar-logo">
          VogueVista
        </a>

        {/* Desktop Links */}
        <div className="navbar-links hidden-mobile">
          <button className="nav-link" onClick={() => onFilterChange('all', 'all')}>New Arrivals</button>

          <div
            className="nav-item"
            onMouseEnter={() => setActiveDropdown('women')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="nav-link"
              onClick={() => onFilterChange('women', 'all')}
            >
              Women
            </button>
            <div
              className="dropdown-menu"
              style={{
                display: activeDropdown === 'women' ? 'flex' : 'none',
                opacity: activeDropdown === 'women' ? 1 : 0,
                visibility: activeDropdown === 'women' ? 'visible' : 'hidden'
              }}
            >
              <button
                className="dropdown-item"
                onClick={() => onFilterChange('women', 'all')}
              >
                All Women
              </button>
              {categories?.women?.map(cat => (
                <button
                  key={cat.id}
                  className="dropdown-item"
                  onClick={() => onFilterChange('women', cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div
            className="nav-item"
            onMouseEnter={() => setActiveDropdown('men')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="nav-link"
              onClick={() => onFilterChange('men', 'all')}
            >
              Men
            </button>
            <div
              className="dropdown-menu"
              style={{
                display: activeDropdown === 'men' ? 'flex' : 'none',
                opacity: activeDropdown === 'men' ? 1 : 0,
                visibility: activeDropdown === 'men' ? 'visible' : 'hidden'
              }}
            >
              <button
                className="dropdown-item"
                onClick={() => onFilterChange('men', 'all')}
              >
                All Men
              </button>
              {categories?.men?.map(cat => (
                <button
                  key={cat.id}
                  className="dropdown-item"
                  onClick={() => onFilterChange('men', cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <button className="nav-link" onClick={() => onFilterChange('all', 'all')}>Accessories</button>
          <button className="nav-link text-gold" onClick={() => onFilterChange('all', 'all')}>Sale</button>
        </div>

        {/* Icons */}
        <div className="navbar-icons">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <button
            className="icon-btn"
            aria-label="Wishlist"
            onClick={() => onNavigate('wishlist')}
            style={{ position: 'relative' }}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </button>
          <button
            className="icon-btn"
            aria-label="Cart"
            onClick={() => onNavigate('cart')}
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </button>
          <button className="icon-btn hidden-mobile" aria-label="Account">
            <User size={20} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="icon-btn visible-mobile"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Placeholder - Expandable logic can be added here */}
    </nav>
  );
};

export default Navbar;
