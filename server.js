const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(expressjson());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParse: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", () =>
{
    console.log("mongoDB database conneciton established successfullly")
})

//start the server
app.listen(port,() =>
{
    console.log(`server is running on port: ${port}`);
})
