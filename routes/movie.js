// Dependencies
const router = require("express").Router();
const movie = require("../models/movie");

// CRUD

// Create
// /api/movies/
router.post("/", (request, response) => {

    // Get data from the request body
    data = request.body;

    // Insert data in the db 
    movie.insertMany(data)
    .then(data => { response.send(data); })
    .catch(error => {response.status(500).send( { message: error.message }); })
})



// Read -- get
// All movies
// Specific movie

// Update -- put

// Delete -- delete

// Export routes
module.exports = router;
