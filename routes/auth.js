// Dependencies
const router = require("express").Router();
const user = require("../models/user");
const { registerValidation } = require("../userValidation");


// Register
router.post("/register", async (request, response) => {
    
    // Validate user input
    const { error } = registerValidation(request.body);

    if(error) {
        // Bad request from error during validation from joi
        return response.status(400).json({ error: error.details[0].message });
    }

    // Check if email or username are already taken

    // Hash password

    // Create the new user and save it in the DB
    
    return response.status(200).json( { message: "Register route" } );
});


// login
router.post("/login", async (request, response) => {
    return response.status(200).json( { message: "Login route" } );
});

// Export routes
module.exports = router;