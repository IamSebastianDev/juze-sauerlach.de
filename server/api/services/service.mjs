/** @format */

import { useDB } from '../database/useDatabase.mjs';

export class Service {
    constructor(tableName) {
        if (tableName) {
            this.table = useDB(process.env.DB_NAME);
            this.useCollection = this.table(tableName);
        }
    }

    /**
     *
     * @param  {...Array<any, string | boolean | bigint | number | undefined>} props
     * @returns { boolean }
     */

    verify(...props) {
        return props.every(([value, type]) => {
            if (value === undefined && typeof value !== undefined) return false;
            if (value === null) return false;
            if (value && typeof value !== type) return false;
            return true;
        });
    }

    async get(req, res) {
        res.status(400).json({ error: 'No such endpoint.' });
        return;
    }
    async post(req, res) {
        res.status(400).json({ error: 'No such endpoint.' });
        return;
    }
    async put(req, res) {
        res.status(400).json({ error: 'No such endpoint.' });
        return;
    }
    async delete(req, res) {
        res.status(400).json({ error: 'No such endpoint.' });
        return;
    }
}
