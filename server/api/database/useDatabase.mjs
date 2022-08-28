/** @format */

import { wrapAsyncSafely } from '../../utils/wrapAsyncSafely.util.mjs';
import { MongoClient } from 'mongodb';

export const useDB = (databaseString, clientOptions) => {
    return (collectionString) => {
        return async (collectionCallback) => {
            const connectionString = process.env.DB_CONNECT;
            const client = new MongoClient(connectionString, clientOptions);
            const collection = client.db(databaseString).collection(collectionString);

            const { result, error } = await wrapAsyncSafely(async () => {
                await client.connect();
                return await collectionCallback(collection);
            });

            await client.close();

            if (error) throw error;

            return result;
        };
    };
};
