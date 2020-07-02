// importing dependencies
import express from "express"; 
import dotenv from "dotenv";

// dot env config; 
dotenv.config(); 

// instantiate app
const app = express(); 

// define Port
const PORT = process.env.PORT || 5000; 

// serve static files from the public folder
app.use(express.static("./public"))

// start the server
app.listen(PORT, console.log(`Server opened on Port: ${PORT}.`))