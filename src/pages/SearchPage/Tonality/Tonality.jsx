// Tonality.jsx
/**
 * Tonality Component.
 * This component provides a dropdown selection for specifying the tonality of the search results.
 *
 * @param {string} tonality - The current selected tonality.
 * @param {Function} setTonality - A function to update the tonality state.
 * @returns {JSX.Element} The Tonality component with a dropdown to select the tonality.
 */
import React from 'react';
import styles from './Tonality.module.scss';

const Tonality = ({ tonality, setTonality }) => {
  // Render the Tonality component
  return (
    <div className={`${styles.formField} ${styles.formFieldInputs}`}>
      {/* Label for the select input */}
      <label htmlFor="tonality">Тональность</label>

      <div className={styles.selectWrapper}>
        <select
          id="tonality"
          name="tonality"
          value={tonality}
          onChange={(e) => setTonality(e.target.value)}>

          {/* Option for any tonality */}
          <option value="Любая">Любая</option>
          {/* Option for positive tonality */}
          <option value="Позитивная">Позитивная</option>
          {/* Option for negative tonality */}
          <option value="Негативная">Негативная</option>
        </select>
      </div>
    </div>
  );
};

export default Tonality;