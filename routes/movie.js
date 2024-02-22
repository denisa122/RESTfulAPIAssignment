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
});

// Read

// All movies
// /api/movies/
router.get("/", (request, response) => {

    movie.find()
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
});

// All movies with specific year of release
// /api/movies/year
router.get("/year", (request, response) => {

    movie.find({ yearOfRelease: 2004 } )
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
});

// Specific movie
// /api/movies/:id
router.get("/:id", (request, response) => {

    movie.findById(request.params.id)
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
});


// Update

// api/movies/:id
router.put("/:id", (request, response) => {

    const id = request.params.id;
    
    movie.findByIdAndUpdate(id, request.body)
    .then(data => { 
        if(!data)
        {
            response.status(404).send({ message: "Movie with id " + id + " couldn't be updated." })
        }
        else
        {
            response.send( { message: "Movie with id " + id + " was successfully updated." } )
        }
    })
    .catch(error => { response.status(500).send( {message: error.message}); })
});


// Delete -- delete

// Export routes
module.exports = router;
