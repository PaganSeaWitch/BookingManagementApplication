const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this is a generic model
//its purpose is to govern
//the allowed inputs into a certain
//object, in this case a generic
const genericSchema = new Schema
({
    username:
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password:
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    }
},
{
    timestamps: true,
    });

const Generic = mongoose.model("Generic", genericSchema);

module.exports = Generic;
