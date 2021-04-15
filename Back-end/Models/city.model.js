const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema
    ({
		name:
		{
			type:String,
			required: true
		},
        numLocations:
        {
            type: Number,
            required: true
        },
        avgPrice:
        {
            type: Number,
            required:true
        },
		totalPrice:
		{
			type: Number,
			required: true
		}
    },
    {
    timestamps: true
    });

const City = mongoose.model("City", citySchema);

module.exports = { model: City, schema: citySchema }
