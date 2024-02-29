// Dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let actorSchema = new Schema (
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        yearOfBirth: {type: Number},
        awards: [{type: String}]
    }
)

// Export model
module.exports = mongoose.model("actor", actorSchema);