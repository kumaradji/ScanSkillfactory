// useAuthorization.js
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "./AuthContext";

/**
 * Custom hook for handling authorization logic.
 * @returns {{
 *   username: string,
 *   password: string,
 *   usernameError: boolean,
 *   passwordError: boolean,
 *   handleLogin: Function,
 *   handleUsernameChange: Function,
 *   handlePasswordChange: Function
 * }}
 */

const useAuthorization = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Redirect to home page if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Handle user login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          login: username,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('tokenExpire', data.expire);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        throw new Error(data.message || 'Ошибка при входе');
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      setUsernameError(true);
      setPasswordError(true);
    }
  };

  // Reset username error state
  const validateUsername = (input) => {
    setUsernameError(false);
  };

  // Reset password error state
  const validatePassword = (input) => {
    setPasswordError(false);
  };

  // Handle username change
  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    validateUsername(input);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword(input);
  };

  return {
    username,
    password,
    usernameError,
    passwordError,
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
  };
};

export default useAuthorization;