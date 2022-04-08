// Get element
const getElement = (selection) => {
	const element = document.querySelector(selection);
	if (element) {
		return element;
	}
	throw new Error(`Please check "${selection}" selector, no such element exists`);
};

// Simple counter
(function () {
	let count = 0;
	const value = document.querySelector('.simple-counter .value');
	const btns = document.querySelectorAll('.simple-counter .btn');

	btns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const styles = e.currentTarget.classList;

			if (styles.contains('decrease')) {
				count--;
			} else if (styles.contains('increase')) {
				count++;
			} else {
				count = 0;
			}

			if (count > 0) {
				value.style.color = 'green';
			}

			if (count < 0) {
				value.style.color = 'red';
			}

			if (count === 0) {
				value.style.color = 'hsl(209, 28%, 39%)';
			}

			value.textContent = count;
		});
	});
})();

// Class counter
class ClassCounter {
	constructor(element, value) {
		this.counter = element;
		this.value = value;
		this.resetBtn = element.querySelector('.reset');
		this.increaseBtn = element.querySelector('.increase');
		this.decreaseBtn = element.querySelector('.decrease');
		this.valueDOM = element.querySelector('.value');
		this.valueDOM.textContent = this.value;
		// bind this to all function
		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
		this.reset = this.reset.bind(this);

		this.increaseBtn.addEventListener('click', this.increase);
		this.decreaseBtn.addEventListener('click', this.decrease);
		this.resetBtn.addEventListener('click', this.reset);
	}

	increase() {
		this.value++;
		this.valueDOM.textContent = this.value;
	}

	decrease() {
		this.value--;
		this.valueDOM.textContent = this.value;
	}

	reset() {
		this.value = 0;
		this.valueDOM.textContent = this.value;
	}
}
new ClassCounter(getElement('.class-counter'), 200);
