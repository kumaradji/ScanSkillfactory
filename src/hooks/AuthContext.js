// AuthContext.js
/**
 * AuthContext Module.
 * This module provides an authentication context for managing user authentication status within the application.
 * It includes a provider component and a hook for accessing the authentication context.
 */

import React, {createContext, useContext, useEffect, useState} from 'react'; // Import necessary React functions

// Create the authentication context
const AuthContext = createContext();

// AuthProvider component to wrap around parts of the app that need access to authentication context
export const AuthProvider = ({ children }) => {
  // State to hold the login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check authentication status
  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken'); // Get access token from local storage
    const tokenExpire = localStorage.getItem('tokenExpire'); // Get token expiration time from local storage
    const now = new Date(); // Get current date and time

    // Check if the token is expired or not found
    if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
      console.log("Token expired or not found.");
      setIsLoggedIn(false); // Set login status to false
      localStorage.removeItem('accessToken'); // Remove access token from local storage
      localStorage.removeItem('tokenExpire'); // Remove token expiration time from local storage
    } else {
      setIsLoggedIn(true); // Set login status to true
    }
  };

  // useEffect to run checkAuthStatus on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Provide authentication context values to children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use authentication context
export const useAuth = () => useContext(AuthContext);
