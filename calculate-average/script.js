let blockInputs = document.getElementsByClassName('block-inputs')[0];
const btnAddInput = document.getElementById('add-input');
const btnCalculateAverage = document.getElementById('calculate-average');
const btnThemeSwitcher = document.getElementById('theme-switcher')

// Add Input
function addInput() {
    let li = document.createElement('li');
    li.innerHTML = `<div class="box-input"><input type="text" /></div>`;
    blockInputs.appendChild(li);
}

btnAddInput.addEventListener('click', addInput)

// Calculate Average
function calculateAverage() {
    let inputs = document.querySelectorAll('input');
    let sum = 0;
    let count = inputs.length;

    let boxSum = document.getElementById('box-sum');
    let boxCount = document.getElementById('box-count');
    let boxAverage = document.getElementById('box-average');

    for (let i = 0; i < count; i++) {
        sum += Number(inputs[i].value);
    }

    boxSum.innerHTML = sum;
    boxCount.innerHTML = count;
    boxAverage.innerHTML = (sum / count).toFixed(2);
}

btnCalculateAverage.addEventListener('click', calculateAverage)

// Copy Right Year
document.getElementById('copy-right-year').innerHTML = new Date().getFullYear();

// Theme Switcher
btnThemeSwitcher.addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    } else if (localStorage.getItem('theme') === 'light') {
        localStorage.setItem('theme', 'dark');
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    }
});

// Handle Theme Default
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') == null) {
        localStorage.setItem('theme', 'light');
     }

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    } else if (localStorage.getItem('theme') === 'light') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }
})