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
