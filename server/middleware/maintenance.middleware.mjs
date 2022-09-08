/** @format */

import { fromRoot } from '../utils/fromRoot.util.mjs';

/**
 * @typedef maintenanceInit
 * @property { string[] } blacklist - a array of strings to blacklist
 * @property { string } target - the redirect target
 * @property { string } [envValue] - the NODE_ENV value to check for
 */

/**
 * @description
 * A custom middleware to redirect certain requests to a maintenance page.
 *
 * @param { maintenanceInit } param0 - the config object for the middleware
 *
 * @returns { (req, res, next) => void } the created middleware
 */

export const maintenance =
    ({ blacklist, target, envValue } = {}) =>
    (req, res, next) => {
        if (!blacklist || blacklist.length === 0 || process.env.NODE_ENV !== (envValue || 'maintenance')) return next();

        const { url } = req;

        if (blacklist.includes(url)) {
            return res.status(503).sendFile(fromRoot(target));
        }

        next();
    };
