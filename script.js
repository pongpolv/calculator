'use strict';

const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const pointBtn = document.querySelector('#pointBtn');
const equalBtn = document.querySelector('#equalBtn');
const operatorValue = document.querySelector('.operatorValue');
const operatorSign = document.querySelector('.operatorSign');
let resetDisplay = false;
let firstValue;
let secondValue;
let currentSign;
let clearConstrain;

// Add Eventlistener to each button
numberBtn.forEach((btn) =>
  btn.addEventListener('click', function (e) {
    const input = e.target.dataset.number;
    if (clearConstrain) {
      clearConstrain = false;
    }
    appendNum(input, 'lower');
  })
);

clearBtn.addEventListener('click', function (e) {
  resetDisplay = false;
  firstValue = '';
  secondValue = '';
  currentSign = '';
  operatorValue.textContent = 0;
  operatorValue.textContent = '';
  operatorSign.textContent = '';
  clearConstrain = true;
});

deleteBtn.addEventListener('click', function (e) {
  const deleteNum = operatorValue.textContent.toString().slice(0, -1);
  operatorValue.textContent = '';
  appendNum(deleteNum, 'lower');
});

pointBtn.addEventListener('click', function (e) {
  appendPoint();
});

equalBtn.addEventListener('click', function (e) {
  if (secondValue === 0 && currentSign === '/') {
    operatorValue.textContent = 'undefined';
    firstValue = '';
    secondValue = '';
    currentSign = '';
    resetDisplay = true;
    clearConstrain = true;
    return;
  } // If no user input > nothing happened
  else if (!secondValue) {
    return;
  } // Initial value input or No Operator input
  else if (!firstValue || !currentSign) {
    appendNum(secondValue, 'upper');
    firstValue = secondValue;
    secondValue = '';
    resetDisplay = true;
    return;
  }

  const result = mathOperation();
  appendNum(`${firstValue} ${currentSign} ${secondValue}`, 'upper');
  appendNum(result, 'lower');
  firstValue = result;
  currentSign = '';
  secondValue = '';
  resetDisplay = true;
});

operatorBtn.forEach((btn) =>
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    //// Operator sign
    const input = e.target.dataset.operator;
    resetDisplay = true;
    if (clearConstrain) {
    } else if (secondValue === 0 && currentSign === '/') {
      operatorValue.textContent = 'undefined';
      firstValue = '';
      secondValue = '';
      currentSign = '';
      clearConstrain = true;
    } /// 1. No first value, append value to Upper and store secondvalue into first value, store currentsign
    else if (!firstValue && !currentSign) {
      appendNum(`${secondValue} ${input}`, 'upper');
      firstValue = secondValue;
      secondValue = '';
      currentSign = input;
    } /// 2. Have first and second value also current sign, call mathOperation, empty secondValue and store result as firstValue, append value to both upper and lower
    else if (firstValue && secondValue && currentSign) {
      currentSign = input;
      const result = mathOperation();
      appendNum(`${result} ${input}`, 'upper');
      appendNum(result, 'lower');
      firstValue = secondValue;
      secondValue = '';
    } /// 3. Have first value and second value but no current sign => append secondvalue to first
    else if (firstValue && secondValue && !currentSign) {
      appendNum(`${secondValue} ${input}`, 'upper');
      firstValue = secondValue;
      secondValue = '';
      currentSign = input;
    } /// 4. have only firstvalue and no second value
    else if (firstValue && !secondValue) {
      appendNum(`${firstValue} ${input}`, 'upper');
      currentSign = input;
    } /// 5. No first , second , sign
    return;
  })
);

function appendNum(input, selector) {
  if (operatorValue.textContent === '0' || resetDisplay) {
    resetDisplay = false;
    operatorValue.textContent = '';
  }

  if (selector === 'lower') {
    operatorValue.append(input);
    secondValue = Number(operatorValue.textContent);
  } else if (selector === 'upper') {
    operatorSign.textContent = '';
    operatorSign.append(input);
  }
}

function appendPoint() {
  if (operatorValue.textContent.includes('.')) return;
  operatorValue.append('.');
}

function mathOperation() {
  resetDisplay = true;
  let result;
  if (currentSign === '+') {
    result = firstValue + secondValue;
  }
  if (currentSign === '-') {
    result = firstValue - secondValue;
  }
  if (currentSign === '/') {
    result = Number((firstValue / secondValue).toFixed(1));
  }
  if (currentSign === 'x') {
    result = Number((firstValue * secondValue).toFixed(1));
  }
  return result;
}

///////////////////////////////////////////////////////////////////////////////////////////
