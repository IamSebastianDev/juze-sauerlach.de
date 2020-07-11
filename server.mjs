/** @format */

// import dependencies
import path from 'path';
import { fileURLToPath } from 'url';

// replacement for __dirname

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const _getPath = (pathFrag) => path.join(__dirname + pathFrag);

// express dependencies
import express from 'express';
import session from 'express-session';
import forceSSL from 'express-sslify';

// import mongo session store
import { createStore } from './mongo_config.mjs';

const sessionStore = createStore(session);

// import and initalize passport
import passport from 'passport';
import {
	initialize,
	isAuthenticated,
	isNotAuthenticated,
} from './passport_config.mjs';

import { getUserByEmail, getUserById } from './api/findUsers.mjs';

initialize(passport, getUserByEmail, getUserById);

// import route handlers
import { registerUser, deleteUser } from './api/handleUsers.mjs';

// create and configure the express application
const app = express();

// enforce ssl encryption
// app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up express for use with sessions

app.use(
	session({
		store: sessionStore,
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes

// routes for registering and deleting user
app.post('/registeruser', registerUser);
app.post('/deleteuser', deleteUser);

// routes for login, logout
app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/admin',
	})
);

app.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/admin');
});

// routes for navigation
app.get('/dashboard', isAuthenticated, (req, res) => {
	res.status(200).sendFile(_getPath('/public/dashboard.html'));
});

app.get('/admin', isNotAuthenticated, (req, res) => {
	res.status(200).sendFile(_getPath('/public/admin.html'));
});

// api routes for retrieving content
import { requestData, saveData } from './api/handleContent.mjs';

app.get('/api', requestData);
app.post('/api', isAuthenticated, saveData);

// api routes for fileuploading and retrieving
import { uploadFile, getUploads } from './api/handleFiles.mjs';

app.post('/api/upload', isAuthenticated, uploadFile);
app.get('/api/upload', isAuthenticated, getUploads);

// api route for sending mails
import { handleMail } from './api/handleMail.mjs';

app.post('/api/mail', handleMail);

// set up public static folder for the rest of the files

app.use(express.static('public', { extensions: ['html'] }));

// set up port and the server listen

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server up on Port ${PORT}`));
