// TariffCard.jsx
// TariffCard.jsx
/**
 * TariffCard Component.
 * This component represents a single tariff plan card.
 * It displays the tariff name, description, price, features, and a call-to-action button.
 * The card's appearance changes based on whether the tariff is active and whether the user is logged in.
 *
 * @param {string} name - The name of the tariff plan.
 * @param {string} description - A short description of the tariff plan.
 * @param {string} icon - The URL of the icon representing the tariff plan.
 * @param {string} colorClass - The CSS class for the tariff plan's color theme.
 * @param {string} activeColorClass - The CSS class for the active state color theme.
 * @param {boolean} isActive - Flag indicating whether the tariff plan is currently active.
 * @param {boolean} isLoggedIn - Flag indicating whether the user is logged in.
 * @param {string} textColorClass - The CSS class for the text color theme.
 * @param {string} price - The current price of the tariff plan.
 * @param {string} oldPrice - The old price of the tariff plan, if any.
 * @param {string} installmentText - Text related to installment payment, if any.
 * @param {Array} features - A list of features included in the tariff plan.
 * @param {string} tariffType - The type of the tariff plan.
 * @returns {JSX.Element} The TariffCard component with tariff details.
 */
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

  // Render the TariffCard component
  return (
    <div
      className={`${styles.tariffCard} ${isActive && isLoggedIn && tariffType === 'beginner' ? activeColorClass : ''}`}>
      {/* Tariff color block with name, description, and icon */}
      <div className={`${styles.tariffCard__tariffColoredBlock} ${colorClass}`}>
        <div className={styles.tariffCard__tariffNameBlock}>
          <h3 style={{color: `var(--scan-${textColorClass})`}}>{name}</h3>
          <p style={{color: `var(--scan-${textColorClass})`}}>{description}</p>
        </div>
        <div className={styles.tariffCard__tariffIconBlock}>
          <img className={styles.tariffCard__tariffIcon} src={icon} alt={`${name} icon`}/>
        </div>
      </div>

      {/* Badge indicating if the tariff is the current plan */}
      <div className={styles.tariffCard__yourTariffBlock}>
        {isActive && isLoggedIn && (
          <div className={styles.tariffCard__yourTariffBadge}>Текущий тариф</div>
        )}
      </div>

      {/* Tariff price and installment text */}
      <div className={styles.tariffCard__tariffCardTextBlock}>
        <div className={styles.tariffCard__tariffPriceBlock}>
          <div className={styles.tariffCard__tariffPrices}>
            <h3>{price}</h3>
            {oldPrice && <p className={styles.tariffCard__lastPriceTag}>{oldPrice}</p>}
          </div>
        </div>
        {installmentText && <p className={styles.tariffCard__installmentText}>{installmentText}</p>}
      </div>

      {/* List of features included in the tariff */}
      <div>
        <p className={styles.tariffCard__cardText20px}>В тариф входит:</p>
        {features.map((feature, index) => (
          // Feature item with a green checkbox icon and text
          <div key={index} className={styles.tariffCard__tariffToIncludeLines}>
            <img className={styles.tariffCard__greenCheckbox} src={Checkbox} alt="checkbox"/>
            <p className={styles.tariffCard__cardText}>{feature}</p>
          </div>
        ))}

        {/* Call-to-action button */}
        <div className={styles.tariffCard__tariffButtonDiv}>
          {isActive && isLoggedIn ? (
            // Button to go to the personal account if the tariff is active and the user is logged in
            <button
              className={`${styles.tariffCard__buttonTariffs} ${styles.tariffCard__grey}`}
              id="requestDataButton">
              Перейти в личный кабинет
            </button>
          ) : (
            <button className={`${styles.tariffCard__buttonTariffs}`}
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