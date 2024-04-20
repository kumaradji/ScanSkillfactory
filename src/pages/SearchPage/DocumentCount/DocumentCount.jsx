// src/pages/SearchPage/DocumentCount/DocumentCount.jsx
import React, {useEffect, useState} from 'react';
import styles from './DocumentCount.module.scss';

const DocumentCount = ({ documentCount, setDocumentCount }) => {
  const [error, setError] = useState('');

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

  useEffect(() => {
    validateDocumentCount();
  }, [documentCount]);

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
        className={error ? styles.inputError : ''}
        value={documentCount}
        onChange={(e) => {
          const newValue = e.target.value;
          setDocumentCount(newValue);
          setError('');
        }}
        onBlur={() => validateDocumentCount()} // Убран вызов setError, так как validateDocumentCount уже его устанавливает
        placeholder="от 1 до 1000"
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default DocumentCount;
