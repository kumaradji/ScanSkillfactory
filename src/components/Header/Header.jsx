// src/components/Header/Header.jsx
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import UserBlock from './UserBlock/UserBlock';
import {useAuth} from '../../hooks/AuthContext';
import useWindowSize from '../../hooks/useWindowSize';

import styles from './Header.module.scss';

import greenLogo from '../../assets/scan_logo_green.svg';
import whiteLogo from '../../assets/scan_logo_white.svg';
import fallout_menu_icon from '../../assets/fallout_menu_icon.svg';
import close_icon from '../../assets/closing_icon.svg';

const Header = ({isLoggedIn, userName, userPicture, setUserName, setUserPicture}) => {
  const {setIsLoggedIn} = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const {width} = useWindowSize();
  const isMobile = width <= 1360;

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleLoginAndCloseMenu = () => {
    handleLoginClick();
    setIsMenuVisible(false);
  };

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

  return (
    <header className={isMenuVisible && isMobile ? 'menu-visible' : ''}>
      <div className={styles.header__content}>
        <img className={styles.header__logo} src={isMenuVisible && isMobile ? whiteLogo : greenLogo}
             alt="Scan logo"/>

        {!isMobile && <Navbar/>}

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
