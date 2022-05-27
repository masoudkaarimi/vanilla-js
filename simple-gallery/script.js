// Get element
function getElement(selection) {
	const element = document.querySelector(selection);

	if (element) {
		return element;
	}
	throw new Error(`Please check "${selection}" selector, no such element exists`);
}

// ==================== Prototype Gallery ====================
function PrototypeGallery(element) {
	this.container = element;
	this.list = [...element.querySelectorAll('.img')];

	// Targets
	this.modal = getElement('.modal');
	this.modalImg = getElement('.main-img');
	this.imageName = getElement('.image-name');
	this.modalImages = getElement('.modal-images');
	this.closeBtn = getElement('.close-btn');
	this.nextBtn = getElement('.next-btn');
	this.prevBtn = getElement('.prev-btn');

	// Binding this to methods
	this.closeModal = this.closeModal.bind(this);
	this.nextImage = this.nextImage.bind(this);
	this.prevImage = this.prevImage.bind(this);
	this.chooseImage = this.chooseImage.bind(this);

	// Container event
	this.container.addEventListener(
		'click',
		function (e) {
			if (e.target.classList.contains('img')) {
				this.openModal(e.target, this.list);
			}
		}.bind(this)
	);
}
