/** @format */

/**
 *
 * file that handles file uploading, automatically resizing and saving them
 *
 */

import tinify from 'tinify';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.cwd());

// META!
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// import filesystem
import fsp from 'fs';
const fs = fsp.promises;

// handles storing the files
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

// handles getting all the files in the uploads directory
const getUploads = async (req, res) => {
	// instantie the container obj
	let conObj = {
		files: [],
		images: [],
	};

	let directories = await fs.readdir(process.cwd() + '/public/uploads/');
	const createData = async () => {
		try {
			for (const dir of directories) {
				// get current dir
				let directory = await fs.readdir(
					process.cwd() + '/public/uploads/' + dir
				);

				for (const file of directory) {
					conObj[dir].push({
						name: file,
						path: `./uploads/${dir}/${file}`,
					});
				}
			}

			res.status(200).json(conObj);
		} catch (err) {
			res.status(400).json({ success: false, err: err });
		}
	};

	await createData();
};

const deleteFile = async (req, res) => {
	// construct the file path
	let path = process.cwd() + '/public' + req.body.path.slice(1);

	try {
		await fs.unlink(path);
		//file removed
		res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(400).json({ sucess: false, err: err });
	}
};

export { uploadFile, getUploads, deleteFile };
