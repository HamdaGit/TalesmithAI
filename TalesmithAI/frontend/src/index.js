import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { StoryProvider } from './StoryContext'; // Import the StoryProvider

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the App with BrowserRouter and StoryProvider */}
    <BrowserRouter>
      <StoryProvider>
        <App />
      </StoryProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);