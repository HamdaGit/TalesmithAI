import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';  // Ensure the path is correct
import logo from "./assest/Tales-Logo.png";
import Sidebar from "./Sidebar";

const Header = ({ logout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate('/chat', { state: { query: searchQuery } });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate('/chat', { state: { query: suggestion } });
  };

  return (
    <div className={`header-container ${isSidebarOpen ? 'header-sidebar-open' : ''}`}>
      {!isSidebarOpen && (
        <div className="header-sidebar-toggle">
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      )}

      <div className="header-content container">
        <div className="header-search-bar-container row justify-content-center">
          <div className="header-search-box col-12 col-md-8 col-lg-6">
            <form onSubmit={handleSearchSubmit} className="w-100 position-relative">
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={handleSearchInputChange}
                type="search"
                name="search"
                id="search"
                placeholder="Message TalesMith AI"
                className="form-control"
              />
              <button 
                type="submit" 
                className={`search-icon ${searchQuery.trim() === '' ? 'disabled' : ''}`} 
                disabled={searchQuery.trim() === ''}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
        </div>
        <div className="header-items-container mt-5">
          <div className="header-item-box text-center">
            <div className="msg-box">
              <h4>How Can TalesMithAI help you?</h4>
            </div>
            <div className="logo-box mt-3">
              <img id="tale-logo" className="header-tale-logo" src={logo} alt="logo" />
            </div>
          </div>
        </div>
        <div className="header-suggestion-container row mt-4">
          <div className="header-suggestion-box col-6 col-md-3" onClick={() => handleSuggestionClick("Create a tale about a futuristic city where AI controls everything")}>
            <div className="content">
              <p>
              Create a Tale
                <span className="below">About AI cities</span>
              </p>
            </div>
          </div>
          <div className="header-suggestion-box col-6 col-md-3" onClick={() => handleSuggestionClick("Describe a journey to a planet made entirely of crystal")}>
            <div className="content">
              <p>
                Describe a journey
                <span className="below">
                  To a crystal Planet
                </span>
              </p>
            </div>
          </div>
          <div className="header-suggestion-box col-6 col-md-3" onClick={() => handleSuggestionClick("Tell a story about a young hero discovering their magical powers")}>
            <div className="content">
              <p>
                Suggest a Story
                <span className="below">About a Young Hero</span>
              </p>
            </div>
          </div>
          <div className="header-suggestion-box col-6 col-md-3" onClick={() => handleSuggestionClick("Narrate an adventure in a lost underwater kingdom")}>
            <div className="content">
              <p>
                Narrate an Adventure
                <span className="below">In an underwater kingdom</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} logout={logout} />
    </div>
  );
};

export default Header;
