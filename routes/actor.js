// Dependencies
const router = require("express").Router();
const actor = require("../models/actor");

// CRUD

// Create

// /api/actors/
router.post("/", (request, response) => {

    // Get data from the request body
    data = request.body;

    // Insert data in the db 
    actor.insertMany(data)
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( { message: error.message }); })
});

// Read

// All actors
// /api/actors/
router.get("/", (request, response) => {

    actor.find()
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
});

// Specific actor by id
// /api/actors/:id
router.get("/:id", (request, response) => {

    actor.findById(request.params.id)
    .then(data => { response.send(data); })
    .catch(error => { response.status(500).send( {message: error.message}); })
});

// Update

// /api/actors/:id
router.put("/:id", (request, response) => {

    const id = request.params.id;
    
    actor.findByIdAndUpdate(id, request.body)
    .then(data => { 
        if(!data)
        {
            response.status(404).send({ message: "Actor with id " + id + " couldn't be updated. Check if you entered the correct id!" })
        }
        else
        {
            response.send( { message: "Actor with id " + id + " was successfully updated." } )
        }
    })
    .catch(error => { response.status(500).send( {message: "Error editing the actor with id " + id}); })
});

// Delete

// /api/actors/:id
router.delete("/:id", (request, response) => {

    const id = request.params.id;
    
    actor.findByIdAndDelete(id)
    .then(data => { 
        if(!data)
        {
            response.status(404).send({ message: "Actor with id " + id + " couldn't be deleted. Check if you entered the correct id!" })
        }
        else
        {
            response.send( { message: "Actor with id " + id + " was successfully deleted." } )
        }
    })
    .catch(error => { response.status(500).send( {message: "Error deleting the actor with id " + id}); })
});



// Export routes
module.exports = router;