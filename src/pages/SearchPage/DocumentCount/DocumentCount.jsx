// DocumentCount.jsx
/**
 * DocumentCount Component.
 * This component handles the input for specifying the number of documents to be displayed in a search result.
 * It provides functionality for input validation and error display.
 *
 * @param {number} documentCount - The current count of documents to be displayed.
 * @param {Function} setDocumentCount - A function to update the document count state.
 * @returns {JSX.Element} The DocumentCount component with an input field for specifying the document count.
 */
import React, {useEffect, useState} from 'react';
import styles from './DocumentCount.module.scss';

const DocumentCount = ({ documentCount, setDocumentCount }) => {
  const [error, setError] = useState('');

  /**
   * Validate the document count.
   * Sets appropriate error messages based on the validity of the document count.
   */
  const validateDocumentCount = () => {
    const count = Number(documentCount);

    if (!documentCount) {
      setError("Обязательное поле");
    } else if (isNaN(count) || count < 1 || count > 1000) {
      setError("Введите корректные данные");
    } else {
      setError("");
    }
  };

  // Validate the document count whenever documentCount changes
  useEffect(() => {
    validateDocumentCount();
  }, [documentCount]);

  // Render the DocumentCount component
  return (
    <div className={`${styles.formField} ${styles.formFieldInputs}`}>
      <label htmlFor="documentCount">
        Количество документов в выдаче
        <span className={error ? `${styles.requiredAsterisk} ${styles.error}` : styles.requiredAsterisk}>*</span>
      </label>
      <input
        type="number"
        id="documentCount"
        name="documentCount"
        // Apply error styles if there's an error
        className={error ? styles.inputError : ''}
        value={documentCount}
        onChange={(e) => {
          const newValue = e.target.value;
          setDocumentCount(newValue);
          // Clear error on input change
          setError('');
        }}
        // Validate the document count on blur
        onBlur={() => validateDocumentCount()}
        placeholder="от 1 до 1000"
      />
      {/* Display error message if there's an error */}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default DocumentCount; 