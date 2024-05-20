// DateInput.jsx
/**
 * DateInput Component.
 * This component renders input fields for selecting a date range, with validation to ensure the dates are within a valid range.
 * It is used to allow users to input start and end dates for filtering data.
 * Error messages are displayed if the date range is invalid.
 *
 * @param {string} startDate - The current start date value.
 * @param {Function} setStartDate - A function to update the start date value.
 * @param {string} endDate - The current end date value.
 * @param {Function} setEndDate - A function to update the end date value.
 * @returns {JSX.Element} The DateInput component with date range inputs.
 */
import React, {useEffect, useState} from 'react';
import styles from './DateInput.module.scss';

const DateInput = ({ startDate, setStartDate, endDate, setEndDate }) => {
  // State to manage error messages
  const [error, setError] = useState('');

  // State to manage the input type for start and end date fields
  const [inputTypeStart, setInputTypeStart] = useState('text');
  const [inputTypeEnd, setInputTypeEnd] = useState('text');

  // Validate the date range whenever startDate or endDate changes
  useEffect(() => {
    validateDateRange();
  }, [startDate, endDate]);

  /**
   * Validate the date range.
   * Sets appropriate error messages based on the validity of the date range.
   */
  const validateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (!startDate || !endDate) {
      setError("Обязательное поле");
    } else if (new Date(startDate) > new Date(endDate)) {
      setError("Введите корректные данные");
    } else if (new Date(startDate) > currentDate || new Date(endDate) > currentDate) {
      setError("Дата не может быть позже текущей даты");
    } else {
      setError("");
    }
  };

  // Render the DateInput component
  return (
    <div className={styles.formField}>
      <label htmlFor="startDate">Диапазон поиска<span
        className={error ? `${styles.requiredAsterisk} ${styles.error}` : styles.requiredAsterisk}>*</span>
      </label>
      <div className={styles.formFieldDateInputs}>
        <div className={styles.dateInputContainer}>
          <div className={styles.dateInputWrapper}>
            <input
              type={inputTypeStart}
              onFocus={() => setInputTypeStart('date')}
              onBlur={() => {
                validateDateRange();
                if (!startDate) setInputTypeStart('text');
              }}
              id="startDate"
              name="startDate"
              placeholder="Дата начала"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={error ? styles.error : ''}
            />
            <span className={styles.dateIcon}></span>
          </div>

          <div className={styles.dateInputWrapper}>
            <input
              type={inputTypeEnd}
              onFocus={() => setInputTypeEnd('date')}
              onBlur={() => {
                validateDateRange();
                if (!endDate) setInputTypeEnd('text');
              }}
              id="endDate"
              name="endDate"
              placeholder="Дата конца"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={error ? styles.error : ''}
            />
            <span className={styles.dateIcon}></span>
          </div>

        </div>
        {error && <div className={`${styles.dateErrorMessage} ${styles.error}`}>{error}</div>}
      </div>
    </div>
  );
};

export default DateInput;