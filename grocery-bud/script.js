// ========== Select items ==========
const form = document.querySelector('.grocery-form');
const alert = document.querySelector('.alert');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// Edit option
let editElement;
let editFlag = false;
let editID = '';

// ========== Event listeners ==========
// Submit form
form.addEventListener('submit', addItem);
// Clear list
clearBtn.addEventListener('click', clearItems);
// Display items onload
window.addEventListener('DOMContentLoaded', setupItems);

// ========== Functions ==========
// Add item
function addItem(e) {
	e.preventDefault();
	const value = grocery.value;
	const id = new Date().getTime().toString();

	if (value !== '' && !editFlag) {
		const element = document.createElement('article');
		let attr = document.createAttribute('data-id');
		attr.value = id;
		element.setAttributeNode(attr);
		element.classList.add('grocery-item');
		element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

		// Add event listeners to both buttons;
		const deleteBtn = element.querySelector('.delete-btn');
		deleteBtn.addEventListener('click', deleteItem);
		const editBtn = element.querySelector('.edit-btn');
		editBtn.addEventListener('click', editItem);

		// Append child
		list.appendChild(element);
		// Display alert
		displayAlert('item added to the list', 'success');
		// Show container
		container.classList.add('show-container');
		// Set local storage
		addToLocalStorage(id, value);
		// Set back to default
		setBackToDefault();
	} else if (value !== '' && editFlag) {
		editElement.innerHTML = value;
		displayAlert('value changed', 'success');

		// Edit  local storage
		editLocalStorage(editID, value);
		setBackToDefault();
	} else {
		displayAlert('please enter value', 'danger');
	}
}

// Display alert
function displayAlert(text, action) {
	alert.textContent = text;
	alert.classList.add(`alert-${action}`);
	// remove alert
	setTimeout(function () {
		alert.textContent = '';
		alert.classList.remove(`alert-${action}`);
	}, 1000);
}

// Clear items
function clearItems() {
	const items = document.querySelectorAll('.grocery-item');
	if (items.length > 0) {
		items.forEach((item) => {
			list.removeChild(item);
		});
	}
	container.classList.remove('show-container');
	displayAlert('empty list', 'danger');
	setBackToDefault();
	localStorage.removeItem('list');
}

// Delete item
function deleteItem(e) {
	const element = e.currentTarget.parentElement.parentElement;
	const id = element.dataset.id;

	list.removeChild(element);

	if (list.children.length === 0) {
		container.classList.remove('show-container');
	}
	displayAlert('item removed', 'danger');

	setBackToDefault();
	// remove from local storage
	removeFromLocalStorage(id);
}

// Edit item
function editItem(e) {
	const element = e.currentTarget.parentElement.parentElement;
	// Set edit item
	editElement = e.currentTarget.parentElement.previousElementSibling;
	// Set form value
	grocery.value = editElement.innerHTML;
	editFlag = true;
	editID = element.dataset.id;
	submitBtn.textContent = 'edit';
}

// Set back to defaults
function setBackToDefault() {
	grocery.value = '';
	editFlag = false;
	editID = '';
	submitBtn.textContent = 'submit';
}

// ========== Local storage ==========
// Add data to local storage
function addToLocalStorage(id, value) {
	const grocery = { id, value };
	let items = getLocalStorage();
	items.push(grocery);
	localStorage.setItem('list', JSON.stringify(items));
}

// Get local storage data
function getLocalStorage() {
	return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

// Remove data from local storage
function removeFromLocalStorage(id) {
	let items = getLocalStorage();
	items = items.filter((item) => item.id !== id);
	localStorage.setItem('list', JSON.stringify(items));
}

// Edit local storage data
function editLocalStorage(id, value) {
	let items = getLocalStorage();

	items = items.map((item) => {
		if (item.id === id) {
			item.value = value;
		}
		return item;
	});
	
	localStorage.setItem('list', JSON.stringify(items));
}
