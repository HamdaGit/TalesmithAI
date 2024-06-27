import React, { createContext, useState } from 'react';

export const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [storyRequest, setStoryRequest] = useState('');
  const [storyResponse, setStoryResponse] = useState(null);

  return (
    <StoryContext.Provider value={{ storyRequest, setStoryRequest, storyResponse, setStoryResponse }}>
      {children}
    </StoryContext.Provider>
  );
};