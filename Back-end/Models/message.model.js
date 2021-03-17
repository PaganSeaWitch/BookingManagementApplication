const { request } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema
    ({
        subject:
        {
            type: String,
            required: true
        },
        body:
        {
            type: String,
            required: true
        },
        recipient:
        {
            type: String,
            required: true
        },
        sender:
        {
            type: String,
            required: true
        },
        recipient_id:
        {
            type: String,
            required: true
        },
        sender_id:
        {
            type: String,
            required: true
        },
        viewed:
        {
            type: Boolean,
            required: true
        }
    })

const Message = mongoose.model("Message", messageSchema);


module.exports = Message 
