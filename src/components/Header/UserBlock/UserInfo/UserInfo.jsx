// UserInfo.jsx
/**
 * UserInfo Component.
 * This component displays the user's name and profile picture.
 * It also provides a logout link that allows the user to log out of the application.
 * When the user's information is being loaded, a loading icon is displayed.
 *
 * @param {string} userName - The name of the user to display.
 * @param {string} userPicture - The URL of the user's profile picture.
 * @param {boolean} isLoading - Flag indicating whether the user's information is loading.
 * @returns {JSX.Element} The UserInfo component with user details or a loading state.
 */
import React from 'react';
import {useAuth} from '../../../../hooks/AuthContext';
import styles from './UserInfo.module.scss';
import loading_icon from '../../../../assets/loading_icon.svg';

const UserInfo = ({ userName, userPicture, isLoading }) => {
  const { setIsLoggedIn } = useAuth();

  // Function to handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpire');
  };

  // Render the user information or a loading icon
  return (
    <div className={styles.userInfo}>
      <div className={styles.userInfo__details}>
        {/* Display the user's name */}
        <div className={styles.userInfo__userName}>{userName}</div>
        {/* Logout link */}
        <a href="#" className={styles.userInfo__logout} onClick={handleLogout}>Выйти</a>
      </div>
      {/* Conditional rendering of loading icon or user picture */}
      {isLoading ? (
        <img src={loading_icon} alt="Loading" className={styles.userInfo__loadingIcon}/>
      ) : (
        <img src={userPicture} alt="User" className={styles.userInfo__userPicture}/>
      )}
    </div>
  );
};

export default UserInfo;