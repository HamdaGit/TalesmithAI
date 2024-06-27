// frontend/src/SearchBox.jsx

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBox.css';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate('/chat', { state: { query: searchQuery } }); // Navigate with query state
  };

  return (
    <div className="search-box-container">
      <form onSubmit={handleSearchSubmit} className="search-box-wrapper">
        <textarea
          ref={inputRef}
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="search-input"
          placeholder="Start Chat Here..."
          style={{ width: '700px' }}
        />
        <button type="submit" className="search-icon-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
