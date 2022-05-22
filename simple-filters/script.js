import { products } from './data.js';

let filteredProducts = [...products];
const productsContainer = document.querySelector('.products-container');
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');
const companiesDOM = document.querySelector('.companies');

// Display products
const displayProducts = () => {
	if (filteredProducts.length < 1) {
		productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
		return;
	}

	productsContainer.innerHTML = filteredProducts
		.map((product) => {
			const { id, title, image, price } = product;
			return `<article class="product" data-id="${id}">
                <img src="${image}" class="product-img img" />
                <footer>
                  <h5 class="product-name">${title}</h5>
                  <span class="product-price">$${price}</span>
                </footer>
              </article>`;
		})
		.join('');
};
displayProducts();

// Search filter handler
form.addEventListener('keyup', (e) => {
	// console.log(e);

	const inputValue = searchInput.value.toLowerCase();

	filteredProducts = products.filter((product) => {
		let productTitle = product.title.toLowerCase();
		let productCompany = product.company.toLowerCase();

		return productTitle.includes(inputValue) || productCompany.includes(inputValue);
	});

	displayProducts();
});

// Show company buttons
const displayCompanyButtons = () => {
	const buttons = ['all', ...new Set(products.map((product) => product.company))];
	// console.log(buttons);

	companiesDOM.innerHTML = buttons
		.map((company) => {
			return `<button class='company-btn' data-id="${company}">${company}</button>`;
		})
		.join('');
};
displayCompanyButtons();

// Company filter handler
companiesDOM.addEventListener('click', (e) => {
	const el = e.target;
	// console.log(el);

	if (el.classList.contains('company-btn')) {
		if (el.dataset.id === 'all') {
			filteredProducts = [...products];
		} else {
			filteredProducts = products.filter((product) => {
				return product.company === el.dataset.id;
			});
		}
		searchInput.value = '';
		displayProducts();
	}
});
