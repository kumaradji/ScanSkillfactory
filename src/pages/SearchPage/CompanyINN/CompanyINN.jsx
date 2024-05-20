// CompanyINN.jsx
/**
 * CompanyINN Component
 *
 * This component handles the input of a company's INN (Individual Taxpayer Identification Number) in a React application.
 * It provides functionality for input validation and error display.
 *
 * Props:
 *   - companyINN: string - The INN value of the company
 *   - setCompanyINN: function - A function to update the companyINN state
 *
 * State:
 *   - error: string - Holds the error message for input validation
 *
 * useEffect:
 *   - Runs the validation function whenever the companyINN prop changes and updates the error state accordingly.
 *
 * Render:
 *   - Renders a label and an input field for the company's INN.
 *   - The input field is bound to the companyINN state.
 *   - onChange event updates the companyINN state and clears any existing error.
 *   - onBlur event re-validates the input when focus is lost.
 *   - If there's an error, it displays an error message below the input field.
 *
 * Dependencies:
 *   - React: For building the component
 *   - CompanyINN.module.scss: Styles for the component
 *   - validateINN: Utility function for validating the company's INN
 */
import React, {useEffect, useState} from 'react';
// Importing styles
import styles from './CompanyINN.module.scss';
// Importing utility function for INN validation
import validateINN from '../../../utils/validateINN';

const CompanyINN = ({ companyINN, setCompanyINN }) => {
  // Component function accepting props
  const [error, setError] = useState('');
  // State for holding error message

  useEffect(() => {
    // Effect for validating INN on prop change
    const errorMessage = validateINN(companyINN);
    // Validate INN
    setError(errorMessage);
    // Update error state
  }, [companyINN]);

  return (
    <div className={`${styles.formField} ${styles.formFieldInputs}`}>
      {/* Label for input */}
      <label htmlFor="companyINN">ИНН компании
        {/* Display asterisk for required field */}
        <span className={error ? `${styles.requiredAsterisk} ${styles.error}` : styles.requiredAsterisk}>*</span>
      </label>
      <input
        type="text"
        id="companyINN"
        name="companyINN"
        // Apply error styles if there's an error
        className={error ? styles.inputError : ''}
        value={companyINN}
        onChange={(e) => {
          setCompanyINN(e.target.value);
          // Clear error on input change
          setError('');
        }}
        // Re-validate INN on blur
        onBlur={() => setError(validateINN(companyINN))}
        placeholder="10 цифр"
      />
      {/* Display error message if there's an error */}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default CompanyINN;
