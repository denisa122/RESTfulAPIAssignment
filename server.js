// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Swagger
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

// Swagger setup
const swaggerDefinition = yaml.load("./swagger.yaml");

// Import movie routes
const movieRoutes = require("./routes/movie");

// Import actor routes
const actorRoutes = require("./routes/actor");

// Import authentication routes
const authRoutes = require("./routes/auth");

// Create the express app
const app = express();

// Look for a .env file in the project
require("dotenv-flow").config();

// Parse request to JSON
app.use(bodyParser.json());

// Get the PORT from the .env file; 4000 by default if there is no other setting
const PORT = process.env.PORT || 4000;

// Start the server
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

// Routes
app.get("/api/welcome", (request, response) => {
    response.status(200).send({message: "Welcome to the front page"});  //OK
})

app.use("/api/movies", movieRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/user", authRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Export the app as a module
module.exports = app;