// Dependencies
const router = require("express").Router();
const movie = require("../models/movie");

const { tokenVerification } = require("../userValidation");

// CRUD

// Create

// /api/movies/
router.post("/", tokenVerification, (request, response) => {

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

    movie.find({ yearOfRelease: 2010 } )
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
});

// Specific movie by id
// /api/movies/:id
router.get("/:id", (request, response) => {

    movie.findById(request.params.id)
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
});

// Update

// api/movies/:id
router.put("/:id", tokenVerification, (request, response) => {

    // Get id from the request
    const id = request.params.id;
    
    movie.findByIdAndUpdate(id, request.body)
    .then(data => { 
        if(!data)
        {
            response.status(404).send({ message: "Movie with id " + id + " couldn't be updated. Check if you entered the correct id!" })
        }
        else
        {
            response.send( { message: "Movie with id " + id + " was successfully updated." } )
        }
    })
    .catch(error => { response.status(500).send( {message: "Error editing the movie with id " + id}); })
});

// Delete

// api/movies/:id
router.delete("/:id", tokenVerification, (request, response) => {

    // Get id from the request
    const id = request.params.id;
    
    movie.findByIdAndDelete(id)
    .then(data => { 
        if(!data)
        {
            response.status(404).send({ message: "Movie with id " + id + " couldn't be deleted. Check if you entered the correct id!" })
        }
        else
        {
            response.send( { message: "Movie with id " + id + " was successfully deleted." } )
        }
    })
    .catch(error => { response.status(500).send( {message: "Error deleting the movie with id " + id}); })
});

// Export routes
module.exports = router;
