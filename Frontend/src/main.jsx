// Create this file as: src/main.jsx
import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create the context
export const Context = createContext();

// Create the provider component
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

// Wrap App inside AppWrapper and render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
