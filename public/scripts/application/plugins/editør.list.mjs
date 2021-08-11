/** @format */

import { icons, øPlugin } from '../editør.03.mjs';

class øList extends øPlugin {
	constructor() {
		// call super to create this and reference to øPlugin
		super();

		// give the plugin a Name
		this.name = 'list';

		// the data of the plugin
		this.data = {
			htmlTag: '',
			listType: 'ul',
			styles: this._styles,
			content: {},
			items: [],
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
			convert_ordered: {
				position: 4,
				icon: icons.get('listOL'),
				display: true,
				active: false,
				tooltip: 'Convert to ordered list.',
				action(ctx) {
					this.data.listType = 'ol';
					this.contextMenu.convert_ordered.active = true;
					this.contextMenu.convert_unordered.active = false;

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
			convert_unordered: {
				position: 5,
				icon: icons.get('listUL'),
				display: true,
				active: true,
				tooltip: 'Convert to unordered list.',
				action(ctx) {
					this.data.listType = 'ul';
					this.contextMenu.convert_unordered.active = true;
					this.contextMenu.convert_ordered.active = false;

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
		let list = document.createElement(this.data.listType);

		// set inline styles
		for (const cssProp in this.data.styles) {
			if (this.data.styles.hasOwnProperty(cssProp)) {
				list.style[cssProp] = this.data.styles[cssProp];
			}
		}

		// set the classNames
		list.className = 'editør-block editør-list';

		list.contentEditable = 'true';

		// add the block id to the element
		list.setAttribute('block-id', this._ID);

		// function to create List items
		const createListItems = (item) => {
			// create the element
			let li = document.createElement('li');
			// set element to be editable
			li.contentEditable = 'true';
			// give the item a class
			li.className = 'editør-listItem';
			// set data to the item
			li.innerHTML = item;
			// return the item
			return li;
		};

		// add a empty element to the data if there is not one already present at the end of the items
		if (this.data.items.length == 0) {
			this.data.items.push(' ');
		}

		this.data.items.forEach((item) =>
			list.appendChild(createListItems(item))
		);

		// add ev listeners for update to the shell
		list.addEventListener('focusout', this._update.bind(this));

		// return the HTMLelement to the editor
		return list;
	}

	_update(event) {
		// for each child of the event target, push the content to the items

		this.data.items = [];

		event.target.childNodes.forEach((item) =>
			this.data.items.push(item.innerHTML)
		);
	}
}

// set display Attributes, since they are needed by the static method they cant be put into the constructor.
// They should be implemented as public field, but safari does not support this

øList._display = {
	name: 'list',
	icon: icons.get('insertList'),
	tooltip: 'List',
};

export { øList };
