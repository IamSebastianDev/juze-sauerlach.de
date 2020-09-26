/** @format */
import populateIcons from './application/feather-icons.mjs';
populateIcons(document.querySelector('.iconModal-iconSelect'));

const selector = {
	button: document.querySelector('#dashboard-pageIcon'),
	modal: document.querySelector('.dashboard-iconModal'),
	active: document.querySelector('#active-Icon'),
	modalClose: document.querySelector('.iconModal .modal-close'),
	modalConfirm: document.querySelector('.iconModal button'),
	open() {
		this.inital = this.active.getAttribute('iconname');
		document.querySelector('body').style.overflow = 'hidden';
		this.modal.style.display = 'flex';
	},
	close() {
		document.querySelector('body').style = '';
		this.modal.style.display = 'none';
		this.active.innerHTML = feather.icons[this.inital].toSvg();
		this.active.setAttribute('iconname', this.inital);
	},
	confirm() {
		document.querySelector('body').style = '';
		this.modal.style.display = 'none';
	},
	select(node) {
		this.active.innerHTML = feather.icons[
			node.getAttribute('iconname')
		].toSvg();
		this.active.setAttribute('iconname', node.getAttribute('iconname'));
	},
	createModal() {},
	// function to set up inital ev listeners
	init() {
		this.button.addEventListener('click', (ev) => this.open());
		this.modalClose.addEventListener('click', (ev) => this.close());
		this.modalConfirm.addEventListener('click', (ev) => {
			this.confirm();
		});

		document
			.querySelector('.iconModal-iconSelect')
			.childNodes.forEach((node) => {
				node.addEventListener('click', (ev) => this.select(node));
			});
	},
};

selector.init();
