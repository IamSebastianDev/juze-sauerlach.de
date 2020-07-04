/** @format */
import fs from 'fs';
import tinify from 'tinify';
import dotenv from 'dotenv';

// configure dotenv
dotenv.config();

// set tinify acces key
tinify.key = process.env.TINIFY_KEY;

const handleUpload = (req, res) => {};

export { handleUpload };
