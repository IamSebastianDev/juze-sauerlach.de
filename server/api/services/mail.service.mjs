/** @format */

import nodemailer from 'nodemailer';
import { Service } from './service.mjs';

const transporterConfig = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_AUTH,
    },
};

class MailService extends Service {
    constructor(transporter) {
        super();
        this.transporter = transporter;
    }

    /**
     * @description
     * Async method to dispatch a email. The method will check if the hostname
     * includes 'juze-sauerlach' as a simple whitelisting measure. The req body
     * must contain a email and message string describing the email and message of
     * the email to send
     *
     * @param { import("express").Request } req - the request
     * @param { import ("express").Response } res - the response
     */

    async send(req, res) {
        const origin = req.hostname;

        // simple whitelist check
        if (process.env.NODE_ENV === 'production' && !origin.includes('juze-sauerlach')) {
            return res.status(401);
        }

        const { email, message, name } = req.body;

        // verify the necessary properties to be of the correct type and existing
        if (!this.validate([email, 'string'], [message, 'string'])) {
            return res.status(400).json({ error: 'Incorrect request parameters or properties.' });
        }

        const body = {
            from: process.env.EMAIL_USER,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `Neue Nachricht von ${name || email}`,
            text: message,
        };

        try {
            let result = await this.transporter.sendMail(body);
            return res.status(200).json({ result });
        } catch (e) {
            console.log({ e });
            return res.status(500).json({ error: e });
        }
    }
}

export const mailService = new MailService(nodemailer.createTransport(transporterConfig));
