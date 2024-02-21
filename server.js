// Dependencies that were installed earlier
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Creating the express app
const app = express();

// Look for a .env file in the project
require("dotenv-flow").config();

// Routes
app.get("/api/welcome", (request, response) => {
    response.status(200).send({message: "Welcome to the front page"});  //OK
})

// Get the PORT from the .env file; 4000 by default if there is no other setting
const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
})

// Connect to MongoDB
mongoose.connect
(
    process.env.HOST,
    {
       useUnifiedTopology: true,
       useNewUrlParser: true 
    }
).catch(error => console.log("Failure connecting to MongoDB: " + error));

mongoose.connection.once('open', () => console.log('Successfully connected to MongoDB')); // Display a message once successfully connected to MongoDB

// Export the app as a module
module.exports = app;