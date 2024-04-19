// TariffCard.jsx
import React from 'react';
import styles from './TariffCard.module.scss';
import Checkbox from "../../../assets/tariffs_green_checkbox_icon.svg";

const TariffCard = ({
                      name,
                      description,
                      icon,
                      colorClass,
                      activeColorClass,
                      isActive,
                      isLoggedIn,
                      textColorClass,
                      price,
                      oldPrice,
                      installmentText,
                      features,
                      tariffType,
                    }) => {

  return (
    <div
      className={`${styles.resultPage__tariffCard} ${isActive && isLoggedIn && tariffType === 'beginner' ? activeColorClass : ''}`}>
      <div className={`${styles.resultPage__tariffColoredBlock} ${colorClass}`}>
        <div className={styles.resultPage__tariffNameBlock}>
          <h3 style={{color: `var(--scan-${textColorClass})`}}>{name}</h3>
          <p style={{color: `var(--scan-${textColorClass})`}}>{description}</p>
        </div>
        <div className={styles.resultPage__tariffIconBlock}>
          <img className={styles.resultPage__tariffIcon} src={icon} alt={`${name} icon`}/>
        </div>
      </div>

      <div className={styles.resultPage__yourTariffBlock}>
        {isActive && isLoggedIn && (
          <div className={styles.resultPage__yourTariffBadge}>Текущий тариф</div>
        )}
      </div>

      <div className={styles.resultPage__tariffCardTextBlock}>
        <div className={styles.resultPage__tariffPriceBlock}>
          <div className={styles.resultPage__tariffPrices}>
            <h3>{price}</h3>
            <p className={styles.resultPage__lastPriceTag}>{oldPrice}</p>
          </div>
        </div>
        <p className={styles.resultPage__installmentText}>{installmentText}</p>
      </div>

      <div>
        <p className={styles.resultPage__cardText20px}>В тариф входит:</p>
        {features.map((feature, index) => (
          <div key={index} className={styles.resultPage__tariffToIncludeLines}>
            <img className={styles.resultPage__greenCheckbox} src={Checkbox} alt="checkbox"/>
            <p className={styles.resultPage__cardText}>{feature}</p>
          </div>
        ))}
        <div className={styles.resultPage__tariffButtonDiv}>
          {isActive && isLoggedIn ? (
            <button
              className={`${styles.resultPage__buttonTariffs} ${styles.resultPage__grey}`}
              id="requestDataButton">
              Перейти в личный кабинет
            </button>
          ) : (
            <button className={`${styles.resultPage__buttonTariffs}`}
                    id="requestDataButton">
              Подробнее
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TariffCard;