// Dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let movieSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {type: String},
        director: {type: String},
        yearOfRelease: {type: Number},
        cast: [{type: String}]  // An array of strings
    }
);

// Export
module.exports = mongoose.model("movie", movieSchema);