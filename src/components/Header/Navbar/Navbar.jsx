// Navbar.jsx
/**
 * Navbar Component.
 * This component is used to display the navigation bar at the top of the website.
 * It provides links to the main sections of the website such as Home, Pricing, and FAQ.
 * The navigation bar is a key element for website navigation and user orientation.
 *
 * @returns {JSX.Element} The Navbar component with navigation links.
 */
import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  // Render the navigation bar with links
  return (
    <nav className={styles.navbar}>

      {/* Link to the home page */}
      <a href="/">Главная</a>

      {/* Link to the pricing page */}
      <a href="#">Тарифы</a>

      {/* Link to the FAQ page */}
      <a href="#">FAQ</a>
    </nav>
  );
};

export default Navbar;