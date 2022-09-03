/** @format */

import { Service } from './service.mjs';
import { ObjectId } from 'mongodb';

class ContentService extends Service {
    constructor() {
        super('content');
    }

    /**
     * @description
     * Async method to get the content of a page.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async getContent(req, res) {
        const { id: _id } = req.params;

        if (!this.verify([_id, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        try {
            const page = await this.useCollection(async (collection) => {
                return await collection.fndOne({ _id });
            });
            return res.status(200).json({ content: page.content });
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to set the content of a page.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async postContent(req, res) {
        const { id: _id } = req.params;
        const { content } = req.body;

        if (!this.verify([_id, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        try {
            const result = await this.useCollection(async (collection) => {
                return await collection.findOneAndUpdate({ _id }, { $set: { content } });
            });
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to get all pages.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async getAllPages(req, res) {
        try {
            const docs = await this.useCollection(async (collection) => {
                return await collection.find().toArray();
            });
            res.status(200).json(docs);
        } catch (e) {
            res.status(400).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to get a single page by it's page id.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async getPage(req, res) {
        const { id: _id } = req.params;

        if (!this.verify([_id, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        try {
            const page = await this.useCollection(async (collection) => {
                return await collection.fndOne({ _id });
            });
            return res.status(200).json(page);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to create a single page.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async postPage(req, res) {
        const { dest, icon, tooltip, title, content } = req.body;

        if (!this.verify([dest, 'string'], [icon, 'string'], [tooltip, 'string'], [title, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        try {
            const page = {
                dest,
                icon,
                tooltip,
                title,
                index: await this._getPageIndex(),
                active: true,
                headerImage: './assets/images/logo.png',
                content: content || { time: 0, blocks: [], version: '0.0.0' },
            };

            const result = await this.useCollection(async (collection) => {
                return await collection.insertOne(page);
            });
            return res.status(200).json({ page, result });
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to update a single page.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async putPage(req, res) {
        const { id } = req.params;
        const { _id, ...page } = req.body;

        try {
            const result = await this.useCollection(async (collection) => {
                return await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...page } });
            });
            return res.status(200).json({ result, page: req.body });
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to delete a single page.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async deletePage(req, res) {
        const { id: _id } = req.params;

        if (!this.verify([_id, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        try {
            const result = await this.useCollection(async (collection) => {
                return await collection.deleteOne({ _id: new ObjectId(_id) });
            });
            return res.status(200).json({ result });
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }

    /**
     * @description
     * Utility method to get the first free index in the content collection.
     *
     * @returns { Promise<number> } the first free index in the content collection
     */

    async _getPageIndex() {
        const pages = await this.useCollection(async (collection) => {
            return await collection.find().toArray();
        });

        const index = pages
            .map(({ index }) => index)
            .sort((a, b) => a - b)
            .find((val, i) => val !== i);

        return index === undefined ? pages.length : index + 1;
    }
}

export const contentService = new ContentService();
