const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roomSchema = require("../Models/room.model")

const locationSchema = new Schema
    ({
        streetAddress1:
        {
            type: String,
            required: true
        },
        streetAddress2:
        {
            type: String,
            required: false
        },
        city:
        {
            type: String,
            required: true
        },
        stateOrProvince:
        {
            type: String,
            required: true
        },
        country:
        {
            type: String,
            required: true
        },
        postalCode:
        {
            type: String,
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
