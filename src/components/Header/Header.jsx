// Header.jsx
/**
 * Header Component.
 * This component serves as the main header for the application, providing navigation and user authentication controls.
 * It adapts to different screen sizes and toggles visibility of the mobile menu.
 * The header also handles automatic logout when the authentication token expires.
 *
 * @param {boolean} isLoggedIn - Indicates if the user is currently logged in.
 * @param {string} userName - The name of the logged-in user.
 * @param {string} userPicture - The URL of the user's profile picture.
 * @param {Function} setUserName - Function to update the user's name.
 * @param {Function} setUserPicture - Function to update the user's profile picture.
 * @returns {JSX.Element} The Header component.
 */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import UserBlock from './UserBlock/UserBlock';
import {useAuth} from '../../hooks/AuthContext';
import useWindowSize from '../../hooks/useWindowSize';
import styles from './Header.module.scss';
import greenLogo from '../../assets/logo_green.svg';
import whiteLogo from '../../assets/logo_white.svg';
import fallout_menu_icon from '../../assets/fallout_menu_icon.svg';
import close_icon from '../../assets/closing_icon.svg';

const Header = ({isLoggedIn, userName, userPicture, setUserName, setUserPicture}) => {
  const {setIsLoggedIn} = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const {width} = useWindowSize();
  const isMobile = width <= 1360;

  // Toggles the visibility of the mobile menu
  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const navigate = useNavigate();

  // Navigates to the authentication page
  const handleLoginClick = () => {
    navigate('/auth');
  };

  // Handles login and closes the mobile menu
  const handleLoginAndCloseMenu = () => {
    handleLoginClick();
    setIsMenuVisible(false);
  };

  // Sets up an interval to check for token expiration and logs out the user if the token has expired
  useEffect(() => {
    const interval = setInterval(() => {
      const tokenExpire = localStorage.getItem('tokenExpire');
      const now = new Date();

      if (!tokenExpire || new Date(tokenExpire) <= now) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');
      }
    }, 2000 * 60);

    return () => clearInterval(interval);
  }, []);

  // Renders the header with navigation, user block, and mobile menu controls
  return (
    <header className={isMenuVisible && isMobile ? 'menu-visible' : ''}>
      <div className={styles.header__content}>
        <img className={styles.header__logo} src={isMenuVisible && isMobile ? whiteLogo : greenLogo}
             alt="Scan logo"/>

        {/* Navigation bar for non-mobile view */}
        {!isMobile && <Navbar/>}

        {/* User block for non-mobile view when the user is logged in */}
        {!isMobile && isLoggedIn && (
          <div className={styles.header__rightSection}>
            <UserBlock
              isLoggedIn={isLoggedIn}
              userName={userName}
              userPicture={userPicture}
              setUserName={setUserName}
              setUserPicture={setUserPicture}
            />
          </div>
        )}

        {/* User block for mobile view when the menu is not visible */}
        {isMobile && !isMenuVisible && (
          <UserBlock
            isLoggedIn={isLoggedIn}
            userName={userName}
            userPicture={userPicture}
            setUserName={setUserName}
            setUserPicture={setUserPicture}
            isMenuVisible={isMenuVisible}
            isMobile={isMobile}
          />
        )}

        {/* Menu icon for mobile view */}
        {isMobile && (
          <img src={isMenuVisible ? close_icon : fallout_menu_icon}
               alt="Menu" className={styles.header__logo_menuIcon}
               onClick={toggleMenuVisibility}/>
        )}

        {!isLoggedIn && !isMobile && (
          <div className={styles.header__rightSection}>
            <div className={styles.header__regBlock}>
              <a href="/auth" className={styles.header__regLink}>Зарегистрироваться</a>
              <div className={styles.header__verticalDivider}></div>
              <button
                className={styles.header__loginButton}
                id="loginButton"
                onClick={handleLoginClick}>
                Войти
              </button>
            </div>
          </div>
        )}
      </div>

      {isMenuVisible && isMobile && (
        <div className={styles.header__dropdownMenu}>
          <Navbar/>
          {isLoggedIn ? (
            <UserBlock
              isLoggedIn={isLoggedIn}
              userName={userName}
              userPicture={userPicture}
              setUserName={setUserName}
              setUserPicture={setUserPicture}
              isMenuVisible={isMenuVisible}
              isMobile={isMobile}
            />
          ) : (
            <div className={styles.header__regBlock}>
              <a href="/auth" className={styles.header__regLink}>Зарегистрироваться</a>
              <button
                className={styles.header__loginButton}
                id="loginButton"
                onClick={handleLoginAndCloseMenu}>
                Войти
              </button>
            </div>
          )}
        </div>
      )}


    </header>
  );
};


export default Header;