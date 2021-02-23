const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema
({
    roomNumber:
	{
		type: int,
		required:true,
		unique: false
	},
	price:
	{
		type: int,
		required: true
	},
	beds:
	{
		type: int,
		required: true
	},
	
},
{
    timestamps: true,
    });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
