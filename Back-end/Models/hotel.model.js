const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema
    ({
        streetAddress1:
        {
            type: String,
            trim: true,
            required: true
        },
        streetAddress2:
        {
            type: String,
            trim: true,
            required: false
        },
        city:
        {
            type: String,
            trim: true,
            required: true
        },
        stateOrProvince:
        {
            type: String,
            trim: true,
            required: true
        },
        country:
        {
            type: String,
            trim: true,
            required: true
        },
        postalCode:
        {
            type: String,
            trim: true,
            required :false
        }
    }
);


const hotelSchema = new Schema
    ({
        name:
        {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        location:
        {
            type: locationSchema,
            required:true
        },
        room_IDs: {
            type: [String],
            required:false
        },
        pictureLink:
        {
            type: String,
            required:false
        }
    },
    {
    timestamps: true
    });

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = { model: Hotel, schema: hotelSchema }
