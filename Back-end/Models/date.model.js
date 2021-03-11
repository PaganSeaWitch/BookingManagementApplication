const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dateSchema = new Schema({
    day:
    {
        type: String,
        required: true
    },
    month:
    {
        type: String,
        required: true

    },
    year:
    {
        type: String,
        required: true

    }
});


module.exports = dateSchema;

