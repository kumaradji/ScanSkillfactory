// src/pages/SearchPage/Tonality/Tonality.jsx
import React from 'react';
import styles from './Tonality.module.scss';

const Tonality = ({tonality, setTonality}) => {
  return (
    <div className={`${styles.formField} ${styles.formFieldInputs}`}>
      <label htmlFor="tonality">Тональность</label>

      <div className={styles.selectWrapper}>
        <select
          id="tonality"
          name="tonality"
          value={tonality}
          onChange={(e) => setTonality(e.target.value)}>

          <option value="Любая">Любая</option>
          <option value="Позитивная">Позитивная</option>
          <option value="Негативная">Негативная</option>

        </select>
      </div>
    </div>
  );
};

export default Tonality;
