/** @format */

/**
 *  SVG definitions for the used icons
 *  Icons are stored as paths and on request returned as a HTML SVG Namespace Element
 */

const icons = {
	/**
	 * Returns the requested icon as a svg element
	 * @param {string} moniker - the name of the icon to retrive
	 * @returns {HTMLElement}	- a svg element that contains the icon paths
	 */

	get(moniker) {
		let svg = document
			.createElementNS('http://www.w3.org/2000/svg', 'svg')
			.cloneNode(true);
		svg.setAttribute('width', '24px');
		svg.setAttribute('height', '24px');
		svg.setAttribute('viewbox', '0 0 24 24');

		svg.innerHTML = this[moniker];
		return svg;
	},
	edit: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>`,
	imageStretch: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 15h2v2h-2v-2zm0-4h2v2h-2v-2zm2 8h-2v2c1 0 2-1 2-2zM13 3h2v2h-2V3zm8 4h2v2h-2V7zm0-4v2h2c0-1-1-2-2-2zM1 7h2v2H1V7zm16-4h2v2h-2V3zm0 16h2v2h-2v-2zM3 3C2 3 1 4 1 5h2V3zm6 0h2v2H9V3zM5 3h2v2H5V3zm-4 8v8c0 1.1.9 2 2 2h12v-8c0-1.1-.9-2-2-2H1zm2.63 7.19l1.49-1.91c.2-.25.57-.26.78-.01l1.39 1.67 2.1-2.7c.2-.26.6-.26.79.01l2.22 2.96c.25.33.01.8-.4.8H4.02c-.41-.01-.65-.49-.39-.82z"/>`,
	insertSeperator: `<path d="M18 10v3H6v-3c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1z"/>`,
	plus: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/>`,
	brush: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/>`,
	clear: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>`,
	expandLess: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z"/>`,
	expandMore: `<path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/>`,
	alignCenter: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 16c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1zm-3 5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-8h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm3-5c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1zM3 4c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/>`,
	alignJustify: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 21h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-4h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-4h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-4h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 4c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/>`,
	alignLeft: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 15H4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zm0-8H4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zM4 13h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0 8h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 4c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/>`,
	alignRight: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 21h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm6-4h10c.55 0 1-.45 1-1s-.45-1-1-1H10c-.55 0-1 .45-1 1s.45 1 1 1zm-6-4h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm6-4h10c.55 0 1-.45 1-1s-.45-1-1-1H10c-.55 0-1 .45-1 1s.45 1 1 1zM3 4c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/>`,
	bold: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H8c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h5.78c2.07 0 3.96-1.69 3.97-3.77.01-1.53-.85-2.84-2.15-3.44zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>`,
	italic: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 5.5c0 .83.67 1.5 1.5 1.5h.71l-3.42 8H7.5c-.83 0-1.5.67-1.5 1.5S6.67 18 7.5 18h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-.71l3.42-8h1.29c.83 0 1.5-.67 1.5-1.5S17.33 4 16.5 4h-5c-.83 0-1.5.67-1.5 1.5z"/>`,
	underline: `<path d="M12.79 16.95c3.03-.39 5.21-3.11 5.21-6.16V4.25C18 3.56 17.44 3 16.75 3s-1.25.56-1.25 1.25v6.65c0 1.67-1.13 3.19-2.77 3.52-2.25.47-4.23-1.25-4.23-3.42V4.25C8.5 3.56 7.94 3 7.25 3S6 3.56 6 4.25V11c0 3.57 3.13 6.42 6.79 5.95zM5 20c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z"/>`,
	strikethrough: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 19c1.1 0 2-.9 2-2v-1h-4v1c0 1.1.9 2 2 2zM5 5.5C5 6.33 5.67 7 6.5 7H10v3h4V7h3.5c.83 0 1.5-.67 1.5-1.5S18.33 4 17.5 4h-11C5.67 4 5 4.67 5 5.5zM4 14h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1z"/>`,
	insertList: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM8 19h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0-6h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 6c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"/>`,
	insertImage: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.9 13.98l2.1 2.53 3.1-3.99c.2-.26.6-.26.8.01l3.51 4.68c.25.33.01.8-.4.8H6.02c-.42 0-.65-.48-.39-.81L8.12 14c.19-.26.57-.27.78-.02z"/>`,
	insertLink: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.96 11.38C4.24 9.91 5.62 8.9 7.12 8.9h2.93c.52 0 .95-.43.95-.95S10.57 7 10.05 7H7.22c-2.61 0-4.94 1.91-5.19 4.51C1.74 14.49 4.08 17 7 17h3.05c.52 0 .95-.43.95-.95s-.43-.95-.95-.95H7c-1.91 0-3.42-1.74-3.04-3.72zM9 13h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1s.45 1 1 1zm7.78-6h-2.83c-.52 0-.95.43-.95.95s.43.95.95.95h2.93c1.5 0 2.88 1.01 3.16 2.48.38 1.98-1.13 3.72-3.04 3.72h-3.05c-.52 0-.95.43-.95.95s.43.95.95.95H17c2.92 0 5.26-2.51 4.98-5.49-.25-2.6-2.59-4.51-5.2-4.51z"/>`,
	insertParagraph: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zM4 18h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM20 6H4c-.55 0-1 .45-1 1v.01c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"/>`,
	insertTitle: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 5.5C5 6.33 5.67 7 6.5 7h4v10.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7h4c.83 0 1.5-.67 1.5-1.5S18.33 4 17.5 4h-11C5.67 4 5 4.67 5 5.5z"/>`,
	deHeading: `<path d="M4.71,5.5A1.5,1.5,0,0,0,6.21,7h4V17.5a1.5,1.5,0,0,0,3,0V7h4a1.5,1.5,0,0,0,0-3h-11A1.5,1.5,0,0,0,4.71,5.5Z"/><path d="M17,8.72a.45.45,0,0,0-.32.14.48.48,0,0,0-.14.34v8.21l-1.07-1.07a.48.48,0,0,0-.33-.13.45.45,0,0,0-.34.13.49.49,0,0,0-.13.33.48.48,0,0,0,.13.32l1.89,1.89A.48.48,0,0,0,17,19a.47.47,0,0,0,.32-.12L19.16,17a.44.44,0,0,0,.13-.32.44.44,0,0,0-.46-.46.42.42,0,0,0-.33.13l-1.07,1.07V9.2a.48.48,0,0,0-.14-.34A.46.46,0,0,0,17,8.72Z"/>`,
	inHeading: `<path d="M4.71,5.5A1.5,1.5,0,0,0,6.21,7h4V17.5a1.5,1.5,0,0,0,3,0V7h4a1.5,1.5,0,0,0,0-3h-11A1.5,1.5,0,0,0,4.71,5.5Z"/><path d="M17,19a.45.45,0,0,1-.32-.14.46.46,0,0,1-.14-.34v-8.2l-1.07,1.06a.49.49,0,0,1-.33.14.46.46,0,0,1-.34-.14.45.45,0,0,1-.13-.33.5.5,0,0,1,.13-.32l1.89-1.89A.48.48,0,0,1,17,8.72a.47.47,0,0,1,.32.12l1.89,1.89a.45.45,0,0,1,.13.32.42.42,0,0,1-.13.33.45.45,0,0,1-.33.14.42.42,0,0,1-.33-.14l-1.07-1.06v8.2A.48.48,0,0,1,17,19Z"/>`,
	listOL: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 7h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm12 10H8c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1zm0-6H8c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1zM4.5 16h-2c-.28 0-.5.22-.5.5s.22.5.5.5H4v.5h-.5c-.28 0-.5.22-.5.5s.22.5.5.5H4v.5H2.5c-.28 0-.5.22-.5.5s.22.5.5.5h2c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5zm-2-11H3v2.5c0 .28.22.5.5.5s.5-.22.5-.5v-3c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5s.22.5.5.5zm2 5h-2c-.28 0-.5.22-.5.5s.22.5.5.5h1.3l-1.68 1.96c-.08.09-.12.21-.12.32v.22c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H3.2l1.68-1.96c.08-.09.12-.21.12-.32v-.22c0-.28-.22-.5-.5-.5z"/>`,
	listUL: `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM8 19h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0-6h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 6c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"/>`,
};

