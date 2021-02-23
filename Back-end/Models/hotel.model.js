const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roomSchema = require("../Models/room.model")
const locationSchema = new Schema({ address:{type: String } });


const hotelSchema = new Schema
    ({
        name:
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        location:
        {
            type: locationSchema,
            required: true,
            unique: true,
            trim: true,
            minlength: 5
        },
        rooms: [roomSchema],
    },
    {
    timestamps: true
    });

const Hotel = mongoose.model("Hotel", hotelSchema);


module.exports = { model: Hotel, schema: hotelSchema }
