// Dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema (
    {
        firstName: {
            type: String,
            min: 6,
            max: 200
        },
        lastName: {
            type: String,
            min: 6,
            max: 200
        },
        username: {
            type: String,
            required: true,
            min: 10,
            max: 25
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 128
        },
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }
);

// Export model
module.exports = mongoose.model("user", userSchema);