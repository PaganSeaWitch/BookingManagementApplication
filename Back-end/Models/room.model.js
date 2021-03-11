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
	tags:
	{
		type: [String],
		required : false,
	},
	booked_dates:
	{
		type : [Date],
		required : true
	}

},
{
    timestamps: true,
    });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
