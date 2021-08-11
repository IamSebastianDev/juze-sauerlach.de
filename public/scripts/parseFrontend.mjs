/** @format */
import { Parsør } from './application/parsør.mjs';

// dictionary for editør
// parser Dictionary
const Dict = {
	title(block) {
		let title = document.createElement(`h${block.level}`);

		title.className = 'block';

		// set inline styles
		for (const cssProp in block.styles) {
			if (block.styles.hasOwnProperty(cssProp)) {
				title.style[cssProp] = block.styles[cssProp];
			}
		}

		// add the content data to the element
		title.innerHTML = block.content;

		// return the HTMLelement to the editor
		return title;
	},
	paragraph(block) {
		// creates a paragraph HTML Element
		let paragraph = document.createElement(`p`);

		paragraph.className = 'block';

		// set inline styles
		for (const cssProp in block.styles) {
			if (block.styles.hasOwnProperty(cssProp)) {
				paragraph.style[cssProp] = block.styles[cssProp];
			}
		}

		// add the content data to the element
		paragraph.innerHTML = block.content;

		// return the HTMLelement to the editor
		return paragraph;
	},
	list(block) {
		// creates a paragraph HTML Element
		let list = document.createElement(block.listType);

		list.className = 'block';

		// set inline styles
		for (const cssProp in block.styles) {
			if (block.styles.hasOwnProperty(cssProp)) {
				list.style[cssProp] = block.styles[cssProp];
			}
		}

		// function to create List items
		const createListItems = (item) => {
			// create the element
			let li = document.createElement('li');
			// set data to the item
			li.innerHTML = item;
			// return the item
			return li;
		};

		block.items.forEach((item) => list.appendChild(createListItems(item)));

		// return the HTMLelement to the editor
		return list;
	},
	image(block) {
		let img = document.createElement(`img`);

		img.className = 'block';

		// set inline styles
		for (const cssProp in block.styles) {
			if (block.styles.hasOwnProperty(cssProp)) {
				img.style[cssProp] = block.styles[cssProp];
			}
		}

		img.src = block.src;

		// return th HTMLelement to the editor
		return img;
	},
	delimitor(block) {
		return document.createElement('hr');
	},
	contact(block) {
		// create the contact form
		let form = document.createElement('form');

		let text = document.createElement('p');
		text.textContent = 'Schreib uns eine Nachricht!';

		form.appendChild(text);

		const createField = (fieldData) => {
			let container = document.createElement('div');
			container.className = 'editør-formField';

			let label = document.createElement('label');
			label.for = fieldData.name;
			label.textContent = fieldData.name;

			let field = document.createElement(
				fieldData.type == 'Textfeld' ? 'textarea' : 'input'
			);
			field.name = fieldData.name;
			field.placeholder =
				fieldData.type == 'Textfeld'
					? 'Deine Nachricht'
					: 'Deine Emailadresse';

			container.appendChild(label);
			container.appendChild(field);

			return container;
		};

		block.fields.forEach((field) => form.appendChild(createField(field)));

		let submit = document.createElement('Button');
		submit.id = 'contact-submit';
		submit.textContent = 'Abschicken!';

		submit.addEventListener('click', async (ev) => {
			ev.preventDefault();

			// get the data
			let mail = document.querySelector("input[name='EmailAdresse']")
				.value;
			let message = document.querySelector("textarea[name='Nachricht']")
				.value;

			if (message === '' || mail === '') {
				window.alert('Bitte fülle beide Felder aus.');
			} else {
				submit.textContent = 'Nachricht wird gesendet!';
				await fetch('/api/mail', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({
						email: mail,
						message: message,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						submit.style.background = 'rgba(178, 222, 81, 1)';
						submit.textContent = 'Nachricht gesendet!';
					});
			}
		});

		form.appendChild(submit);

		return form;
	},
};

// function to create frontEnt content from the api and pageData
const createContent = async (query, args) => {
	let parser = new Parsør(document.querySelector('.content-Container'), Dict);

	// parse the json to text using the parser and dictionary
	parser.renderJSON(args[0]);

	// set the header image
	document.querySelector('.header-image-target').src = args[1];
};

export { createContent };
