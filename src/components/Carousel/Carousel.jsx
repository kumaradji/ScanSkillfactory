// Carousel.jsx
/**
 * Carousel Component.
 * This component displays a carousel of cards with icons and text,
 * showcasing the reasons why customers should choose our services.
 * Users can scroll through the carousel cards horizontally.
 *
 * The component also includes a large image for visual appeal.
 *
 * @returns {JSX.Element} The Carousel component with scrollable cards and a large image.
 */

import React, {useRef} from 'react';
import largePicture from "../../assets/carousel_large_picture.svg";
import Magnifier from "../../assets/carousel_icon_magnifier.svg";
import Shield from "../../assets/carousel_icon_shield.svg";
import Watch from "../../assets/carousel_icon_watch.svg";
import arrowRight from "../../assets/arrow_right_icon.svg";
import styles from "../Carousel/Carousel.module.scss";


const Carousel = () => {
  // Reference for the carousel content container
  const carouselRef = useRef(null);

  // Function to scroll the carousel to the left
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= window.innerWidth / 3;
    }
  };

  // Function to scroll the carousel to the right
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += window.innerWidth / 3;
    }
  };

  // Render the carousel component
  return (
    <div className={styles.carouselBlock}>
      <h2 className={styles.carouselBlock__title}>Почему именно мы</h2>

      <div className={styles.carouselBlock__wrapper}>

        {/* Left arrow for scrolling */}
        <div className={styles.carouselBlock__arrow_left} onClick={scrollLeft}>
          <img src={arrowRight} alt="arrow" role="button"/>
        </div>

        {/* Carousel content with cards */}
        <div className={styles.carouselBlock__content} ref={carouselRef}>

          {/* Individual cards with icon and text */}
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Shield} alt="shield icon"/>
            <p>Защита конфиденциальных сведений,
              <br/>не подлежащих разглашению по
              <br/>федеральному законодательству</p>
          </div>
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Watch} alt="watch icon"/>
            <p>Высокая и оперативная скорость
              <br/>обработки заявки</p>
          </div>
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Magnifier} alt="magnifier icon"/>
            <p>Огромная комплексная база
              <br/>данных, обеспечивающая
              <br/>объективный ответ на запрос</p>
          </div>
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Shield} alt="shield icon"/>
            <p>Защита персональных данных,
              <br/>не подлежащих разглашению по
              <br/>федеральному законодательству</p>
          </div>
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Watch} alt="watch icon"/>
            <p>Высокая надежность
              <br/>результатов поиска</p>
          </div>

        </div>

        {/* Right arrow for scrolling */}
        <div className={styles.carouselBlock__arrow} onClick={scrollRight}>
          <img src={arrowRight} alt="arrow" role="button"/>
        </div>
      </div>

      {/* Large image displayed below the carousel */}
      <div className={styles.carouselBlock__image}>
        <img className={styles.carouselBlock__large_image}
             src={largePicture} alt="Carousel Scan image"/>
      </div>
    </div>
  )
}

export default Carousel

