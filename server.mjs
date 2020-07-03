// importing dependencies
import express from "express"; 
import dotenv from "dotenv";
import formidable from "express-formidable"

// import local modules
import {handleUpload} from "./handleUploads.mjs"

// dot env config; 
dotenv.config(); 

// instantiate app
const app = express(); 

// define Port
const PORT = process.env.PORT || 5000; 

// use formidable for fileuploads
app.use(formidable({uploadDir: "/uploads"}))

app.post("/upload", (req, res) => handleUpload(req, res))

// serve static files from the public folder
app.use(express.static("./public"))

// start the server
app.listen(PORT, console.log(`Server opened on Port: ${PORT}.`))