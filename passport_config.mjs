/** @format */

/**
 *
 * this file handles the passport strategy and config
 *
 */

// import dependencies
import local from 'passport-local';
const localStrategy = local.Strategy;

// import bcrypt for comparing password hashes
import bcrypt from 'bcrypt';

const initialize = (passport, getUserByMail, getUserById) => {
	// method to authenticate user
	const authUser = async (email, password, done) => {
		// get user to authenticate
		const user = await getUserByMail(email);

		// return if no user was found
		if (user == null) {
			return done(null, false, { msg: 'No user with that email found.' });
		}

		// compare passwords to auth the user
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { msg: 'Incorrect password.' });
			}
		} catch (e) {
			return done(e);
		}
	};

	// create a new strategy
	passport.use(new localStrategy({ usernameField: 'email' }, authUser));

	// functions to serialize and deserialize user
	passport.serializeUser((user, done) => done(null, user._id));
	passport.deserializeUser((id, done) => done(null, getUserById(id)));
};

export { initialize };

// authentification check

// set up middleware for checking authentification
const checkAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		return res.redirect('/admin');
	}
};

const checkUnAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.redirect('/dashboard');
	} else {
		return next();
	}
};

export { checkAuth, checkUnAuth };
