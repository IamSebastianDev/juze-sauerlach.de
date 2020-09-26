/** @format */

import { editor } from './app_backend.js';

let newPageData;

// function to create the backEnd Content from a repeated api call to keep content up to date
const createSyncContent = async (query, args) => {
	// begin by fetching the page data for the requested page
	const pageId = args[2];

	let pageData = await fetch('/api', {
		method: 'GET',
	}).then((res) => res.json());

	newPageData = pageData.filter((elem) => elem.pageId === pageId)[0];

	console.log(args);

	// fill dashboard data

	// get dashboard elements
	const dashboard = {
		title: document.querySelector('#pageTitle'),
		dest: document.querySelector('#pageDest'),
		tooltip: document.querySelector('#pageTooltip'),
		icon: document.querySelector('#active-Icon'),
	};

	dashboard.title.value = newPageData.title;
	dashboard.dest.value = newPageData.dest;
	dashboard.tooltip.value = newPageData.tooltip;
	dashboard.icon.innerHTML = feather.icons[newPageData.icon].toSvg();
	dashboard.icon.setAttribute('iconname', newPageData.icon);

	// set the header image
	document.querySelector('.header-image-target').src =
		newPageData.headerImage;

	// set the editor content
	editor.importData(args[0]);
};

export { createSyncContent, newPageData };
