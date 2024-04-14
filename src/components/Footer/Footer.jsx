import React from 'react';
import styles from './Footer.module.scss';
import FooterLogo from '../../assets/scan_logo_white.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={FooterLogo} alt="Scan logo"/>

      <div className={styles.footer__textBlock}>
        <p className={styles.footer__text}>г. Москва, Цветной б-р, 40</p>
        <p className={styles.footer__text}>+7 495 771 21 11</p>
        <p className={styles.footer__text}>info@skan.ru</p>
        <p className={styles.footer__copyright}>Copyright. 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
