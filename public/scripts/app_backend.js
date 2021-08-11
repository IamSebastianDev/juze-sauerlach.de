/** @format */

// import dependencies

import Røut from './application/røut.mjs';
import closeLoader from './loader.mjs';
import { Editør } from './application/editør.03.mjs';

import { createSyncContent, newPageData } from './createContent.mjs';

// create a new Røut-instance
const router = new Røut(
	{},
	{ method: 'hash', useRender: false, entryPoint: 'home', redirect404: true }
);

let pageData;

// fetch the data from the server and populate the router
const firstPaint = async () => {
	// fetch the page data and construct the routes
	pageData = await fetch('/api', {
		method: 'GET',
	}).then((res) => res.json());

	// order the pages from pageIndex property
	pageData.sort((a, b) => a.pageIndex - b.pageIndex);

	// destination for nav items & helper functions to create them
	const navBar = document.querySelector('.nav-Container');
	// clear the navbar if items are in it
	while (navBar.firstElementChild) {
		navBar.firstElementChild.remove();
	}

	const createNavItem = (data) => {
		let navItem = document.createElement('li');
		navItem.className = 'nav-Item';

		let navLink = document.createElement('a');
		navLink.alt = data.title;
		navLink.className = 'nav-Link';
		navLink.setAttribute('title', data.title);
		navLink.setAttribute('tooltip', data.tooltip);
		navLink.href = `#${data.dest}`;
		navLink.innerHTML = feather.icons[data.icon].toSvg({
			'stroke-width': '1.5',
			stroke: 'var(--color-text)',
		});

		navItem.appendChild(navLink);

		return navItem;
	};

	pageData.forEach((page) => {
		// add the routes
		router.create(page.dest, {
			title: `JuZe Sauerlach | ${page.title}`,
			callback: createSyncContent,
			callbackArgs: [page.content, page.headerImage, page.pageId],
		});

		// create the nav item
		navBar.appendChild(createNavItem(page));
	});

	// go to home
	router.goTo('#home');

	// after initalizing the router and the first content paint, remove the loader
	const loader = document.querySelector('#loader-init');
	closeLoader(loader);
};

firstPaint();

export { firstPaint };

// set up editors

// import the editor plugins
import { øParagraph } from './application/plugins/editør.paragraph.mjs';
import { øDelimitor } from './application/plugins/editør.delimitor.mjs';
import { øTitle } from './application/plugins/editør.title.mjs';
import { øList } from './application/plugins/editør.list.mjs';
import { øImage } from './application/plugins/editør.image.mjs';
import { øContact } from './application/plugins/editør.contact.mjs';

// create a new Editor instance

const editor = new Editør(document.querySelector('#editør-main'), {
	title: øTitle,
	paragraph: øParagraph,
	list: øList,
	image: øImage,
	delimitor: øDelimitor,
	contact: øContact,
});

export { editor };

const handleUpdate = async () => {};

document
	.querySelector('#dashboard-updatePage')
	.addEventListener('click', async (ev) => {
		// collect data
		const title = document.querySelector('#pageTitle').value;
		const dest = document.querySelector('#pageDest').value;
		const tooltip = document.querySelector('#pageTooltip').value;
		const icon = document.querySelector('#active-Icon');

		const content = editor.exportData();

		newPageData.title = title;
		newPageData.dest = dest;
		newPageData.tooltip = tooltip;
		newPageData.content = content;
		newPageData.icon = icon.getAttribute('iconname');

		Progress.set();

		await fetch('/api/updatePage', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(newPageData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					firstPaint();
					Progress.close();
				}
			})
			.catch((err) => console.log(err));
	});

export { pageData };

console.log(router);

export { router };

const Progress = {
	set() {
		this.element.style.display = 'flex';
	},
	close() {
		this.element.style.display = 'none';
	},
	element: document.querySelector('.loader-progress'),
};

export { Progress };
