// Dependencies
const joi = require("joi");

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

// Export 
module.exports = {registerValidation, loginValidation};