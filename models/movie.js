// Dependencies
const mongoose = require("mongoose");
const actor = require("./actor");

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
        cast: [{ type: Schema.Types.ObjectId, ref: 'actor' }]   // An array of actor references (by id)
    }
);

// Export model
module.exports = mongoose.model("movie", movieSchema);