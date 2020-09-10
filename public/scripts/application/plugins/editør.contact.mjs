/** @format */

import { icons, øPlugin } from '../editør.03.mjs';

class øContact extends øPlugin {
	constructor() {
		// call super to create this and reference to øPlugin
		super();

		// give the plugin a Name
		this.name = 'Kontaktformular';

		// the data of the plugin
		this.data = {
			htmlTag: 'form',
			styles: this._styles,
			content: '<hr class="editør-hr">',
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

		// set inline styles
		for (const cssProp in this.data.styles) {
			if (this.data.styles.hasOwnProperty(cssProp)) {
				hr.style[cssProp] = this.data.styles[cssProp];
			}
		}

		// add the block id to the element
		form.setAttribute('block-id', this._ID);

		form.contentEditable = 'true';

		const createFormField = () => {};

		for (const field in this.data.fields) {
			if (this.data.fields.hasOwnProperty(field)) {
				form.appendChild(createFormField(field));
			}
		}

		let newField = document.createElement('div');

		// return the HTMLelement to the editor
		return span;
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
