/** @format */

import { icons, øPlugin } from '../editør.03.mjs';

class øContact extends øPlugin {
	constructor() {
		// call super to create this and reference to øPlugin
		super();

		// give the plugin a Name
		this.name = 'contact';

		// the data of the plugin
		this.data = {
			htmlTag: 'form',
			styles: this._styles,
			fields: [
				{
					name: 'EmailAdresse',
					type: 'Email',
				},
				{
					name: 'Nachricht',
					type: 'Textfeld',
				},
			],
		};
	}

	/**
	 * Render creates the html element everytime
	 * the render is called.
	 *
	 * @param {object} ctx - the context of the
	 * renderer that calls the render
	 *
	 * @returns {HTMLElement} - returns the created
	 * block
	 */

	render(ctx) {
		// creates a paragraph HTML Element
		let form = document.createElement(`form`);
		form.className = 'editør-form';

		let text = document.createElement('p');
		text.textContent = 'Schreib uns eine Nachricht!';
		form.appendChild(text);

		// set inline styles
		for (const cssProp in this.data.styles) {
			if (this.data.styles.hasOwnProperty(cssProp)) {
				hr.style[cssProp] = this.data.styles[cssProp];
			}
		}

		// add the block id to the element
		form.setAttribute('block-id', this._ID);

		form.contentEditable = 'true';

		const createFormField = (fieldData) => {
			let field = document.createElement('div');
			field.className = 'editør-field';

			let fieldName = document.createElement('input');
			fieldName.value = fieldData.name;

			let fieldType = document.createElement('select');

			let options = ['Email', 'Name', 'Textfeld'];
			options.forEach((opt) => {
				let sel = document.createElement('option');
				sel.textContent = opt;
				sel.value = opt;

				fieldType.appendChild(sel);
			});

			fieldType.value = fieldData.type;

			field.appendChild(fieldName);
			field.appendChild(fieldType);

			return field;
		};

		this.data.fields.forEach((field) =>
			form.appendChild(createFormField(field))
		);

		console.log(form);

		// return the HTMLelement to the editor
		return form;
	}

	_update(event) {
		// for each child of the event target, push the content to the items

		this.data.fields = [];

		event.target.childNodes.forEach((item) => {
			if (item.classList.contains('editør-field')) {
				this.data.fields.push({
					name: item.childNodes(1).value,
					type: item.childNodes(2).value,
				});
			}
		});
	}
}

// set display Attributes, since they are needed by the static method they cant be put into the constructor.
// They should be implemented as public field, but safari does not support this

øContact._display = {
	name: 'contact',
	icon: icons.get('insertForm'),
	tooltip: 'Kontaktformular',
};

export { øContact };
