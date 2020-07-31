/** @format */

/**
 *
 * file that handles file uploading, automatically resizing and saving them
 *
 */

import tinify from 'tinify';
import dotenv from 'dotenv';
dotenv.config();

// META!
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFile = async (req, res) => {
	try {
		// get file
		let file = req.files.file;

		let type = file.mimetype.includes('image') ? 'images/' : 'files/';

		let uploadPath = process.cwd() + '/public/uploads/' + type + file.name;

		await file.mv(uploadPath);

		res.status(200).json({
			success: true,
			path: `./uploads/${type}${file.name}`,
		});
	} catch (e) {
		console.log(e);
		res.status(400).json({ err: e });
	}
};
const getUploads = async (req, res) => {};

export { uploadFile, getUploads };
