/** @format */

import { icons, øPlugin } from '../editør.03.mjs';

class øImage extends øPlugin {
	constructor() {
		// call super to create this and reference to øPlugin
		super();

		// give the plugin a Name
		this.name = 'image';

		this._styles = {
			maxWidth: '60%',
		};

		// the data of the plugin
		this.data = {
			htmlTag: 'img',
			styles: this._styles,
			src: undefined,
		};

		this.contextMenu = {
			...this.contextMenu,
			edit: {
				position: 4,
				// the icon the button uses
				icon: icons.get('edit'),
				// display and active properies used for context
				display: true,
				active: false,
				// tooltip
				tooltip: 'Edit image link',
				action(ctx) {
					this.data.src = undefined;

					// call for a complete rerender

					window.dispatchEvent(
						new CustomEvent('editør-Render', {
							detail: {
								blockRender: false,
								blockID: this._ID,
							},
						})
					);
				},
			},
			stretch: {
				position: 5,
				// the icon the button uses
				icon: icons.get('imageStretch'),
				// display and active properies used for context
				display: true,
				active: false,
				// tooltip
				tooltip: 'Stretch image',
				action(ctx) {
					if (this._styles.maxWidth != '100%') {
						this._styles.maxWidth = '100%';
						this.contextMenu.stretch.active = true;
					} else {
						this._styles.maxWidth = '60%';
						this.contextMenu.stretch.active = false;
					}

					// call for a complete rerender

					window.dispatchEvent(
						new CustomEvent('editør-Render', {
							detail: {
								blockRender: false,
								blockID: this._ID,
							},
						})
					);
				},
			},
			putLeft: {
				position: 6,
				// the icon the button uses
				icon: icons.get('alignLeft'),
				// display and active properies used for context
				display: true,
				active: false,
				// tooltip
				tooltip: 'Align image to the left',
				action(ctx) {
					if (this._styles['margin-left'] != '0') {
						this._styles['margin-left'] = '0';
						this.contextMenu.putLeft.active = true;
						if (this.contextMenu.putRight.active) {
							this._styles['margin-right'] = '';
							this.contextMenu.putRight.active = false;
						}
					} else {
						this._styles['margin-left'] = '';
						this.contextMenu.putLeft.active = false;
					}

					// call for a complete rerender

					window.dispatchEvent(
						new CustomEvent('editør-Render', {
							detail: {
								blockRender: false,
								blockID: this._ID,
							},
						})
					);
				},
			},
			putRight: {
				position: 7,
				// the icon the button uses
				icon: icons.get('alignRight'),
				// display and active properies used for context
				display: true,
				active: false,
				// tooltip
				tooltip: 'Align image to the right',
				action(ctx) {
					if (this._styles['margin-right'] != '0') {
						this._styles['margin-right'] = '0';
						this.contextMenu.putRight.active = true;
						if (this.contextMenu.putLeft.active) {
							this._styles['margin-left'] = '';
							this.contextMenu.putLeft.active = false;
						}
					} else {
						this._styles['margin-right'] = '';
						this.contextMenu.putRight.active = false;
					}

					// call for a complete rerender

					window.dispatchEvent(
						new CustomEvent('editør-Render', {
							detail: {
								blockRender: false,
								blockID: this._ID,
							},
						})
					);
				},
			},
		};

		console.log(this);
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
		const createImage = () => {
			// creates a paragraph HTML Element
			let img = document.createElement(`img`);

			// set inline styles
			for (const cssProp in this.data.styles) {
				if (this.data.styles.hasOwnProperty(cssProp)) {
					img.style[cssProp] = this.data.styles[cssProp];
				}
			}

			// add the block id to the element
			img.setAttribute('block-id', this._ID);

			// set classname
			img.className = 'editør-block editør-image';

			img.src = this.data.src;

			img.contentEditable = 'true';

			// return the HTMLelement to the editor
			return img;
		};

		if (this.data.src != undefined) {
			return createImage();
		} else {
			let input = document.createElement('input');

			input.className = 'editør-block editør-imageInput';
			input.placeholder = 'Insert image link...';

			// add ev listeners for update to the shell
			input.addEventListener('focusout', this._update.bind(this));

			return input;
		}
	}

	_update(event) {
		// check if the pasted link is not empty
		if (event.target.value == '') {
			return;
		}
		this.data.src = event.target.value;

		window.dispatchEvent(
			new CustomEvent('editør-Render', {
				detail: {
					blockRender: true,
					blockID: this._ID,
				},
			})
		);
	}
}

// set display Attributes, since they are needed by the static method they cant be put into the constructor.
// They should be implemented as public field, but safari does not support this

øImage._display = {
	name: 'image',
	icon: icons.get('insertImage'),
	tooltip: 'Image',
};

export { øImage };
