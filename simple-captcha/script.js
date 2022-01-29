// Generate a simple captcha
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const random = [randomNumber(1, 100), randomNumber(1, 10)];
const captchaOperation = document.getElementById('captcha-operation');
const check = document.getElementById('check');
const input = document.getElementById('answer');
const result = document.getElementById('result');
// captchaOperation.innerHTML = [random[0], '+', random[1], '='].join(' ');
// or
captchaOperation.innerHTML = `${random[0]} + ${random[1]} =`;

check.onclick = function () {
    const items = captchaOperation.innerHTML.split(' ');
    const sum = parseInt(items[0]) + parseInt(items[2]);
    result.innerHTML = (input.value == sum).toString();
};