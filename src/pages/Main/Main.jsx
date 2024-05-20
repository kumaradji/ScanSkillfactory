// Main.jsx
/**
 * Main Component.
 * This component serves as the main content container for the main page.
 * It aggregates the About, Carousel, and Tariffs components, which provide
 * information about the service, display a carousel of features, and show available tariff plans, respectively.
 *
 * @param {boolean} isLoggedIn - Flag indicating whether the user is logged in.
 * @param {string} userTariff - The type of the user's current tariff plan.
 * @returns {JSX.Element} The Main component with aggregated subcomponents.
 */
import React from 'react';
import About from "./About/About";
import Tariffs from "./Tariffs/Tariffs";
import Carousel from "../../components/Carousel/Carousel";

import styles from './Main.module.scss';

const Main = ({ isLoggedIn, userTariff }) => {
  // Render the Main component which includes About, Carousel, and Tariffs sections
  return (
    <div className={styles.mainPage}>
      {/* About section providing information about the service */}
      <About isLoggedIn={isLoggedIn} />
      {/* Carousel section showcasing features */}
      <Carousel />
      {/* Tariffs section showing available plans */}
      <Tariffs isLoggedIn={isLoggedIn} userTariff={userTariff} />
    </div>
  )
}

export default Main;