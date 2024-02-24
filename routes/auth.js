// Dependencies
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { registerValidation, loginValidation } = require("../userValidation");


// Register
// /api/user/register
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
        return response.status(409).json({ error: "Username is already taken!" });
    }
    
    if(emailTaken) {
        return response.status(409).json({ error: "Email is already taken!" });
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
});


// Login
// /api/user/login
router.post("/login", async (request, response) => {

    // Validate user input (login credentials)
    const { error } = loginValidation(request.body);

    if(error) {
        // Bad request from error during validation from joi
        return response.status(400).json({ error: error.details[0].message });
    }

    // Find user with provided login credentials
    const user = await User.findOne({ email: request.body.email });

    // User with provided email does not exist in the DB
    if(!user) {
        return response.status(400).json({ error: "Incorrect email!" });
    }

    // User found in the DB with provided email
    // Check if password is correct
    const correctPassword = await bcrypt.compare(request.body.password, user.password);

    // Wrong password
    if(!correctPassword) {
        return response.status(400).json({ error: "Incorrect password!" });
    }

    // Create authentication token
    const authToken = jwt.sign
    (
        // Payload
        {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
        },

        process.env.TOKEN_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN },
    );

    // Attach authentication token to header
    response.header("auth-token", authToken).json({
        error: null,
        data: { authToken }
    });
});

// Export routes
module.exports = router;