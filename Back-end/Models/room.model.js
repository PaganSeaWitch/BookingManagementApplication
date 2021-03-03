const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema
({
    roomNumber:
	{
		type: Number,
		required:true,
		unique: false
	},
	price:
	{
		type: Number,
		required: true
	},
	beds:
	{
		type: Number,
		required: true
	},
	booked:
	{
		type: Boolean,
		required: true,
		default : false
	},
	tags:
	{
		type: [String],
		required : false,
    }
},
{
    timestamps: true,
    });

const Room = mongoose.model("Room", roomSchema);

module.exports = roomSchema;
