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
    .catch(error => { response.status(500).send( { message: error.message }); })
})

// Read

// All movies
// /api/movies/
router.get("/", (request, response) => {

    movie.find()
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
})

// All movies with specific director
// /api/movies/director
router.get("/director", (request, response) => {

    movie.find({ director: "Nick Cassavetes" } )
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
})

// Specific movie
// /api/movies/:id
router.get("/:id", (request, response) => {

    movie.findById(request.params.id)
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
})


// Update -- put

// Delete -- delete

// Export routes
module.exports = router;
