// Dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let movieSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {type: String},
        description: {type: String},
        director: {type: String},
        yearOfRelease: {type: Number},
        cast: [{type: String}]  // An array of strings
    }
);

// Export model
module.exports = mongoose.model("movie", movieSchema);