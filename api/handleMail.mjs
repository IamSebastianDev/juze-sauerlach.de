/** @format */

/**
 *
 * This file handles emails
 *
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = nodemailer.createTransport({
	host: 'mail.privateemail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

const handleMail = async (req, res) => {
	const { email, message } = req.body;

	console.log({ email, message });

	const messageBody = {
		from: process.env.EMAIL_USER,
		replyTo: email,
		to: process.env.EMAIL_USER,
		subject: `Neue Nachricht von ${email}`,
		text: message,
	};

	try {
		let response = await transporter.sendMail(messageBody);
		res.status(200).json(response);
	} catch (e) {
		console.log(e);
		res.status(400);
	}
};

export { handleMail };
