// src/pages/SearchPage/CompanyINN/CompanyINN.jsx
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
import styles from './CompanyINN.module.scss'; // Importing styles
import validateINN from '../../../utils/validateINN'; // Importing utility function for INN validation

const CompanyINN = ({ companyINN, setCompanyINN }) => { // Component function accepting props
  const [error, setError] = useState(''); // State for holding error message

  useEffect(() => { // Effect for validating INN on prop change
    const errorMessage = validateINN(companyINN); // Validate INN
    setError(errorMessage); // Update error state
  }, [companyINN]);

  return (
    <div className={`${styles.formField} ${styles.formFieldInputs}`}> {/* Container for label and input */}
      <label htmlFor="companyINN">ИНН компании {/* Label for input */}
        <span className={error ? `${styles.requiredAsterisk} ${styles.error}` : styles.requiredAsterisk}>*</span> {/* Display asterisk for required field */}
      </label>
      <input
        type="text"
        id="companyINN"
        name="companyINN"
        className={error ? styles.inputError : ''} // Apply error styles if there's an error
        value={companyINN}
        onChange={(e) => {
          setCompanyINN(e.target.value);
          setError(''); // Clear error on input change
        }}
        onBlur={() => setError(validateINN(companyINN))} // Re-validate INN on blur
        placeholder="10 цифр"
      />
      {error && <div className={styles.errorMessage}>{error}</div>} {/* Display error message if there's an error */}
    </div>
  );
};

export default CompanyINN; // Export the component
