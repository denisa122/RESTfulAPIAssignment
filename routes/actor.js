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

// Export routes
module.exports = router;