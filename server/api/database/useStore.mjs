/** @format */

import ConnectMongoDBSession from 'connect-mongodb-session';

export const useStore = (session) => {
    const Store = ConnectMongoDBSession(session);
    return new Store({
        uri: process.env.DB_CONNECT,
        databaseName: process.env.DB_NAME,
        collection: 'session',
    });
};
