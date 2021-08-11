/** @format */

// import dependencies

import Røut from './application/røut.mjs';
import closeLoader from './loader.mjs';
import test from './application/feather-icons.mjs';

import { createContent } from './parseFrontend.mjs';

// create a new Røut-instance
const router = new Røut(
	{},
	{ method: 'hash', useRender: false, entryPoint: 'home', redirect404: true }
);

// fetch the data from the server and populate the router
(async () => {
	// fetch the page data and construct the routes
	let pageData = await fetch('/api', {
		method: 'GET',
	}).then((res) => res.json());

	// filter inactive pages
	pageData = pageData.filter((elem) => elem.pageActive);

	// order the pages from pageIndex property
	pageData.sort((a, b) => a.pageIndex - b.pageIndex);

	// destination for nav items & helper functions to create them
	const navBar = document.querySelector('.nav-Container');
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
			callback: createContent,
			callbackArgs: [page.content, page.headerImage],
		});

		// create the nav item
		navBar.appendChild(createNavItem(page));
	});

	// go to home
	router.goTo('#home');

	// after initalizing the router and the first content paint, remove the loader
	const loader = document.querySelector('#loader-init');
	closeLoader(loader);
})();

export { router };
