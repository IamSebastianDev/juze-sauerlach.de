/** @format */

/**
 *
 * handling registering and deleting a user
 *
 */

// import dependencies
import { handleRequest } from '../mongo_config.mjs';
import bcrypt from 'bcrypt';

// function to create user from a post request

const registerUser = async (req, res) => {
	// get email and password from the request body
	const { email } = req.body;
	const { password } = req.body;

	try {
		// hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// create a user object
		const user = {
			email: email.toLowerCase(),
			password: hashedPassword,
		};

		// store the created user in the db

		try {
			await handleRequest('users', (collection) =>
				collection.insertOne(user)
			);

			// send the response
			res.status(200).json({ msg: 'Created user.', user: user });
		} catch (e) {
			// send the response
			res.status(400).json({ msg: e });
		}
	} catch (e) {
		console.log(e);
	}
};

export { registerUser };

// function to delete a user from a post request

const deleteUser = async (req, res) => {
	// get email and password from the request body
	const { email } = req.body;

	// store the created user in the db

	try {
		await handleRequest('users', (collection) =>
			collection.deleteOne({ email: email })
		);

		// send the response
		res.status(200).json({ msg: 'Deleted user.' });
	} catch (e) {
		// send the response
		res.status(400).json({ msg: e });
	}
};

export { deleteUser };
