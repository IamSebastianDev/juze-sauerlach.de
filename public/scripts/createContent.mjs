/** @format */
import { Parsør } from './application/parsør.mjs';
import { editorMain, editorSecondary } from './app_backend.js';

let newPageData;

// function to create frontEnt content from the api and pageData
const createContent = async (query, args) => {};

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
	};

	dashboard.title.value = newPageData.title;
	dashboard.dest.value = newPageData.dest;
	dashboard.tooltip.value = newPageData.tooltip;

	// set the header image
	document.querySelector('.header-image-target').src =
		newPageData.headerImage;

	// set the editor content
	editorMain.importData(args[0].primary);
	editorSecondary.importData(args[0].secondary);
};

export { createContent, createSyncContent, newPageData };
