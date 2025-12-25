import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import { products, categories } from './data/products';

import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import './components/NavbarSearchProfile.css'; // Import the new styles

function App() {
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // New States
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null); // null = Guest
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Filter products based on selected gender, category, and search query
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by gender
    if (selectedGender !== 'all') {
      filtered = filtered.filter(p => p.gender.toLowerCase() === selectedGender.toLowerCase());
    }

    // Filter by category or special collection
    if (selectedCategory === 'new') {
      filtered = filtered.filter(p => p.isNew);
    } else if (selectedCategory === 'sale') {
      filtered = filtered.filter(p => p.discount);
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [selectedGender, selectedCategory, searchQuery]);

  const handleFilterChange = (gender, category) => {
    setSelectedGender(gender);
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when picking a category
    setCurrentView('home'); // Go back to home when filtering
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (currentView !== 'home') {
      setCurrentView('home'); // Switch to home to show results
    }
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const addToCart = (product) => {
    setCart(prev => {
      // If adding with size/quantity (from details page)
      if (product.selectedSize) {
        return [...prev, product];
      }
      // Fallback for grid quick-add (optional, maybe default size M?) or just add generic
      return [...prev, { ...product, selectedSize: 'M', quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
  };

  // Auth Handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuthModal(false); // Close modal on successful login
    // Optional: Auto-navigate to profile component if it existed
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  // Dynamic title based on filters
  const getTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`; // Show search title
    if (selectedGender === 'all' && selectedCategory === 'all') {
      return 'Curated Collection';
    }
    if (selectedGender !== 'all' && selectedCategory === 'all') {
      return `${selectedGender === 'men' ? "Men's" : "Women's"} Collection`;
    }
    if (selectedCategory === 'new') return 'New Arrivals';
    if (selectedCategory === 'sale') return 'Sale Collection';

    const genderText = selectedGender === 'all' ? '' : `${selectedGender === 'men' ? "Men's" : "Women's"} `;
    const categoryText = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    return `${genderText}${categoryText}`;
  };

  const getSubtitle = () => {
    if (filteredProducts.length === 0) {
      return 'No products found. Try different filters.';
    }
    return `Discover ${filteredProducts.length} handpicked ${selectedGender === 'all' ? '' : selectedGender === 'men' ? "men's" : "women's"} products`;
  };

  return (
    <>
      <Navbar
        onFilterChange={handleFilterChange}
        categories={categories}
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      <main>
        {currentView === 'home' && (
          <>
            {selectedGender === 'all' && selectedCategory === 'all' && !searchQuery && <Hero />}
            <ProductGrid
              title={getTitle()}
              subtitle={getSubtitle()}
              products={filteredProducts}
              onAddToWishlist={addToWishlist}
              onAddToCart={addToCart}
              onProductClick={handleProductClick}
              wishlist={wishlist}
            />
          </>
        )}
        {currentView === 'product-details' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={addToCart}
            onNavigate={handleNavigate}
            allProducts={products}
            onAddToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        )}
        {currentView === 'wishlist' && (
          <Wishlist
            wishlistItems={wishlist}
            onNavigate={handleNavigate}
            onAddToWishlist={addToWishlist}
            onAddToCart={addToCart}
            wishlist={wishlist}
          />
        )}
        {currentView === 'cart' && (
          <Cart
            cartItems={cart}
            onRemoveFromCart={removeFromCart}
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'admin-dashboard' && user?.email === 'admin@gmail.com' && (
          <AdminDashboard />
        )}
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
}

export default App;
