'use strict'; //for cross-browser compatibility

document.addEventListener('DOMContentLoaded', function (event) {
    let inputNumber = document.querySelector('input[name=number]');
    let total = document.querySelector('.total');
    let btnResult = document.querySelector('input[type=submit]');
    let btnOperators = document.querySelectorAll('input[type=button]');

    let number1 = '';
    let number2 = '';
    let operator = '';
    let res = '';

    // Input remove value on click
    inputNumber.onfocus = function () {
        inputNumber.value = '';
    };

    // Input mask - only numbers values
    inputNumber.onkeyup = function () {
        this.value = this.value.replace(/\.(?=.*\.)|[^\d]/g, '');
        btnResult.disabled = false;
    };

    // Click to "=" button
    btnResult.onclick = calcForm;

    // Click to '+', '-', '/', '*' buttons
    for (let i = 0; i < btnOperators.length; i++) {
        btnOperators[i].onclick = getOperator;
    }

    // Click to '+', '-', '/', '*' buttons
    function getOperator() {
        number1 = parseFloat(inputNumber.value); // input number1 value
        if (!isNaN(number1)) {
            operator = this.getAttribute('value'); // operator + - = *
            inputNumber.focus(); // focus to input and remove old value
        }
    }

    // Click to "=" button
    function calcForm() {
        number2 = parseFloat(inputNumber.value); // input number2 value

        switch (operator) {
            case '+':
                res = number1 + number2;
                break;

            case '-':
                res = number1 - number2;
                break;

            case '/':
                res = number1 / number2;
                break;

            case '*':
                res = number1 * number2;
                break;
        }

        total.innerHTML = res; // show result
        btnResult.disabled = true;
    }
});