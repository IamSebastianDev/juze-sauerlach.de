/** @format */

/**
 * @typedef BlacklistInit
 * @property { string[] } blacklist - a array of strings to blacklist
 * @property { boolean } matchFull - a boolean indicating if only full paths should be matched
 * @property { boolean } hideFile - a boolean indicating if a 404 or 403 code should be returned.
 */

/**
 * @description
 * A custom middleware to blacklist certain files from being served to the frontend.
 *
 * @param { BlacklistInit } param0 - the config object for the middleware
 *
 * @returns { (req, res, next) => void } the created middleware
 */

export const blacklist = ({ blacklist, matchFull, hideFile } = {}) => {
    return (req, res, next) => {
        const { url } = req;

        // guard for an early return
        if (!blacklist || blacklist.length === 0) return next();

        const blacklisted = blacklist.every((entry) => {
            return (!matchFull && url.includes(entry)) || (matchFull && url === entry);
        });

        return blacklisted ? res.status(hideFile ? 404 : 403).send() : next();
    };
};
