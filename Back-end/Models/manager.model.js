const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotel = require("../Models/hotel.model")

const managerSchema = new Schema
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
    },
	email:
	{
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 5
	},
	hotels:
    {
        type: [hotel.schema]
	},
},
{
    timestamps: true,
    });

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
