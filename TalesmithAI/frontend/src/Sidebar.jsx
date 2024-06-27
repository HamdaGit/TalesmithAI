import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from './axiosSetup';
import './Sidebar.css';
import logo from './assest/Tales-logo1.png';

const Sidebar = ({ isOpen, toggleSidebar, newChat }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Only state declaration, not a prop

  useEffect(() => {
    // Fetch chat history when the component mounts
    const fetchChatHistory = async () => {
      try {
        const response = await axiosInstance.get('/api/chat/history/');
        setChatHistory(response.data.history);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <div className="new-chat">
        <img src={logo} alt="TalesmithAI Logo" style={{ width: '50px', height: '50px' }} />
        <a href="/mainapp">TalesmithAI</a>
      </div>
      <div className="chat-history">
        <p>Chat History</p>
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-history-item">
            <p><strong>You:</strong> {chat.message}</p>
            <p><strong>TalesmithAI:</strong> {chat.response}</p>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className="user-dropdown">
          <FontAwesomeIcon
            icon={faUser}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            style={{ color: '#f8f9fa  ', fontSize: '20px' }}
          />
          {showUserDropdown && (
            <div className="dropdown-content">
              <button className="Feedback-btn">
                <a href="/feedback">Feedback</a>
              </button>
              <button className="logout-btn" >
                <a href="/">Logout</a>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
