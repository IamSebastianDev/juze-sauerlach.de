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

export { requestData, saveData };
