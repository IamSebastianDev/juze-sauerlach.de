/** @format */

import { resolve } from 'node:path';
import { appendFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fromRoot } from '../utils/fromRoot.util.mjs';

const path = fromRoot('./.logs');

export const loq = () => {
    return async (req, res, next) => {
        const { method, originalUrl, body } = req;

        if (!existsSync(path)) {
            await mkdir(path);
        }

        // write log file
        let message = `[API]:[${new Date().toUTCString()}]:[${method}] - ${originalUrl} \n`;

        if (Object.keys(body).length > 0) {
            message += `[BODY] ${JSON.stringify(body, null, 2)}\n`;
        }

        await appendFile(resolve(path, 'log.txt'), message, 'utf-8');

        next();
    };
};
