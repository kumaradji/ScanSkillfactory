// UserBlock.jsx
/**
 * UserBlock Component.
 * This component serves as a container for user-related components and actions.
 * It conditionally renders the UserActions or UserInfo components based on the
 * current state of the application, such as whether the user is logged in,
 * whether the app is in mobile view, and whether the menu is visible.
 * It also handles user data fetching simulation and name formatting.
 *
 * @param {boolean} isLoggedIn - Flag indicating whether the user is logged in.
 * @param {string} userName - The name of the logged-in user.
 * @param {string} userPicture - The URL of the user's profile picture.
 * @param {Function} setUserName - Function to set the user's name.
 * @param {Function} setUserPicture - Function to set the user's profile picture.
 * @param {boolean} isMobile - Flag indicating whether the app is in mobile view.
 * @param {boolean} isMenuVisible - Flag indicating whether the mobile menu is visible.
 * @returns {JSX.Element} The UserBlock component with user actions or information.
 */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import UserActions from './UserActions/UserActions';
import UserInfo from './UserInfo/UserInfo';

import UserPictureExample from '../../../assets/user_pic_example.png';
import styles from './UserBlock.module.scss';

const UserBlock = ({isLoggedIn, userName, userPicture, setUserName, setUserPicture, isMobile, isMenuVisible}) => {
  const [isLoadingActions, setIsLoadingActions] = useState(true);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  useEffect(() => {
    setIsLoadingActions(true);
    setTimeout(() => {
      const userData = {
        name: 'Александр Алексеев',
        picture: UserPictureExample
      };
      setUserName(formatName(userData.name));
      setUserPicture(userData.picture);
      setIsLoadingActions(false);
    }, 2000);
  }, []);

  function formatName(fullName) {
    const parts = fullName.split(' ');
    if (parts.length > 1) {
      return `${parts[0]} ${parts[1].charAt(0)}.`;
    }
    return fullName;
  }

  return (
    <div className={styles.userBlocks}>

      {isMobile && isLoggedIn && !isMenuVisible && (
        <UserActions isLoading={isLoadingActions}/>
      )}

      {isMobile && isLoggedIn && isMenuVisible && (
        <UserInfo
          userName={userName}
          userPicture={userPicture}
          isLoading={isLoadingActions}
        />
      )}

      {!isMobile && isLoggedIn && (
        <>
          <UserActions isLoading={isLoadingActions}/>
          <UserInfo userName={userName} userPicture={userPicture} isLoading={isLoadingActions}/>
        </>
      )}

    </div>
  );
};

export default UserBlock;