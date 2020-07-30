/** @format */

/**
 *
 * handling requesting and saving content
 *
 */

// import dependencies
import { handleRequest } from '../configs/mongo_config.mjs';

// function to retrieve all page data documents from the db.
const requestData = async (req, res) => {
	try {
		// get all documents in the collection and return an array
		let docs = await handleRequest('content', (collection) =>
			collection.find().toArray()
		);

		// send the response
		res.status(200).json(docs);
	} catch (e) {
		// send the response
		res.status(400).json({ msg: e });
	}
};

// function to save block data from front end editor to the db
const saveData = async (req, res) => {
	// get the pageId of the changed content
	const { pageId } = req.body;

	try {
		await handleRequest('content', (collection) =>
			collection.updateOne(
				{ pageId: pageId },
				{ $set: { content: req.body.blockData } }
			)
		);

		res.status(200).json({ success: true });
	} catch (e) {
		res.status(400).json({ msg: e });
	}
};

// function to create a new page
const createPage = async (req, res) => {
	// get current pageCount
	let contentLength = await handleRequest('content', (collection) =>
		collection.find({}).toArray()
	);

	// craete the page object from the req
	const page = {
		pageId: req.body.pageDest,
		dest: req.body.pageDest,
		pageIndex: contentLength.length + 1,
		icon: req.body.pageIcon,
		tooltip: req.body.pageTooltip,
		title: req.body.pageTitle,
		headerImage: '',
		pageActive: true,
		content: {
			primary: { blocks: [] },
			secondary: { blocks: [] },
		},
	};

	try {
		await handleRequest('content', (collection) =>
			collection.insertOne(page)
		);

		res.status(200).json({ success: true, pageData: page });
	} catch (e) {
		res.status(400).json({ msg: e });
	}
};

// function to delete a page
const deletePage = async (req, res) => {
	try {
		await handleRequest('content', (collection) =>
			collection.deleteOne({ pageId: req.body.pageId })
		);

		res.status(200).json({ success: true });
	} catch (e) {
		res.status(400).json({ msg: e });
	}
};

// function to update a page
const updatePage = async (req, res) => {
	// delete the document id to make update happeN!
	delete req.body._id;

	try {
		await handleRequest('content', (collection) =>
			collection.replaceOne({ pageId: req.body.pageId }, req.body)
		);

		res.status(200).json({ success: true });
	} catch (e) {
		res.status(400).json({ msg: e });
	}
};

export { requestData, saveData, createPage, deletePage, updatePage };
