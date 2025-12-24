import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import ProductGrid from './components/ProductGrid';
import { products, categories } from './data/products';

import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

function App() {
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'wishlist', 'cart'

  // Filter products based on selected gender and category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by gender
    if (selectedGender !== 'all') {
      filtered = filtered.filter(p => p.gender.toLowerCase() === selectedGender.toLowerCase());
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    return filtered;
  }, [selectedGender, selectedCategory]);

  const handleFilterChange = (gender, category) => {
    setSelectedGender(gender);
    setSelectedCategory(category);
    setCurrentView('home'); // Go back to home when filtering
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
      // Simple add, duplicates allowed or just quantity? 
      // For now, let's just add it. Or maybe check duplicates if we want unique items.
      // Let's allow duplicates for now or simple check.
      // User asked for "add to cart", usually implies adding to list.
      return [...prev, product];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  // Dynamic title based on filters
  const getTitle = () => {
    if (selectedGender === 'all' && selectedCategory === 'all') {
      return 'Curated Collection';
    }
    if (selectedGender !== 'all' && selectedCategory === 'all') {
      return `${selectedGender === 'men' ? "Men's" : "Women's"} Collection`;
    }
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
      />
      <main>
        {currentView === 'home' && (
          <>
            <Hero />
            <ProductGrid
              title={getTitle()}
              subtitle={getSubtitle()}
              products={filteredProducts}
              onAddToWishlist={addToWishlist}
              onAddToCart={addToCart}
              wishlist={wishlist}
            />
          </>
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
      </main>
    </>
  );
}

export default App;
