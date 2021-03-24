const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./Routes/users")
const managerRouter = require("./Routes/managers")
const emailRouter = require("./Routes/emails")
const hotelRouter = require("./Routes/hotels")
const roomRouter = require("./Routes/rooms")
const messageRouter = require("./Routes/messages")
const fs = require('fs')
const https = require('https')
require('dotenv').config();


//you might notice the process.env
//this is a reference to a file in the folder which contains key values
//for instance, the url to the mongoDB is the ATLAS_URI

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
env = process.env.NODE_ENV || 'development';

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

//connect to database
connection.once("open", () => {
    console.log("mongoDB database conneciton established successfullly")
});

app.use("/user", userRouter)
app.use("/manager", managerRouter)
app.use("/email", emailRouter)
app.use("/hotel", hotelRouter)
app.use("/room", roomRouter)
app.use("/message", messageRouter)
//start the server

app.listen(port, function () {
    console.log('Example app listening on port 5000! Go to https://localhost:3000/')
})