const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//get uri for database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

//connect to database
connection.once("open", () => {
    console.log("mongoDB database conneciton established successfullly")
});

const genericRouter = require("./routes/generics")
app.use("/generic", genericRouter);

//start the server
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