/**
 * øPlugin serves as base for the custom plugins
 * it established all necessary methods
 */

class øPlugin {
	constructor() {
		// set the ID for the Plugin. Every Plugin instance needs to have it's own ID for tracking.
		this._ID = Date.now();

		// establish the internal style object
		this._styles = {};

		// establish the internal selection object
		this._selection = { state: false };

		// standard buttons provided to all plugins to be used if needed
		this.standardButtons = {
			// button to push block up
			move_up: {
				// the icon the button uses
				icon: icons.get('expandLess'),
				// display and active properies used for context
				display: true,
				active: false,
				// tooltip
				tooltip: 'Move block up.',
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
					// find the index of this paragraph
					let i = ctx._data.findIndex(
						(block) => block._ID === this._ID
					);

					// if "i" is bigger then zero, the block can be pushed up.
					// rearanges the blocks

					if (i > 0) {
						// get the current Block
						let currentBlock = ctx._data[i];
						// get the block above current // block
						let belowBlock = ctx._data[i - 1];

						// switch the blocks arround
						ctx._data[i] = belowBlock;
						ctx._data[i - 1] = currentBlock;

						// call for a complete rerender

						window.dispatchEvent(
							new CustomEvent('editør-Render', {
								detail: {
									blockRender: false,
									blockID: this._ID,
								},
							})
						);
					}
				},
			},
			// button to push block down
			move_down: {
				// the icon the button uses
				icon: icons.get('expandMore'),
				// display and active properies used for context
				display: true,
				active: false,
				// tooltip
				tooltip: 'Move block down.',
				action(ctx) {
					// find the index of this paragraph
					let i = ctx._data.findIndex(
						(block) => block._ID === this._ID
					);

					// if "i" is bigger then zero, the block can be pushed up.
					// rearanges the blocks

					if (i < ctx._data.length - 1) {
						// get the current Block
						let currentBlock = ctx._data[i];
						// get the block below current
						// block
						let belowBlock = ctx._data[i + 1];

						// switch the blocks arround
						ctx._data[i] = belowBlock;
						ctx._data[i + 1] = currentBlock;
						// call for a complete rerender

						window.dispatchEvent(
							new CustomEvent('editør-Render', {
								detail: {
									blockRender: false,
									blockID: this._ID,
								},
							})
						);
					}
				},
			},
			// button to delete
			clear: {
				// the icon the button uses
				icon: icons.get('clear'),
				// display and active properies used for context
				display: true,
				active: false,
				// tooltip
				tooltip: 'Delete block.',
				action(ctx) {
					// filter the current element out of the
					// the ctx data pool

					ctx._data = ctx._data.filter(
						(block) => block._ID != this._ID
					);

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
			// formating buttons
			block_format: {
				// align text to left
				align_left: {
					// the icon the button uses
					icon: icons.get('alignLeft'),
					// display and active properies used for context
					display: true,
					active: false,
					// tooltip
					tooltip: 'Text align left.',
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
						// get the current textAlignment
						// if no alignment is set default to left
						let currentAlignment = this._styles.textAlign || 'left';

						// if the currentAlignment is not left

						if (currentAlignment != 'left') {
							// set the active state of the current
							// alignment to false
							this.contextMenu[
								`format_align_${currentAlignment}`
							].active = false;

							// set the left alignment active to true
							this.contextMenu.format_align_left.active = true;

							// set the textAlign style to left
							this._styles.textAlign = 'left';

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
				// align text to the right
				align_right: {
					// the icon the button uses
					icon: icons.get('alignRight'),
					// display and active properies used for context
					display: true,
					active: false,
					// tooltip
					tooltip: 'Text align right.',
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
						// get the current textAlignment
						// if no alignment is set default to left
						let currentAlignment = this._styles.textAlign || 'left';

						// if the currentAlignment is not left

						if (currentAlignment != 'right') {
							// set the active state of the current
							// alignment to false
							this.contextMenu[
								`format_align_${currentAlignment}`
							].active = false;

							// set the left alignment active to true
							this.contextMenu.format_align_right.active = true;

							// set the textAlign style to left
							this._styles.textAlign = 'right';

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
				// align text to center
				align_center: {
					// the icon the button uses
					icon: icons.get('alignCenter'),
					// display and active properies used for context
					display: true,
					active: false,
					// tooltip
					tooltip: 'Text align center.',
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
						// get the current textAlignment
						// if no alignment is set default to left
						let currentAlignment = this._styles.textAlign || 'left';

						// if the currentAlignment is not center

						if (currentAlignment != 'center') {
							// set the active state of the current
							// alignment to false
							this.contextMenu[
								`format_align_${currentAlignment}`
							].active = false;

							// set the left alignment active to true
							this.contextMenu.format_align_center.active = true;

							// set the textAlign style to center
							this._styles.textAlign = 'center';

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
				// justify text
				align_justify: {
					// the icon the button uses
					icon: icons.get('alignJustify'),
					// display and active properies used for context
					display: true,
					active: false,
					// tooltip
					tooltip: 'Justify text.',
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
						// get the current textAlignment
						// if no alignment is set default to left
						let currentAlignment = this._styles.textAlign || 'left';

						// if the currentAlignment is not center

						if (currentAlignment != 'justify') {
							// set the active state of the current
							// alignment to false
							this.contextMenu[
								`format_align_${currentAlignment}`
							].active = false;

							// set the left alignment active to true
							this.contextMenu.format_align_justify.active = true;

							// set the textAlign style to center
							this._styles.textAlign = 'justify';

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
			},
			inline_format: {
				// make text bold
				bold: {
					class: 'editør-markup-strong',
					// the icon that the button uses in the context Menu
					icon: icons.get('bold'),
					// properties for displaying and state of button
					display: true,
					active: false,
					// property that describes the tooltip
					tooltip: 'Bold text.',
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
						// get the range object

						let range = this._selection.range;
						let docFrag = range.extractContents();

						if (
							range.commonAncestorContainer.parentElement.classList.contains(
								'editør-markup-strong'
							)
						) {
							range.commonAncestorContainer.parentElement.remove();
							range.insertNode(docFrag);
						} else {
							let i = document.createElement('strong');
							i.className = 'editør-markup-strong';
							i.appendChild(docFrag);

							range.deleteContents();
							range.insertNode(i);
						}

						this._update({ target: this.domRef.firstElementChild });

						// call for a block wide rerender
						window.dispatchEvent(
							new CustomEvent('editør-Render', {
								detail: {
									blockRender: true,
									blockID: this._ID,
								},
							})
						);
					},
				},
				italic: {
					// the html class
					class: 'editør-markup-i',
					// the icon that the button uses
					// in the context Menu
					icon: icons.get('italic'),
					// property that describes if the
					// button should be shown
					display: true,
					// property that describes if the
					// button is in an active state
					active: false,
					// property that describes the tooltip
					tooltip: 'Italicize text.',
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
						// get the range object

						let range = this._selection.range;
						let docFrag = range.extractContents();

						if (
							range.commonAncestorContainer.parentElement.classList.contains(
								'editør-markup-i'
							)
						) {
							range.commonAncestorContainer.parentElement.remove();
							range.insertNode(docFrag);
						} else {
							let i = document.createElement('i');
							i.className = 'editør-markup-i';
							i.appendChild(docFrag);

							range.deleteContents();
							range.insertNode(i);
						}

						this._update({ target: this.domRef.firstElementChild });

						// call for a block wide rerender
						window.dispatchEvent(
							new CustomEvent('editør-Render', {
								detail: {
									blockRender: true,
									blockID: this._ID,
								},
							})
						);
					},
				},
				underline: {
					// the html class
					class: 'editør-markup-u',
					// the icon that the button uses
					// in the context Menu
					icon: icons.get('underline'),
					// property that describes if the
					// button should be shown
					display: true,
					// property that describes if the
					// button is in an active state
					active: false,
					// property that describes the tooltip
					tooltip: 'Underline text.',
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
						// get the range object

						let range = this._selection.range;
						let docFrag = range.extractContents();

						if (
							range.commonAncestorContainer.parentElement.classList.contains(
								'editør-markup-u'
							)
						) {
							range.commonAncestorContainer.parentElement.remove();
							range.insertNode(docFrag);
						} else {
							let i = document.createElement('u');
							i.className = 'editør-markup-u';
							i.appendChild(docFrag);

							range.deleteContents();
							range.insertNode(i);
						}

						this._update({ target: this.domRef.firstElementChild });

						// call for a block wide rerender
						window.dispatchEvent(
							new CustomEvent('editør-Render', {
								detail: {
									blockRender: true,
									blockID: this._ID,
								},
							})
						);
					},
				},
				strikethrough: {
					// the html class
					class: 'editør-markup-s',
					// the icon that the button uses
					// in the context Menu
					icon: icons.get('strikethrough'),
					// property that describes if the
					// button should be shown
					display: true,
					// property that describes if the
					// button is in an active state
					active: false,
					// property that describes the tooltip
					tooltip: 'Strikethrough text.',
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
						// get the range object

						let range = this._selection.range;
						let docFrag = range.extractContents();

						if (
							range.commonAncestorContainer.parentElement.classList.contains(
								'editør-markup-s'
							)
						) {
							range.commonAncestorContainer.parentElement.remove();
							range.insertNode(docFrag);
						} else {
							let i = document.createElement('s');
							i.className = 'editør-markup-s';
							i.appendChild(docFrag);

							range.deleteContents();
							range.insertNode(i);
						}

						this._update({ target: this.domRef.firstElementChild });

						// call for a block wide rerender
						window.dispatchEvent(
							new CustomEvent('editør-Render', {
								detail: {
									blockRender: true,
									blockID: this._ID,
								},
							})
						);
					},
				},
				marker: {
					// the html class
					class: 'editør-markup-marker',
					// the icon that the button uses
					// in the context Menu
					icon: icons.get('brush'),
					// property that describes if the
					// button should be shown
					display: true,
					// property that describes if the
					// button is in an active state
					active: false,
					// property that describes the tooltip
					tooltip: 'Mark selection.',
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
						// get the range object

						let range = this._selection.range;
						let docFrag = range.extractContents();

						if (
							range.commonAncestorContainer.parentElement.classList.contains(
								'editør-markup-marker'
							)
						) {
							range.commonAncestorContainer.parentElement.remove();
							range.insertNode(docFrag);
						} else {
							let i = document.createElement('span');
							i.className = 'editør-markup-marker';
							i.appendChild(docFrag);

							range.deleteContents();
							range.insertNode(i);
						}

						this._update({ target: this.domRef.firstElementChild });

						// call for a block wide rerender
						window.dispatchEvent(
							new CustomEvent('editør-Render', {
								detail: {
									blockRender: true,
									blockID: this._ID,
								},
							})
						);
					},
				},
				convert_to_link: {
					// the html class
					class: 'editør-markup-href',
					// the icon that the button uses
					// in the context Menu
					icon: icons.get('insertLink'),
					// property that describes if the
					// button should be shown
					display: true,
					// property that describes if the
					// button is in an active state
					active: false,
					// property that describes the tooltip
					tooltip: 'Convert to Link',
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
						// get the range object
						let range = this._selection.range;
						let docFrag = range.extractContents();

						if (
							range.commonAncestorContainer.parentElement.classList.contains(
								'editør-markup-href'
							)
						) {
							range.commonAncestorContainer.parentElement.remove();
							range.insertNode(docFrag);

							this._update({
								target: this.domRef.firstElementChild,
							});

							// call for a block wide rerender
							window.dispatchEvent(
								new CustomEvent('editør-Render', {
									detail: {
										blockRender: true,
										blockID: this._ID,
									},
								})
							);
						} else {
							this.selectionBar.classList.add(
								'editør-selectionBar-eternal'
							);

							// create a container to hold the label, input and submit button
							let container = document.createElement('div');
							container.className =
								'editør-selection-inputContainer';

							// create a input for inputing the link inside the inline menu
							let input = document.createElement('input');
							input.type = 'url';
							input.className = 'editør-selection-input';
							input.placeholder = 'https://www.example.com';

							// create the label
							let label = document.createElement('label');
							label.textContent = 'Input for URL conversion';
							label.style.display = 'none';

							// create the submit button
							let submit = document.createElement('button');
							submit.textContent = '✓';
							submit.className = 'editør-contextButton';

							const insertLink = (ev) => {
								let i = document.createElement('a');
								i.className = 'editør-markup-href';
								i.href = input.value;
								i.appendChild(docFrag);

								console.log(input.value.match(/\.pdf/gim));

								if (input.value.match(/\.pdf/gim) != null) {
									i.download = input.value.match(
										/[^\/]*?\.pdf/gi
									);
								}

								if (
									!input.value.includes(
										window.location.origin
									)
								) {
									i.target = '_blank';
									i.rel = 'noopener noreffer';
								}

								container.remove();
								this.selectionBar.classList.remove(
									'editør-selectionBar-eternal'
								);

								range.deleteContents();
								range.insertNode(i);

								this._update({
									target: this.domRef.firstElementChild,
								});

								// call for a block wide rerender
								window.dispatchEvent(
									new CustomEvent('editør-Render', {
										detail: {
											blockRender: true,
											blockID: this._ID,
										},
									})
								);
							};

							submit.addEventListener('click', (ev) =>
								insertLink(ev)
							);

							container.appendChild(input);
							container.appendChild(label);
							container.appendChild(submit);

							this.selectionBar.appendChild(container);
						}
					},
				},
			},
		};

		// define a standard Context Menu
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
		};

		// definde an empty selection menu
		this.selectionMenu = {};
	}

	/**
	 * The update method updates the edited textfields
	 *
	 * @param {Event} ev - the event that called for the update
	 */

	_update(evt) {
		// add the html to the content property of the data object
		this.data.content = evt.target.innerHTML;
	}

	/**
	 * Method for handling the inline Selection
	 * Method receives selectstart, mousemove
	 */
	_handleSelection(evt) {
		// if a selection begins on the element, set sate to true

		// on selectstart or mousemove, check if a range is selected
		if (window.getSelection().type == 'Range') {
			// if the selection is inside this object
			if (this.domRef.contains(window.getSelection().focusNode)) {
				// get the range,
				this._selection.range = window.getSelection().getRangeAt(0);
				// and set the inline toolbar to visible
				this.selectionBar.classList.add('editør-selection-visible');
				// check for formatting options
				this._checkFormat(this._selection.range, this.selectionBar);
			}
		} else {
			if (
				!this.domRef.contains(window.getSelection().focusNode) ||
				!this.domRef.contains(evt.target)
			) {
				this.selectionBar.classList.remove('editør-selection-visible');
			}
		}
	}

	/**
	 * @private method to check and set formats inside the inline menu
	 *
	 * @param {range} range - the current selection range
	 * @param {HTMLElement} menu - the dom representation of the selection menu
	 */

	_checkFormat(range, menu) {
		let currentNode = range.commonAncestorContainer.parentElement;

		for (const format in this.selectionMenu) {
			if (this.selectionMenu.hasOwnProperty(format)) {
				const element = this.selectionMenu[format];

				if (
					currentNode.classList.contains(element.class) ||
					currentNode.parentElement.classList.contains(element.class)
				) {
					menu.children[element.position - 1].classList.add(
						'editør-contextButtonActive'
					);
				} else {
					if (
						menu.children[element.position - 1].classList.contains(
							'editør-contextButtonActive'
						)
					) {
						menu.children[element.position - 1].classList.remove(
							'editør-contextButtonActive'
						);
					}
				}
			}
		}
	}

	/**
	 * Creates the button that is used to create
	 * a new block
	 *
	 * @param {object} editor - the editor the
	 * Plugin will get added to
	 *
	 * @returns {HTMLElement} - returns the
	 * Display button used by the editor for
	 * showcasing the plugin
	 */

	static displayButton(editor) {
		// create the HTML element
		let button = document.createElement('button');

		// add the icon to the button
		button.appendChild(this._display.icon.cloneNode(true));

		// set the classname of the button
		button.className = `editør-contextButton editør-button_${this._display.name}`;

		// set the editør-id of the button
		button.setAttribute('editør-id', editor._ID);

		// add a custom data attribute used for
		// dynamically generating the tooltip
		button.setAttribute('data-tooltip', this._display.tooltip);

		// add a click event listener to the button
		button.addEventListener('click', (ev) => {
			// call the createPluginInstance Method
			// to create a new Plugin with the name
			editor.createPluginInstance(this._display.name);
		});

		// return the HTMLelement for use
		return button;
	}
}

/**
 *
 *  editør-class
 *  v 0.3.0
 *
 */

class Editør {
	/**
	 *
	 * @param {HTMLElement} HTMLElement - the HTML Element the editor will be attached to
	 * @param {Object} plugins - all plugins that will be loaded into editor and then be used by the editør content creation bar
	 */

	constructor(HTMLElement, plugins) {
		// create a unique id for the editor
		this._ID = Date.now();

		// the html element representing the editor
		this._editor = HTMLElement;

		// set the id attribute of the editør
		this._editor.setAttribute('editør-id', this._ID);

		// the array holding all the content data of the editør
		this._data = [];

		// all plugins that have been loaded by the editor
		this._plugins = plugins;

		// the html element representing the content creation bar at the bottom of the editør
		this._contentCreator = this._createContentCreator(this._plugins);

		this._injectCSS();

		// create the event Listener that listens for the Custom render Event
		window.addEventListener('editør-Render', this._Render.bind(this));
	}

	/**
	 * @private
	 * Method to create the content Bar at the bottom of the editor
	 *
	 * @param {object} plugins - the Plugins used to create the buttons of the content creation bar
	 */

	_createContentCreator(plugins) {
		// define the displayButtons
		let displayButtons;

		// create the container element that holds the creation buttons
		let contentCreator = document.createElement('div');

		// add the classnames to the button
		contentCreator.className = 'editør-contentCreator';

		// ad the id to the button
		contentCreator.setAttribute('editør-id', this._ID);

		// set the state attribute
		contentCreator.setAttribute('editør-state', 'inactive');

		// create the main button
		let addButton = document.createElement('button');

		// add the icon to the add button
		addButton.appendChild(icons.get('plus'));

		// add the classNames to the button
		addButton.className = 'editør-button editør-contentAddButton';

		// add the eventListener to the addButton
		addButton.addEventListener('click', (ev) => {
			// if the display buttons are hidden
			// set state to active and show buttons
			if (contentCreator.getAttribute('editør-state') === 'inactive') {
				contentCreator.setAttribute('editør-state', 'active');
				displayButtons.style.display = 'flex';
			} else if (
				// if avtive, set state to inactive and hide buttons
				contentCreator.getAttribute('editør-state') === 'active'
			) {
				contentCreator.setAttribute('editør-state', 'inactive');
				displayButtons.style.display = 'none';
			}
		});

		// add the button to the bar
		contentCreator.appendChild(addButton);

		// create the container for the showcase buttons
		displayButtons = document.createElement('div');
		displayButtons.style.display = 'none';
		displayButtons.className = 'editør-contentButtonsContainer';

		// append the buttons to the container

		for (const plugin in plugins) {
			if (plugins.hasOwnProperty(plugin)) {
				const element = plugins[plugin];

				// append the button
				displayButtons.appendChild(element.displayButton(this));
			}
		}

		// append the container
		contentCreator.appendChild(displayButtons);

		// append the contentCreator
		this._editor.appendChild(contentCreator);

		// return the contentCreator
		return contentCreator;
	}

	/**
	 * @private
	 * The context method creates and returns the context Menus
	 * @param {object} block - the block that is being processed in the
	 * render
	 * @param {string} className - the classname that will be assigned to the menu
	 * Buttons will still be just called contextButtons
	 * @param {object} ctx - the context of the
	 * renderer that calls the render
	 *
	 * @returns {HTMLElement} - returns the created context Menu
	 */

	_createContextMenu(block, type, className, ctx) {
		// create the container for the menu
		let contextMenu = document.createElement('div');

		// set the className for the menu
		contextMenu.className = className;

		// add the enabled contextButtons to the menu

		// create an ordered array from the object
		let contextArray = [];

		// add the buttons at their positions
		for (const button in block[type]) {
			if (block[type].hasOwnProperty(button)) {
				// create the element
				const element = block[type][button];

				// if the elements are active, push them to the created array with the name
				if (element.display) {
					contextArray[element.position] = {
						...element,
						name: button,
					};
				}
			}
		}

		// clean the array
		contextArray = contextArray.filter(Boolean);

		// create the buttons

		contextArray.forEach((but) => {
			// create the button element
			let button = document.createElement('button');

			// add the classNames
			button.className = `editør-contextButton editør-contextButton_${but.name}`;

			// give the button the block ID
			button.setAttribute('block-id', this._ID);

			// give the button a tooltip attribute
			button.setAttribute('data-tooltip', but.tooltip);

			// if the button is marked as active, add the active
			// class
			but.active
				? button.classList.add('editør-contextButtonActive')
				: null;

			// add the icon to the button
			button.appendChild(but.icon.cloneNode('true'));

			// add the callback function to the button
			// bind this for access to the block, and the editor
			// as context
			button.addEventListener('click', but.action.bind(block, ctx), true);

			// append the button to the container
			contextMenu.appendChild(button);
		});

		// return the contextMenu
		return contextMenu;
	}

	/**
	 * @private
	 * Method to render the context to the editor
	 *
	 * @param {event} event - the event object that triggered
	 * the render call
	 */

	_Render(event) {
		console.log('render');

		const createBlock = (block, index) => {
			// create the block element
			let blockShell = document.createElement('div');
			// create reference
			block.domRef = blockShell;

			// add the className to the block
			blockShell.className = 'editør-blockShell';
			// add the id to the shell
			blockShell.setAttribute('block-id', block._ID);

			// add a inline style with the z-Index to the
			// shell for correct z-rendering
			blockShell.setAttribute('zIndex', this._data.length - index);

			// append the render content
			blockShell.appendChild(block.render(this));
			// append the context
			block.contextBar = blockShell.appendChild(
				this._createContextMenu(
					block,
					'contextMenu',
					'editør-context',
					this
				)
			);
			// append the selection context
			block.selectionBar = blockShell.appendChild(
				this._createContextMenu(
					block,
					'selectionMenu',
					'editør-selection',
					this
				)
			);

			this._editor.addEventListener('selectstart', (evt) =>
				block._handleSelection(evt)
			);

			this._editor.addEventListener('mousemove', (evt) =>
				block._handleSelection(evt)
			);

			return blockShell;
		};

		// check if there was an event object passed or if the event is supposed to be a complete rerender

		if (!event.detail.blockRender) {
			// remove all blocks beside the content creation
			// bar from the editor container

			while (this._editor.firstElementChild != this._contentCreator) {
				this._editor.firstElementChild.remove();
			}

			// recreate or create all the blocks that exist in
			// the _data array
			this._data.forEach((block, index) => {
				// append the shell to the editor before the content add bar
				this._editor.insertBefore(
					createBlock(block, index),
					this._contentCreator
				);
			});
		} else if (event.detail.blockRender) {
			// if the event calls for a block specific rerender

			// get the index of the element that has called the
			// render event
			let index = this._data.findIndex((el) => {
				return el._ID == event.detail.blockID;
			});

			// get all elements inside the editør
			let editorElements = this._editor.children;

			// remove the element
			editorElements[index].remove();

			// insert the newly rerenderd element

			this._editor.insertBefore(
				createBlock(this._data[index], index),
				editorElements[index]
			);
		}
	}

	/**
	 * @public Method to create a new instance of a plugin
	 *
	 * @param {string} name - the name of the plugin to be created
	 * @returns {object} - the newly created plugin
	 */

	createPluginInstance(name) {
		// create a new Plugin
		let newPlugin = new this._plugins[name]();

		// push the plugin to the data array
		this._data.push(newPlugin);

		// call for a render
		this._Render({ detail: { blockRender: false } });

		return newPlugin;
	}

	/**
	 * @private method to inject the editør-css to the head as a data uri
	 */

	_injectCSS() {}

	/**
	 * @public Method that exports the Data of all elements as JSON
	 */

	exportData() {
		// definde the export Array
		let exportArray = [];

		// take type and data of the blocks and push them to the export array
		this._data.forEach((block) => {
			exportArray.push({
				type: block.name,
				data: block.data,
				styles: block._styles,
			});
		});

		// export the collected Data as JSON string for storing
		return JSON.stringify({ time: Date.now(), blocks: exportArray });
	}

	/**
	 * @public Method to import a JSON string and recreate Data from it.
	 *
	 * @param {JSON} data - the JSON string that represents the saved data
	 */

	importData(data) {
		// reset all current data
		this._data = [];

		// parse the data
		let importData = JSON.parse(data).blocks;

		// create a new Plugin Instance for each of the plugins in the import
		// and populate it with the data inside the block
		importData.forEach((block) => {
			// create a new Plugin
			let importedPlugin = this.createPluginInstance(block.type);
			// set the imported styles of the Plugin
			importedPlugin._styles = block.styles;
			// set the data of the plugin
			importedPlugin.data = block.data;
			// set the style reference inside the plugin
			importedPlugin.data.styles = importedPlugin._styles;
		});

		// call for a render
		window.dispatchEvent(
			new CustomEvent('editør-Render', { detail: { blockRender: false } })
		);
	}
}

export { icons, Editør, øPlugin };
