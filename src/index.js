// index.js
/**
 * Entry Point for the React Application.
 * This file sets up the React application and renders the root component.
 * It wraps the App component with the AuthProvider to manage authentication context.
 */

import React from 'react';
// Import React and ReactDOM functions
import {createRoot} from 'react-dom/client';

// Import the main App component
import App from './App';
// Import the AuthProvider for authentication context
import {AuthProvider} from './hooks/AuthContext';

// Create a root container and render the App component wrapped with AuthProvider
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
