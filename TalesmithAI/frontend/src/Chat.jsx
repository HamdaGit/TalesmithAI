import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from './axiosSetup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import './Chat.css';
import './Sidebar.css';
import logo from './assest/Tales-Logo.png'; // Import your logo

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sendMessage = useCallback(async (messageToSend) => {
    setLoading(true);
    setChatHistory((prevHistory) => [...prevHistory, { sender: 'user', message: messageToSend }]);
    try {
      const response = await axiosInstance.post('/api/chat/', { message: messageToSend });
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'ai', message: response.data.response },
      ]);
      setMessage('');
    } catch (error) {
      console.error('Error generating response:', error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'ai', message: 'Error generating response. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.state?.query) {
      const initialQuery = location.state.query;
      setMessage(initialQuery); // Pre-fill input with search query
      sendMessage(initialQuery); // Optionally send the query immediately
    }
  }, [location.state?.query, sendMessage]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewChat = () => {
    setChatHistory([]);
    setMessage('');
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/logout/');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="chat-page">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        newChat={handleNewChat}
        handleLogout={handleLogout}
      />
      <div className={`chat-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.sender}`}>
              <span>
            {chat.sender === 'user' ? (
              <span className="fw-bold">You: </span>
            ) : chat.sender === 'ai' && (
              <>
                <img src={logo} alt="TalesmithAI Logo" className="chat-logo-left" />
                <span className="fw-bold">TalesmithAI: </span>
              </>
            )}
          </span>
              {chat.message}
            </div>
          ))}
        </div>
        {loading && <div className="loading">Generating your response...</div>}
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button onClick={handleSendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
