import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch, toggleTheme, theme }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); 
  };

  useEffect(() => {
    document.body.classList.remove('light', 'dark-theme');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className={`navbar ${theme}`}>
      {/* Clickable Recipe Book title */}
      <h2>
        <Link to="/about" className="title-link">
          Recipe Book
        </Link>
      </h2>

      {/* Navigation links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/my-recipes">My Recipes</Link>
        <Link to="/recipe-form">Create Recipe</Link>
      </div>

      {/* Search bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search Recipes..."
        value={searchTerm}
        onChange={handleSearchChange} 
      />

      <div className="theme-toggle-icon" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'} {/* Moon for light theme, Sun for dark */}
      </div>
    </div>
  );
};

export default Navbar;
