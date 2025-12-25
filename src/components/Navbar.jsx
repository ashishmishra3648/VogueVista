import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X, LogIn, LogOut, Package, Database } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onFilterChange, categories, wishlistCount, cartCount, onNavigate, onSearch, user, onLoginClick, onLogout }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
    // Optional: keep search bar open or close it
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value); // Real-time search
  };

  const handleShowDatabase = () => {
    const users = JSON.parse(localStorage.getItem('voguevista_users') || '[]');
    console.log("Database (LocalStorage):", users);
    alert("Registered Users Database:\n" + JSON.stringify(users, null, 2));
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <a href="/" className="navbar-logo">
          VogueVista
        </a>

        {/* Desktop Links */}
        <div className="navbar-links hidden-mobile">
          <button className="nav-link" onClick={() => onFilterChange('all', 'new')}>New Arrivals</button>

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


          <button className="nav-link text-gold" onClick={() => onFilterChange('all', 'sale')}>Sale</button>
        </div>

        {/* Icons */}
        <div className="navbar-icons">
          {/* Search Box */}
          <div className={`search-container ${showSearch ? 'active' : ''}`} ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearchChange}
              />
            </form>
            <button className="icon-btn" aria-label="Search" onClick={() => setShowSearch(!showSearch)}>
              <Search size={20} />
            </button>
          </div>

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

          {/* Profile Section */}
          <div className="profile-container" ref={profileRef}>
            <button
              className="icon-btn hidden-mobile"
              aria-label="Account"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <User size={20} color={user ? 'var(--color-gold)' : 'var(--color-text)'} />
            </button>

            {showProfileMenu && (
              <div className="dropdown-menu profile-menu">
                {user ? (
                  <>
                    <div className="profile-header">
                      <span className="hello-msg">Hello, {user.name}</span>
                    </div>
                    <button className="dropdown-item" onClick={() => { onNavigate('wishlist'); setShowProfileMenu(false); }}>
                      <Heart size={16} style={{ marginRight: '8px' }} /> My Wishlist
                    </button>
                    <button className="dropdown-item" onClick={() => { onNavigate('cart'); setShowProfileMenu(false); }}>
                      <ShoppingBag size={16} style={{ marginRight: '8px' }} /> My Cart
                    </button>
                    <button className="dropdown-item" onClick={() => { setShowProfileMenu(false); }}>
                      <Package size={16} style={{ marginRight: '8px' }} /> My Orders
                    </button>
                    {/* Admin Tool - Only visible for admin@gmail.com */}
                    {user.email === 'admin@gmail.com' && (
                      <button className="dropdown-item" onClick={() => { onNavigate('admin-dashboard'); setShowProfileMenu(false); }} style={{ color: '#aaa', fontSize: '0.8rem' }}>
                        <Database size={14} style={{ marginRight: '8px' }} /> View Users (Admin)
                      </button>
                    )}
                    <button className="dropdown-item text-danger" onClick={() => { onLogout(); setShowProfileMenu(false); }}>
                      <LogOut size={16} style={{ marginRight: '8px' }} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="dropdown-item primary-action" onClick={() => { onLoginClick(); setShowProfileMenu(false); }}>
                      <LogIn size={16} style={{ marginRight: '8px' }} /> Login / Sign Up
                    </button>
                    <button className="dropdown-item" onClick={() => { onNavigate('wishlist'); setShowProfileMenu(false); }}>
                      <Heart size={16} style={{ marginRight: '8px' }} /> My Wishlist
                    </button>
                    <button className="dropdown-item" onClick={() => { onNavigate('cart'); setShowProfileMenu(false); }}>
                      <ShoppingBag size={16} style={{ marginRight: '8px' }} /> My Cart
                    </button>

                  </>
                )}
              </div>
            )}
          </div>

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
