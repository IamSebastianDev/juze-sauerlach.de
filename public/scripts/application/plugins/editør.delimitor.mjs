/** @format */

import { icons, øPlugin } from '../editør.03.mjs';

class øDelimitor extends øPlugin {
	constructor() {
		// call super to create this and reference to øPlugin
		super();

		// give the plugin a Name
		this.name = 'delimitor';

		// the data of the plugin
		this.data = {
			htmlTag: 'hr',
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
		let span = document.createElement(`span`);

		// set inline styles
		for (const cssProp in this.data.styles) {
			if (this.data.styles.hasOwnProperty(cssProp)) {
				hr.style[cssProp] = this.data.styles[cssProp];
			}
		}

		// add the block id to the element
		span.setAttribute('block-id', this._ID);

		span.contentEditable = 'true';

		span.innerHTML = this.data.content;

		// return the HTMLelement to the editor
		return span;
	}
}

// set display Attributes, since they are needed by the static method they cant be put into the constructor.
// They should be implemented as public field, but safari does not support this

øDelimitor._display = {
	name: 'delimitor',
	icon: icons.get('insertSeperator'),
	tooltip: 'Delimitor',
};

export { øDelimitor };
