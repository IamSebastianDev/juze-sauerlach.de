/** @format */

// import dependencies
import { handleRequest } from '../configs/mongo_config.mjs';

// function to retrieve user by email
const getUserByEmail = async (email) => {
	try {
		return await handleRequest('users', (collection) =>
			collection.findOne({ email: email })
		);
	} catch (e) {
		console.log(e);
	}
};

export { getUserByEmail };

// function to retrieve user by id
const getUserById = async (id) => {
	try {
		return await handleRequest('users', (collection) =>
			collection.findOne({ _id: id })
		);
	} catch (e) {
		console.log(e);
	}
};

export { getUserById };
