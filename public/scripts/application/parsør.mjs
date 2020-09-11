/** @format */

class Parsør {
	constructor(htmlElement, dict) {
		this.anchor = htmlElement;

		this.dict = dict;
	}

	renderJSON(json) {
		// get blocks
		let blocks = JSON.parse(json).blocks;

		// remove all content inside the anchor element
		while (this.anchor.firstElementChild) {
			this.anchor.firstElementChild.remove();
		}

		// start rendering the blocks
		blocks.forEach((block) => {
			// get block type
			let type = block.type;

			// check if there is a dictornary entrance for the type
			if (this.dict[type]) {
				// get the element
				let element = this.dict[type](block.data);

				// and append the element to the anchor
				this.anchor.appendChild(element);
			} else {
				console.log('Dict type not found');
			}
		});
	}
}

export { Parsør };
