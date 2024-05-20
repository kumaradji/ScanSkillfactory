// CheckboxBlock.jsx
/**
 * CheckboxBlock Component.
 * This component renders a set of checkboxes based on the provided states and labels.
 * It is used to allow users to toggle various search filters.
 * Each checkbox is accompanied by a label that describes its purpose.
 *
 * @param {Object} checkboxStates - An object containing the current state of each checkbox.
 * @param {Function} handleCheckboxChange - A function to handle changes to checkbox states.
 * @returns {JSX.Element} The CheckboxBlock component with a list of checkboxes.
 */
import React from 'react';
import styles from './CheckboxBlock.module.scss';

const CheckboxBlock = ({ checkboxStates, handleCheckboxChange }) => {
  // Labels for the checkboxes
  const labels = {
    maxCompleteness: "Признак максимальной полноты",
    businessMentions: "Упоминания в бизнес-контексте",
    mainRole: "Главная роль в публикации",
    riskFactorsOnly: "Публикации только с риск-факторами",
    includeMarketNews: "Включать технические новости рынков",
    includeAnnouncements: "Включать анонсы и календари",
    includeNewsSummaries: "Включать сводки новостей",
  };

  // Render the CheckboxBlock component
  return (
    <div className={styles.rightPartSearchCheckboxBlock}>
      {/* Iterate over checkboxStates to render each checkbox with its label */}
      {Object.keys(checkboxStates).map((key) => (
        <div key={key} className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={`checkbox-${key}`}
            name={key}
            checked={checkboxStates[key]}
            onChange={handleCheckboxChange}
          />
          
          {/* Custom styled checkbox and label */}
          <label htmlFor={`checkbox-${key}`} className={checkboxStates[key] ? styles.checkedLabel : ""}>
            <span className={styles.customCheckbox}></span>
            <span className={styles.labelText}>{labels[key]}</span>
          </label>
        </div>
      ))}
    </div>
  );

};

export default CheckboxBlock;
