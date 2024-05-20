// App.jsx
/**
 * App Component.
 * This is the root component of the application. It sets up routing and manages the main layout, including the header and footer.
 * The component also handles user authentication status and displays different pages based on whether the user is logged in.
 *
 * @returns {JSX.Element} The root App component with routing and main layout.
 */

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import {useAuth} from "./hooks/AuthContext";

import Footer from './components/Footer/Footer';
import user_pic_example from './assets/user_pic_example.png';
import './styles/styles.scss';

import './fonts/ferry.otf';
import './fonts/InterRegular.ttf';

import Authorization from "./components/Authorization/Authorization";
import Header from "../src/components/Header/Header";
import Main from "./pages/Main/Main";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  // Destructure authentication functions from context
  const { isLoggedIn, checkAuthStatus } = useAuth();

  // State for user tariff
  const [userTariff, setUserTariff] = useState('beginner');

  // State for user name
  const [userName, setUserName] = useState('');

  // State for user picture
  const [userPicture, setUserPicture] = useState(user_pic_example);

  // Log a message if the user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Пользователь не вошёл");
    }
  }, [isLoggedIn]);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Render the App component with routing and main layout
  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        setUserName={setUserName}
        userPicture={userPicture}
        setUserPicture={setUserPicture}
      />
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} userTariff={userTariff} />} />
        <Route path="/auth" element={<Authorization />} />
        <Route path="/search" element={isLoggedIn ? <SearchPage /> : <Authorization redirectBack="/search" />} />
        <Route path="/results" element={isLoggedIn ? <ResultsPage /> : <Authorization redirectBack="/results" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
