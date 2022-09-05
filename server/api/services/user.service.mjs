/** @format */

import { Service } from './service.mjs';
import { hashPassword } from '../../utils/hash.util.mjs';

class UserService extends Service {
    constructor() {
        super('users');
    }

    // crud

    /**
     * @description
     * Async method to create a new User. The body needs to include
     * a email and a password as well as a registration key to ensure
     * that only authorized requests can create a new user.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async post(req, res) {
        const { email, password, key } = req.body;

        if (!this.validate([email, 'string'], [password, 'string'], [key, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        if (key !== process.env.USER_KEY) {
            return res.status(401).send({ error: 'Unauthorized' });
        }

        const hashedPassword = await hashPassword(password);
        const user = {
            email: email.toLowerCase(),
            password: hashedPassword,
        };

        // check if the email is already in use
        const emailTaken = await this.getUserByEmail({ email });
        if (emailTaken) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        try {
            let result = await this.useCollection(async (collection) => {
                return await collection.insertOne(user);
            });
            return res.status(200).json({ result });
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to get a user by it's id. The id of the user is
     * delivered per request parameter.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async get(req, res) {
        const { id } = req.params;

        if (!this.validate([id, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        try {
            let result = await this.getUserById({ id });
            return res.status(200).json({ result });
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }

    /**
     * @description
     * Async method to delete a user by it's email. The body needs to include
     * a email as well as a registration key to ensure that only authorized
     * requests can delete the user.
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async delete(req, res) {
        const { email, key } = req.body;

        if (!this.validate([email, 'string'], [key, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        if (key !== process.env.USER_KEY) {
            return res.status(401).send({ error: 'Unauthorized' });
        }

        try {
            let result = await this.useCollection(async (collection) => {
                return await collection.deleteOne({ email: email });
            });
            return res.status(200).json({ result });
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    }

    async getUserById({ id }) {
        if (!this.validate([id, 'string'])) return;
        return await this.useCollection(async (collection) => await collection.findOne({ _id: id }));
    }
    async getUserByEmail({ email }) {
        if (!this.validate([email, 'string'])) return;
        return await this.useCollection(async (collection) => await collection.findOne({ email: email }));
    }
}

export const userService = new UserService();
