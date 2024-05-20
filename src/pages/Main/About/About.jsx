// About.jsx
/**
 * About Component.
 * This component provides information about the service, explaining its purpose
 * and how it can be used to search for publications about a company using its tax identification number (INN).
 * It includes a call-to-action button that directs logged-in users to start a search or
 * prompts non-logged-in users to authenticate.
 *
 * @param {boolean} isLoggedIn - Flag indicating whether the user is logged in.
 * @returns {JSX.Element} The About component with service information and action button.
 */
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './About.module.scss';
import AboutPicture from "../../../assets/about_picture.jpg"

const About = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // Function to handle the click event on the data request button
  const handleRequestDataClick = () => {
    // Navigate to the search page if logged in, otherwise go to the auth page
    if (isLoggedIn) {
      navigate('/search');
    } else {
      navigate('/auth');
    }
  };

  // Render the About component
  return (
    <div className={styles.aboutBlock}>
      {/* Information section with title and description */}
      <div className={styles.aboutBlock__info}>
        <h1 className={styles.aboutBlock__h1}>Сервис по поиску<br />публикаций <br />о компании<br />по его ИНН</h1>
        <p className={styles.aboutBlock__p}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
        {/* Button to request data, visible only to logged-in users */}
        {isLoggedIn && <button
          className={styles.aboutBlock__button}
          id="requestDataButton"
          onClick={handleRequestDataClick}>
          Запросить данные
        </button>}
      </div>
      {/* Image section */}
      <img className={styles.aboutBlock__image} src={AboutPicture} alt="About Scan image" />
    </div>
  )
}

export default About;