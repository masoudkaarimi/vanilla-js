const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
const colors = ['green', 'red', 'rgba(133,122,200)', '#f15025'];
const btn = document.getElementById('btn');
const color = document.querySelector('.color');

const getRandomIndex = () => {
	return Math.floor(Math.random() * hex.length);
	// return Math.floor(Math.random() * colors.length);
};

btn.addEventListener('click', () => {
	// Hexadecimal
	let hexColor = '#';
	for (let i = 0; i < 6; i++) {
		hexColor += hex[getRandomIndex()];
	}
	color.textContent = hexColor;
	document.body.style.backgroundColor = hexColor;

	// Custom color
	// const randomIndex = getRandomIndex();
	// document.body.style.backgroundColor = colors[randomIndex];
	// color.textContent = colors[randomIndex];
});