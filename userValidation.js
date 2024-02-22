// Dependencies
const joi = require("joi");
const jwt = require("jsonwebtoken");

// Register validation
const registerValidation = (data) => {
    const schema = joi.object(
        {
            firstName: joi.string().min(2).max(200).required(),
            lastName: joi.string().min(2).max(200).required(),
            username: joi.string().min(6).max(25).required(),
            email: joi.string().min(6).max(255).required(),
            password: joi.string().min(8).max(128).required()
        });

        return schema.validate(data);
}

// Login validation
const loginValidation = (data) => {   // Make it work with username OR email
    const schema = joi.object(
        {
            email: joi.string().min(6).max(255).required(),
            password: joi.string().min(8).max(128).required()
        });

        return schema.validate(data);
}

// Token verification
const tokenVerification = (request, response, next) => {
    const token = request.header("auth-token");

    if (!token)
    // Access denied
    return response.status(401).json({ error: "Access denied" });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        request.user = verified;

        // Pass control to the next route
        next();
    } catch (error) {
        // Token not verified
        response.status(400).json({error: "Token is not valid!" });
    }
}

// Export 
module.exports = {registerValidation, loginValidation, tokenVerification};