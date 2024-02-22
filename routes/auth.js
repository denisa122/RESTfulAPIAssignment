// Dependencies
const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

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
    const usernameTaken = await User.findOne({ username: request.body.username });
    const emailTaken = await User.findOne({ email: request.body.email });

    if(usernameTaken) {
        return response.status(400).json({ error: "Username is already taken!" });
    }
    
    if(emailTaken) {
        return response.status(400).json({ error: "Email is already taken!" });
    }

    // Hash password
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Generate hash
    const password = await bcrypt.hash(request.body.password, salt);

    // Create the new user object and save it in the DB
    const userObject = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        username: request.body.username,
        email: request.body.email,
        password
    });

    try {
        const createdUser = await userObject.save();

        // There was no error and we return the generated id of the newly created user
        response.json({ error: null, data: createdUser._id });

    } catch (error) {
        return response.status(400).json({ error });
    }
    
    return response.status(200).json( { message: "Register route" } );
});


// login
router.post("/login", async (request, response) => {
    return response.status(200).json( { message: "Login route" } );
});

// Export routes
module.exports = router;