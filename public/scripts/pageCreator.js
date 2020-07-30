/** @format */

/** this file handles the pageCreation modal and all associated functions */

// function to populate the icons for the pageIcon
import populateIcons from './application/feather-icons.mjs';
import { router, firstPaint } from './app_backend.js';
import { createSyncContent } from './createContent.mjs';

populateIcons(document.querySelector('.pageCreator-iconSelect'));

// ev listener for icon choice
const iconContainer = document.querySelector('.pageCreator-iconSelect');

const resetIcons = () => {
	let icons = iconContainer.childNodes;

	icons.forEach((icon) => {
		icon.classList.remove('feather-IconActive');
	});
};

iconContainer.addEventListener('click', (ev) => {
	if (ev.target.closest('.feather-IconContainer')) {
		// check if there is an error message
		if (
			iconContainer.previousElementSibling.classList.contains(
				'pageCreator-inputFailure'
			)
		) {
			iconContainer.previousElementSibling.remove();
		}

		let origin = ev.target;

		// check if the event originated on the svg or container
		while (!origin.classList.contains('feather-IconContainer')) {
			origin = origin.parentElement;
		}

		resetIcons();

		origin.classList.add('feather-IconActive');
	}
});

// helper function to get icon
const getIcon = () => {
	let icons = iconContainer.childNodes;

	let iconName;

	icons.forEach((icon) => {
		if (icon.classList.contains('feather-IconActive')) {
			iconName = icon.getAttribute('iconName');
		}
	});

	return iconName;
};

// functions to open and close the modal
const pageCreator = {
	modal: document.querySelector('.dashboard-pageCreation'),
	openButton: document.querySelector('.dashboard-createNewPage'),
	closeButton: document.querySelector('.pageCreator-form .modal-close'),
	sendButton: document.querySelector('.pageCreator-form button'),
	open() {
		this.modal.style.display = 'flex';
	},
	close() {
		this.modal.style.display = 'none';
	},
	init() {
		window.addEventListener('click', (ev) => {
			if (ev.target === this.openButton) {
				this.open();
			}

			if (ev.target === this.closeButton) {
				this.close();
			}

			if (ev.target === this.sendButton) {
				ev.preventDefault();

				const validateInputs = () => {
					// reset all error messages still exisiting
					let errMsg = document.querySelectorAll(
						'.pageCreator-inputFailure'
					);
					errMsg.forEach((msg) => msg.remove());

					let inputs = document.querySelectorAll(
						'.pageCreator-form input'
					);

					let error = [];

					inputs.forEach((input) => {
						if (input.value == '') {
							error.push({
								elem: input,
								msg: 'Dieses Feld wird benötigt.',
							});
						}
					});

					if (getIcon() == undefined) {
						error.push({
							elem: document.querySelector(
								'.pageCreator-iconSelect'
							),
							msg: 'Bitte wähle ein Icon aus.',
						});
					}

					if (error.length != 0) {
						return { errors: error };
					} else {
						return { validated: true };
					}
				};

				if (validateInputs().validated) {
					let pageData = {
						pageDest: document.querySelector(
							".pageCreator-form input[name='url']"
						).value,
						pageIcon: getIcon(),
						pageTooltip: document.querySelector(
							".pageCreator-form input[name='tooltip']"
						).value,
						pageTitle: document.querySelector(
							".pageCreator-form input[name='title']"
						).value,
					};

					fetch('/api/createPage', {
						method: 'POST', // *GET, POST, PUT, DELETE, etc
						mode: 'cors', // no-cors, *cors, same-origin
						cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
						credentials: 'same-origin', // include, *same-origin, omit
						headers: {
							'Content-Type': 'application/json',
							// 'Content-Type': 'application/x-www-form-urlencoded',
						},
						redirect: 'follow', // manual, *follow, error
						referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
						body: JSON.stringify(pageData), // body data type must match \"Content-Type\" header
					})
						.then((res) => res.json())
						.then(async (data) => {
							let page = data.pageData;
							router.create(page.dest, {
								title: `JuZe Sauerlach | ${page.title}`,
								callback: createSyncContent,
								callbackArgs: [
									page.content,
									page.headerImage,
									page.title,
								],
							});
							await firstPaint();
							router.goTo(`#${page.dest}`);
							this.close();
						})
						.catch((err) => console.log(err));
				} else {
					let errors = validateInputs().errors;

					errors.forEach((err) => {
						// create a new text element
						let span = document.createElement('span');
						span.className = 'pageCreator-inputFailure';
						span.textContent = err.msg;

						err.elem.parentElement.insertBefore(span, err.elem);

						err.elem.addEventListener('blur', (ev) => {
							span.remove();
						});
					});
				}
			}
		});
	},
};

pageCreator.init();
