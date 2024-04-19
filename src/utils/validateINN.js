// utils/validateINN.js
const isNumeric = (value) => /^\d+$/.test(value);
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

  // Дополнительная проверка формата ИНН с помощью регулярного выражения
  const innRegex = /^(\d{10}|\d{12})$/;
  if (!innRegex.test(inn)) {
    return 'Введите корректные данные';
  }

  return '';
};

export default validateINN;