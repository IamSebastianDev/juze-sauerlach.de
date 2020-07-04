/** @format */

// import the router
import Røut from './application/rout.mjs';

// create the Router
let router = new Røut(
	{
		index: {
			title: 'JuZe Sauerlach | Home',
			callback(query) {},
		},
	},
	{ useRender: false, method: 'hash' }
);

// get the data from the server
(async () => {
	let pageData = await fetch('/api').then((res) => res.json());

	// sort the pageArray data for the pageIndex
	pageData.sort((a, b) => a.pageIndex - b.pageIndex);

	// create the routes from the JSON object
	pageData.forEach((route) => {
		router.create(route.dest, {
			title: route.name,
			callback() {},
		});
	});

	// create the nagivation
	const createNavItem = (page) => {
		// create the li item & assign a class
		let item = document.createElement('li');
		item.className = 'nav-Item';

		// create the link item, assign class & href
		let link = document.createElement('a');
		link.href = `#${page.dest}`;
		link.className = 'nav-Link';
		link.dataset.tooltip = page.tooltip;

		// create the icons
		let icon = document.createElement('img');
		icon.src = page.icon;
		icon.alt = page.tooltip;

		link.appendChild(icon);
		item.appendChild(link);

		document.querySelector('.nav-Container').appendChild(item);
	};

	pageData.forEach((page) => createNavItem(page));
})();

console.log(router);
