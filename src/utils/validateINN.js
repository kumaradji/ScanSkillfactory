// validateINN.js
/**
 * Utility function to validate a Russian Individual Taxpayer Identification Number (INN).
 * It checks if the INN is not empty, numeric, and has a length of 10 or 12 digits.
 *
 * @param {string} inn - The INN to validate.
 * @returns {string} An error message if validation fails, or an empty string if the INN is valid.
 */
const isNumeric = (value) => /^d+$/.test(value);
const isLength10or12 = (value) => [10, 12].includes(value.length);

const validateINN = (inn) => {
  if (!inn) {
    return 'Обязательное поле';
  }

  if (!isNumeric(inn)) {
    return 'Введите корректные данные';
  }

  if (!isLength10or12(inn)) {
    return 'Введите корректные данные';
  }

  // Additional format check for INN using regular expression
  const innRegex = /^(d{10}|d{12})$/;
  if (!innRegex.test(inn)) {
    return 'Введите корректные данные';
  }

  // If all checks pass, return an empty error message
  return '';
};

export default validateINN;