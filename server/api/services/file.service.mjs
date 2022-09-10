/** @format */

import { Service } from './service.mjs';
import { fromRoot } from '../../utils/fromRoot.util.mjs';
import { readdir, unlink, stat } from 'node:fs/promises';
import { sanitizeString } from '../../utils/sanitizeString.util.mjs';

class FileService extends Service {
    constructor() {
        super();

        this.directory = './web/public/uploads/';
    }

    /**
     * @description
     * Async method to retrieve a list of files inside the public folder
     * to display in the frontend.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async get(req, res) {
        const uploads = {};

        const directories = await readdir(fromRoot(this.directory));

        try {
            for (const dir of directories) {
                const dirName = fromRoot(this.directory, dir);
                if ((await stat(dirName)).isDirectory()) {
                    const fileNames = await readdir(dirName);
                    if (!uploads[dir]) uploads[dir] = [];
                    for (const file of fileNames) {
                        uploads[dir].push({
                            name: file,
                            path: `./uploads/${dir}/${file}`,
                            modified: (await stat(fromRoot(dirName, file))).mtime,
                        });
                    }
                }
            }

            res.status(200).json(uploads);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to upload a file to the upload folder
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async post(req, res) {
        const { file } = req.files;

        if (file === null || file === undefined) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        const filename = sanitizeString(file.name);
        const type = file.mimetype.includes('image') ? 'image' : 'file';
        const uploadPath = fromRoot(this.directory, type + 's', filename);

        try {
            await file.mv(uploadPath);
            return res.status(200).json({
                success: true,
                path: `./uploads/${type}s/${filename}`,
            });
        } catch (e) {
            return res.status(400).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to delete a file by it's path.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async delete(req, res) {
        const { path } = req.body;

        if (!this.validate([path, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        try {
            await unlink(fromRoot('public', path));
            return res.status(200).json({ success: true });
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }
}

export const fileService = new FileService('section#file-control');
