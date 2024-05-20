// Footer.jsx
/**
 * Footer Component.
 * This component is used to display the footer section of the website.
 * It includes the company logo, contact information, and copyright notice.
 * The footer is a common element across all pages of the website.
 *
 * @returns {JSX.Element} The Footer component with logo and contact details.
 */
import React from 'react';
import styles from './Footer.module.scss';
import FooterLogo from '../../assets/logo_white.svg';

const Footer = () => {
  // Render the footer with logo and contact information
  return (
    <footer className={styles.footer}>
      {/* Company logo */}
      <img src={FooterLogo} alt="Company logo"/>

      {/* Text block with contact information */}
      <div className={styles.footer__textBlock}>
        <p className={styles.footer__text}>г. Москва, Цветной б-р, 40</p>
        <p className={styles.footer__text}>+7 495 771 21 11</p>
        <p className={styles.footer__text}>info@company.ru</p>
        {/* Copyright notice */}
        <p className={styles.footer__copyright}>Copyright © 2022</p>
      </div>
    </footer>
  );
};

export default Footer;