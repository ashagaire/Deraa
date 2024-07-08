const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

//middleware
app.use(cors());
app.use(express.json());

//routes

//create a user table

//get all user 

//get a user

//update a user

//delete a user


app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});