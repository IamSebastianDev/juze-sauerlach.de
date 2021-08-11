/** @format */

import { icons, øPlugin } from '../editør.03.mjs';

class øTitle extends øPlugin {
	constructor() {
		// call super to create this and reference to øPlugin
		super();

		// give the plugin a Name
		this.name = 'title';

		// the data of the plugin
		this.data = {
			htmlTag: 'h',
			level: 3,
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
			increase_heading_level: {
				// the position of the button
				// left to right
				position: 4,
				// the icon that the button uses
				// in the context Menu
				icon: icons.get('inHeading'),
				// property that describes if the
				// button should be shown
				display: true,
				// property that describes if the
				// button is in an active state
				active: false,
				// property that describes the tooltip
				tooltip: 'Increase Heading size.',
				/**
				 * The callback function that gets
				 * added to the created ev listener
				 * and perfomrs the action on the block
				 * if called
				 *
				 * @param {object} ctx - the context
				 * the button should work in
				 */
				action(ctx) {
					// check if current heading size is bigger
					// then 1, the maximum
					if (this.data.level > 1) {
						// decrease the heading level to
						// increase the size
						this.data.level--;

						// check if the level is now the maximum,
						// at which the button should be disabled
						if (this.data.level == 1) {
							this.contextMenu.increase_heading_level.display = false;
						}

						// check if the level is 4, which is the
						// level at which the increase button
						// should be visible again
						if (this.data.level == 4) {
							this.contextMenu.decrease_heading_level.display = true;
						}

						// call for a block wide rerender
						window.dispatchEvent(
							new CustomEvent('editør-Render', {
								detail: {
									blockRender: true,
									blockID: this._ID,
								},
							})
						);
					}
				},
			},
			decrease_heading_level: {
				// the position of the button
				// left to right
				position: 5,
				// the icon that the button uses
				// in the context Menu
				icon: icons.get('deHeading'),
				// property that describes if the
				// button should be shown
				display: true,
				// property that describes if the
				// button is in an active state
				active: false,
				// property that describes the tooltip
				tooltip: 'Decrease Heading size.',
				/**
				 * The callback function that gets
				 * added to the created ev listener
				 * and perfomrs the action on the block
				 * if called
				 *
				 * @param {object} ctx - the context
				 * the button should work in
				 */
				action(ctx) {
					// check if current heading size is smaller
					// then 5, the minimum
					if (this.data.level < 5) {
						// increase the heading level to
						// decrease the size
						this.data.level++;

						// check if the level is now the minimum,
						// at which the button should be disabled
						if (this.data.level == 5) {
							this.contextMenu.decrease_heading_level.display = false;
						}

						// check if the level is 2, which is the
						// level at which the increase button
						// should be visible again
						if (this.data.level == 2) {
							this.contextMenu.increase_heading_level.display = true;
						}

						// call for a block wide rerender
						window.dispatchEvent(
							new CustomEvent('editør-Render', {
								detail: {
									blockRender: true,
									blockID: this._ID,
								},
							})
						);
					}
				},
			},
			format_align_left: {
				position: 6,
				...this.standardButtons.block_format.align_left,
			},
			format_align_center: {
				position: 7,
				...this.standardButtons.block_format.align_center,
			},
			format_align_right: {
				position: 8,
				...this.standardButtons.block_format.align_right,
			},
		};
		this.selectionMenu = {
			format_italic: {
				position: 1,
				...this.standardButtons.inline_format.italic,
			},
			format_underline: {
				position: 2,
				...this.standardButtons.inline_format.underline,
			},
			format_strikethrough: {
				position: 3,
				...this.standardButtons.inline_format.strikethrough,
			},
			format_marker: {
				position: 4,
				...this.standardButtons.inline_format.marker,
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
		// creates a title HTML Element
		let title = document.createElement(`h${this.data.level}`);

		// set inline styles
		for (const cssProp in this.data.styles) {
			if (this.data.styles.hasOwnProperty(cssProp)) {
				title.style[cssProp] = this.data.styles[cssProp];
			}
		}

		// set the classNames
		title.className = 'editør-block editør-title';

		// add the block id to the element
		title.setAttribute('block-id', this._ID);

		// set the content of the title to be editable
		title.contentEditable = 'true';

		// add the content data to the element
		title.innerHTML = this.data.content;

		// add ev listeners for update to the shell
		title.addEventListener('focusout', this._update.bind(this));

		// return the HTMLelement to the editor
		return title;
	}
}

// set display Attributes, since they are needed by the static method they cant be put into the constructor.
// They should be implemented as public field, but safari does not support this

øTitle._display = {
	name: 'title',
	icon: icons.get('insertTitle'),
	tooltip: 'Title',
};

export { øTitle };
