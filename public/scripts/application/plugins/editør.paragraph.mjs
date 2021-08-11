/** @format */

import { icons, øPlugin } from '../editør.03.mjs';

class øParagraph extends øPlugin {
	constructor() {
		// call super to create this and reference to øPlugin
		super();

		// give the plugin a Name
		this.name = 'paragraph';

		// the data of the plugin
		this.data = {
			htmlTag: 'p',
			styles: this._styles,
			content: '',
		};

		this.contextMenu = {
			move_up: {
				position: 1,
				...this.standardButtons.move_up,
			},
			clear: {
				position: 2,
				...this.standardButtons.clear,
			},
			move_down: {
				position: 3,
				...this.standardButtons.move_down,
			},
			format_align_left: {
				position: 4,
				...this.standardButtons.block_format.align_left,
			},
			format_align_center: {
				position: 5,
				...this.standardButtons.block_format.align_center,
			},
			format_align_right: {
				position: 6,
				...this.standardButtons.block_format.align_right,
			},
			format_align_justify: {
				position: 7,
				...this.standardButtons.block_format.align_justify,
			},
		};
		this.selectionMenu = {
			format_bold: {
				position: 1,
				...this.standardButtons.inline_format.bold,
			},
			format_italic: {
				position: 2,
				...this.standardButtons.inline_format.italic,
			},
			format_underline: {
				position: 3,
				...this.standardButtons.inline_format.underline,
			},
			format_strikethrough: {
				position: 4,
				...this.standardButtons.inline_format.strikethrough,
			},
			format_marker: {
				position: 4,
				...this.standardButtons.inline_format.marker,
			},
			convert_to_link: {
				position: 5,
				...this.standardButtons.inline_format.convert_to_link,
			},
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
		let paragraph = document.createElement(`p`);

		// set inline styles
		for (const cssProp in this.data.styles) {
			if (this.data.styles.hasOwnProperty(cssProp)) {
				paragraph.style[cssProp] = this.data.styles[cssProp];
			}
		}

		// set the classNames
		paragraph.className = 'editør-block editør-paragraph';

		// add the block id to the element
		paragraph.setAttribute('block-id', this._ID);

		// set the content of the paragraph to be editable
		paragraph.contentEditable = 'true';

		// add the content data to the element
		paragraph.innerHTML = this.data.content;

		// add ev listeners for update to the shell
		paragraph.addEventListener('focusout', this._update.bind(this));

		// return the HTMLelement to the editor
		return paragraph;
	}
}

// set display Attributes, since they are needed by the static method they cant be put into the constructor.
// They should be implemented as public field, but safari does not support this

øParagraph._display = {
	name: 'paragraph',
	icon: icons.get('insertParagraph'),
	tooltip: 'Paragraph',
};

export { øParagraph };
