/** @format */

import expressSession from 'express-session';
import { useStore } from '../api/database/useStore.mjs';

export const session = () => {
    return expressSession({
        store: useStore(expressSession),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    });
};
