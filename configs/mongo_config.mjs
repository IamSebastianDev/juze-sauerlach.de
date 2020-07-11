/** @format */

/**
 *
 *  This file handles connecting to mongo and all associated actions.
 *
 */

// import dependencies
import dotenv from 'dotenv';
import mongoDB from 'mongodb';
import { default as connectMongoDBSession } from 'connect-mongodb-session';

// configure dot env
dotenv.config();

// create and export the mongoDB session store

const createStore = (session) => {
	const MongoDBStore = connectMongoDBSession(session);

	const sessionStore = new MongoDBStore({
		uri: process.env.MONGO_KEY,
		collection: 'sessions',
	});

	return sessionStore;
};

export { createStore };

// create the database handlers and export the handle request function

const MongoClient = mongoDB.MongoClient;

// the callback parameter is a function that gets executed with the collection as a parameter

const handleRequest = async (collectionName, callback) => {
	// create a new client
	const client = new MongoClient(process.env.MONGO_KEY, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	try {
		// connect to the client and find the correct collection
		await client.connect();

		const collection = client.db('juze').collection(collectionName);

		// initiate the callback and pass the collection to it
		let result = await callback(collection);

		// close the cliebnt
		client.close();

		// return the result
		return result;
	} catch (e) {
		// return the error
		return e;
	}
};

export { handleRequest };
